import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Code, CheckCircle2 } from 'lucide-react';

interface AngularCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AngularCodeModal: React.FC<AngularCodeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'app.component.ts' | 'app.component.html' | 'app.component.css' | 'product.model.ts' | 'product.service.ts'>('app.component.ts');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeFiles = {
    'product.model.ts': `export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}`,

    'product.service.ts': `import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Category list
  readonly categories = ['All', 'Electronics', 'Accessories', 'Home', 'Wearables', 'Clothing'] as const;

  // Initial mock dataset with 16 distinct products across 5+ categories
  private readonly initialProducts: Product[] = [
    {
      id: 'P001',
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones with long battery life.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Electronics'
    },
    {
      id: 'P002',
      name: 'Minimalist Titanium Smartwatch',
      description: 'Elegant titanium finish smartwatch with heart-rate tracking, GPS, and OLED display.',
      price: 199.50,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Wearables'
    },
    {
      id: 'P003',
      name: 'Classic Full-Grain Leather Backpack',
      description: 'Handcrafted durable leather travel & laptop pack featuring reinforced water-resistant lining.',
      price: 129.00,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Accessories'
    },
    {
      id: 'P004',
      name: 'Acoustic Ceramic Desk Planter',
      description: 'Modern sculptural ceramic planter designed with natural clay glaze for home or office greenery.',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
      inStock: false,
      category: 'Home'
    },
    {
      id: 'P005',
      name: 'Organic Brushed Cotton Overshirt',
      description: 'Breathable 100% organic cotton overshirt with tailored silhouette and horn buttons.',
      price: 78.00,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Clothing'
    },
    {
      id: 'P006',
      name: 'Pro Mechanical RGB Keyboard',
      description: 'Custom hot-swappable linear mechanical keyboard with sound-dampening foam and PBT keycaps.',
      price: 119.99,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Electronics'
    },
    {
      id: 'P007',
      name: 'Polarized Aviator Sunglasses',
      description: 'UV400 protective polarized lenses in a lightweight stainless steel gold-plated frame.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Accessories'
    },
    {
      id: 'P008',
      name: 'Ceramic Pour-Over Coffee Dripper',
      description: 'Barista-grade matte ceramic coffee brewer with spiral interior ribs for optimal extraction.',
      price: 42.50,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Home'
    },
    {
      id: 'P009',
      name: 'Athletic Performance Smart Ring',
      description: 'Ultra-lightweight biometric sensor ring monitoring sleep staging, HRV, and daily recovery score.',
      price: 249.00,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
      inStock: false,
      category: 'Wearables'
    },
    {
      id: 'P010',
      name: 'Merino Wool Knit Beanie',
      description: 'Superfine sustainable merino wool ribbed knit beanie offering thermal warmth and comfort.',
      price: 38.00,
      imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Clothing'
    },
    {
      id: 'P011',
      name: 'Ultra-Fast Wireless Charging Dock',
      description: '3-in-1 magnetic wireless charging station for smartphone, watch, and earbuds simultaneously.',
      price: 64.99,
      imageUrl: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Electronics'
    },
    {
      id: 'P012',
      name: 'Handcrafted Wooden Aromatherapy Diffuser',
      description: 'Ultrasonic cool-mist diffuser encased in natural walnut wood with ambient LED illumination.',
      price: 52.00,
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Home'
    }
  ];

  // Modern Angular Signal State
  private productsSignal = signal<Product[]>(this.initialProducts);
  private selectedCategorySignal = signal<string>('All');
  private searchQuerySignal = signal<string>('');
  private cartItemsSignal = signal<CartItem[]>([]);

  // Public Signal Readonly Views
  readonly products = this.productsSignal.asReadonly();
  readonly selectedCategory = this.selectedCategorySignal.asReadonly();
  readonly searchQuery = this.searchQuerySignal.asReadonly();
  readonly cartItems = this.cartItemsSignal.asReadonly();

  // Computed signal for filtered products based on category & real-time search
  readonly filteredProducts = computed(() => {
    const products = this.productsSignal();
    const category = this.selectedCategorySignal();
    const query = this.searchQuerySignal().trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  });

  // Computed Cart Stats
  readonly cartTotalCount = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0);
  });

  readonly cartTotalPrice = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  // Actions
  setCategory(category: string): void {
    this.selectedCategorySignal.set(category);
  }

  setSearchQuery(query: string): void {
    this.searchQuerySignal.set(query);
  }

  addToCart(product: Product): void {
    if (!product.inStock) return;
    this.cartItemsSignal.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      if (existing) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: string): void {
    this.cartItemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItemsSignal.update(items =>
      items.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}`,

    'app.component.ts': `import { Component, inject, signal } from '@angular/core';
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
    this.showToast(\`Added "\${product.name}" to cart!\`);
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
}`,

