import { Product } from '../product.model';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear wireless headphones with active noise cancellation, ambient mode, and 30-hour battery life.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'P002',
    name: 'Minimalist Titanium Smartwatch',
    description: 'Elegant titanium finish smartwatch with heart-rate tracking, GPS, sleep monitoring, and vibrant OLED display.',
    price: 199.50,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Wearables'
  },
  {
    id: 'P003',
    name: 'Classic Full-Grain Leather Backpack',
    description: 'Handcrafted durable leather travel & laptop pack featuring reinforced padded straps and water-resistant lining.',
    price: 129.00,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Accessories'
  },
  {
    id: 'P004',
    name: 'Acoustic Ceramic Desk Planter',
    description: 'Modern sculptural ceramic planter designed with natural clay glaze for elevating home or studio workspaces.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&auto=format&fit=crop&q=80',
    inStock: false,
    category: 'Home'
  },
  {
    id: 'P005',
    name: 'Organic Brushed Cotton Overshirt',
    description: 'Breathable 100% organic cotton overshirt with tailored silhouette, dual chest pockets, and horn buttons.',
    price: 78.00,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Clothing'
  },
  {
    id: 'P006',
    name: 'Pro Mechanical RGB Keyboard',
    description: 'Custom hot-swappable linear mechanical keyboard with sound-dampening foam, aluminum top case, and PBT keycaps.',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'P007',
    name: 'Polarized Aviator Sunglasses',
    description: 'UV400 protective polarized scratch-resistant lenses housed in an ultralight stainless steel gold-plated frame.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Accessories'
  },
  {
    id: 'P008',
    name: 'Ceramic Pour-Over Coffee Dripper',
    description: 'Barista-grade matte ceramic coffee brewer with spiral interior ribs for optimal floral note extraction.',
    price: 42.50,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Home'
  },
  {
    id: 'P009',
    name: 'Athletic Performance Smart Ring',
    description: 'Ultra-lightweight titanium biometric sensor ring monitoring sleep staging, HRV, temperature, and daily readiness.',
    price: 249.00,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80',
    inStock: false,
    category: 'Wearables'
  },
  {
    id: 'P010',
    name: 'Merino Wool Knit Beanie',
    description: 'Superfine sustainable merino wool ribbed knit beanie offering exceptional thermal warmth, breathability, and softness.',
    price: 38.00,
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Clothing'
  },
  {
    id: 'P011',
    name: 'Ultra-Fast Magnetic Charging Dock',
    description: '3-in-1 fast wireless charging station crafted with weighted aluminum base for phone, watch, and earbuds.',
    price: 64.99,
    imageUrl: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Electronics'
  },
  {
    id: 'P012',
    name: 'Handcrafted Walnut Aromatherapy Diffuser',
    description: 'Ultrasonic whisper-quiet cool-mist diffuser encased in genuine natural walnut wood with ambient candlelit glow.',
    price: 52.00,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Home'
  },
  {
    id: 'P013',
    name: 'Tailored Linen Button-Down Shirt',
    description: 'Relaxed fit pre-washed pure Normandy linen shirt in refreshing sky blue tone for breezy all-day comfort.',
    price: 85.00,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Clothing'
  },
  {
    id: 'P014',
    name: 'Slim RFID-Blocking Metal Cardholder',
    description: 'Aerospace-grade aluminum slim card case with instant quick-flick card ejector and expandable cash strap.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Accessories'
  },
  {
    id: 'P015',
    name: 'Waterproof Fitness Tracker Band',
    description: '50m water-resistant sport fitness wristband with continuous blood oxygen monitoring and 14-day battery reserve.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    category: 'Wearables'
  },
  {
    id: 'P016',
    name: 'Portable Submersible Bluetooth Speaker',
    description: 'Rich 360-degree punchy bass audio with rugged IPX7 waterproof rating, dual pairing, and 16-hour playtime.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&auto=format&fit=crop&q=80',
    inStock: false,
    category: 'Electronics'
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Home', 'Wearables', 'Clothing'] as const;
