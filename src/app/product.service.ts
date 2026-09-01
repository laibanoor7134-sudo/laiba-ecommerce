import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly categories = ['All', 'Electronics', 'Accessories', 'Home', 'Wearables', 'Clothing'] as const;

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
    },
    {
      id: 'P013',
      name: 'Tailored Linen Button-Down Shirt',
      description: 'Relaxed fit pre-washed pure French linen shirt in crisp sky blue for all-season style.',
      price: 85.00,
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Clothing'
    },
    {
      id: 'P014',
      name: 'Slim RFID-Blocking Metal Cardholder',
      description: 'Aerospace-grade aluminum slim wallet with quick card eject mechanism and cash strap.',
      price: 45.00,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Accessories'
    },
    {
      id: 'P015',
      name: 'Waterproof Fitness Tracker Band',
      description: '50m water-resistant fitness wristband with continuous SpO2 monitor and 14-day battery.',
      price: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80',
      inStock: true,
      category: 'Wearables'
    },
    {
      id: 'P016',
      name: 'Portable Bluetooth Waterproof Speaker',
      description: 'Punchy 360-degree bass audio with IPX7 submersible rating and 16-hour playtime.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
      inStock: false,
      category: 'Electronics'
    }
  ];

  private productsSignal = signal<Product[]>(this.initialProducts);
  private selectedCategorySignal = signal<string>('All');
  private searchQuerySignal = signal<string>('');
  private cartItemsSignal = signal<CartItem[]>([]);

  readonly products = this.productsSignal.asReadonly();
  readonly selectedCategory = this.selectedCategorySignal.asReadonly();
  readonly searchQuery = this.searchQuerySignal.asReadonly();
  readonly cartItems = this.cartItemsSignal.asReadonly();

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

  readonly cartTotalCount = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0);
  });

  readonly cartTotalPrice = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

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
}