    'app.component.html': `<div class="app-layout">
  <!-- 1. TOP HEADER & NAVIGATION -->
  <header class="header">
    <div class="header-container">
      <div class="brand">
        <div class="brand-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h1 class="store-title">Laiba Ecommerce Store</h1>
      </div>

      <!-- Live Search Input Box -->
      <div class="search-box">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search products by title or description..." 
          [value]="searchQuery()" 
          (input)="onSearchInput($event)"
          class="search-input"
          aria-label="Search products"
        />
        @if (searchQuery()) {
          <button class="clear-search-btn" (click)="clearSearch()" title="Clear search">✕</button>
        }
      </div>

      <!-- Cart Button with Live Counter Badge -->
      <div class="header-actions">
        <button class="cart-btn" (click)="toggleCart()" aria-label="Shopping Cart">
          <div class="cart-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            @if (cartTotalCount() > 0) {
              <span class="cart-badge">{{ cartTotalCount() }}</span>
            }
          </div>
          <span class="cart-text">Cart</span>
        </button>
      </div>
    </div>
  </header>

  <!-- 2. MAIN CONTENT AREA -->
  <main class="main-content">
    <div class="content-wrapper">
      
      <!-- 4. SIDEBAR CATEGORY NAVIGATION -->
      <aside class="sidebar">
        <div class="sidebar-card">
          <h2 class="sidebar-title">Categories</h2>
          <nav class="category-nav">
            @for (cat of categories; track cat) {
              <button 
                class="category-item" 
                [class.active]="selectedCategory() === cat"
                (click)="onSelectCategory(cat)"
              >
                <span class="category-name">{{ cat }}</span>
                <span class="category-bullet" [class.active-bullet]="selectedCategory() === cat"></span>
              </button>
            }
          </nav>
        </div>
      </aside>

      <!-- 5. PRODUCT DISPLAY SECTION -->
      <section class="products-section">
        <div class="results-header">
          <h2 class="section-title">
            {{ selectedCategory() === 'All' ? 'All Products' : selectedCategory() }}
          </h2>
          <p class="results-count">Showing {{ filteredProducts().length }} items</p>
        </div>

        <!-- Modern Angular 17+ Control Flow: @if and @for -->
        @if (filteredProducts().length > 0) {
          <div class="product-grid">
            @for (product of filteredProducts(); track product.id) {
              <article class="product-card" [class.out-of-stock-card]="!product.inStock">
                <div class="card-media">
                  <img [src]="product.imageUrl" [alt]="product.name" class="product-image" loading="lazy" />
                  @if (product.inStock) {
                    <span class="badge in-stock">● In Stock</span>
                  } @else {
                    <span class="badge out-of-stock">● Out of Stock</span>
                  }
                  <span class="category-tag">{{ product.category }}</span>
                </div>

                <div class="card-body">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-desc">{{ product.description }}</p>
                  
                  <div class="card-footer">
                    <div class="price-container">
                      <span class="price-label">Price</span>
                      <span class="product-price">\${{ product.price.toFixed(2) }}</span>
                    </div>
                    <button 
                      class="add-to-cart-btn" 
                      [disabled]="!product.inStock"
                      (click)="addToCart(product)"
                    >
                      {{ product.inStock ? 'Add to Cart' : 'Sold Out' }}
                    </button>
                  </div>
                </div>
              </article>
            }
          </div>
        } @else {
          <div class="empty-state">
            <h3>No products found</h3>
            <button (click)="onSelectCategory('All'); clearSearch()">Clear Filters</button>
          </div>
        }
      </section>

    </div>
  </main>
</div>`,

    'app.component.css': `/* Clean Light Theme Layout & CSS Grid */
.app-layout { min-height: 100vh; background-color: #f3f4f6; font-family: system-ui, sans-serif; }
.header { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #e5e7eb; z-index: 40; }
.header-container { max-width: 1400px; margin: 0 auto; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
.content-wrapper { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem; }
.category-item.active { background-color: #eef2ff; color: #4f46e5; font-weight: 600; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.product-card { background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
.badge.in-stock { background: #ecfdf5; color: #065f46; }
.badge.out-of-stock { background: #fef2f2; color: #991b1b; }`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeFiles[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-gray-900 text-gray-100 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-gray-700 flex flex-col max-h-[85vh] animate-scale-in">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Angular v17+ Standalone Component Code
              </h3>
              <p className="text-xs text-gray-400">
                Modern Control Flow syntax (@for, @if) & Signal State Service
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 bg-gray-850 px-4 overflow-x-auto">
          {(Object.keys(codeFiles) as Array<keyof typeof codeFiles>).map((fileName) => (
            <button
              key={fileName}
              type="button"
              onClick={() => setActiveTab(fileName)}
              className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === fileName
                  ? 'border-indigo-500 text-indigo-400 bg-gray-800/80 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
              }`}
            >
              {fileName}
            </button>
          ))}
        </div>

        {/* Code Content Box */}
        <div className="flex-1 p-5 overflow-auto font-mono text-xs text-gray-200 bg-gray-950 leading-relaxed">
          <pre className="whitespace-pre overflow-x-auto select-all">
            {codeFiles[activeTab]}
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-gray-800/80 border-t border-gray-700 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Files also generated to project directory at /src/{activeTab} and /src/app/{activeTab}</span>
          </div>
          <span className="font-mono">Angular 17+ Standalone Architecture</span>
        </div>

      </div>
    </div>
  );
};
