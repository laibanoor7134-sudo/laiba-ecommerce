import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productService = inject(ProductService);

  categories = this.productService.categories;
  selectedCategory = this.productService.selectedCategory;
  searchQuery = this.productService.searchQuery;
  filteredProducts = this.productService.filteredProducts;
  cartItems = this.productService.cartItems;
  cartTotalCount = this.productService.cartTotalCount;
  cartTotalPrice = this.productService.cartTotalPrice;

  isCartOpen = signal<boolean>(false);
  notificationMessage = signal<string | null>(null);

  onSelectCategory(category: string): void {
    this.productService.setCategory(category);
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.productService.setSearchQuery(query);
  }

  clearSearch(): void {
    this.productService.setSearchQuery('');
  }

  addToCart(product: Product): void {
    if (!product.inStock) return;
    this.productService.addToCart(product);
    this.showToast(`Added "${product.name}" to cart!`);
  }

  toggleCart(): void {
    this.isCartOpen.update(open => !open);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  removeFromCart(productId: string): void {
    this.productService.removeFromCart(productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    this.productService.updateQuantity(productId, quantity);
  }

  checkout(): void {
    if (this.cartTotalCount() === 0) return;
    this.showToast('Thank you for shopping at Laiba Ecommerce Store! Order placed successfully.');
    this.productService.clearCart();
    this.closeCart();
  }

  private showToast(msg: string): void {
    this.notificationMessage.set(msg);
    setTimeout(() => {
      this.notificationMessage.set(null);
    }, 3500);
  }
}
