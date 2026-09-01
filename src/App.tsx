import React, { useState, useMemo } from 'react';
import { Product, CartItem } from './product.model';
import { INITIAL_PRODUCTS, CATEGORIES } from './data/products';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { AngularCodeModal } from './components/AngularCodeModal';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function App() {
  // State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [stockOnlyFilter, setStockOnlyFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast trigger
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  // Real-time filtering & sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      // Stock filter
      const matchesStock = !stockOnlyFilter || product.inStock;

      return matchesCategory && matchesSearch && matchesStock;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, searchQuery, stockOnlyFilter, sortBy]);

  // Cart calculations
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });

    showToast(`Added "${product.name}" to your cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setStockOnlyFilter(false);
    setSortBy('featured');
  };

  const handleCheckoutSuccess = () => {
    showToast('🎉 Order placed successfully! Thank you for choosing Laiba Ecommerce Store.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP HEADER & NAVIGATION */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCodeViewer={() => setIsCodeModalOpen(true)}
      />

      {/* 2. PROMO BANNER */}
      <div className="bg-indigo-600 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide">
        <span className="inline-flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3.5 h-3.5" />
          Special Launch Event: Free Expedited Shipping on all orders over $99!
        </span>
      </div>

      {/* 3. MAIN CONTENT: SIDEBAR + PRODUCT GRID */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          
          {/* Left Sidebar Category Navigation */}
          <Sidebar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            products={products}
          />

          {/* Product Grid & Controls */}
          <ProductGrid
            products={filteredProducts}
            totalAvailableCount={products.length}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            stockOnlyFilter={stockOnlyFilter}
            onStockOnlyToggle={setStockOnlyFilter}
            onClearFilters={handleClearFilters}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
          />

        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-8 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">Laiba Ecommerce Store</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <button 
              type="button" 
              onClick={() => setIsCodeModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
            >
              View Angular Source Code
            </button>
            <span>•</span>
            <span>100% Client-Side Responsive Experience</span>
          </div>
        </div>
      </footer>

      {/* 5. SLIDEOUT CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        totalPrice={totalCartPrice}
        totalCount={totalCartCount}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* 6. QUICK VIEW MODAL */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 7. ANGULAR SOURCE CODE VIEWER MODAL */}
      <AngularCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* 8. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-800 animate-slide-up text-xs font-semibold">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
