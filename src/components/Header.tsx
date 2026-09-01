import React from 'react';
import { ShoppingBag, Search, X, ShoppingCart, Code2 } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCodeViewer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenCodeViewer
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Brand & Store Name */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
              Laiba Ecommerce Store
            </h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block mt-0.5">
              Premium Curated Goods & Essentials
            </p>
          </div>
        </div>

        {/* Live Search Input Box */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="product-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products by title, description, or category..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 hover:bg-gray-100/70 focus:bg-white text-sm text-gray-900 placeholder-gray-400 rounded-full border border-gray-300/80 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 transition-all outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs transition-colors"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Header Actions: Cart & Code Viewer */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCodeViewer}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
            title="Inspect Angular v17+ Standalone Component Code"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Angular Files</span>
          </button>

          <button
            id="open-cart-btn"
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-full font-semibold text-sm shadow-sm hover:shadow-md shadow-indigo-200 transition-all cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-red-500 text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>

      </div>
    </header>
  );
};
