import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../product.model';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  totalAvailableCount: number;
  selectedCategory: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'name';
  onSortChange: (sort: 'featured' | 'price-low' | 'price-high' | 'name') => void;
  stockOnlyFilter: boolean;
  onStockOnlyToggle: (checked: boolean) => void;
  onClearFilters: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalAvailableCount,
  selectedCategory,
  searchQuery,
  sortBy,
  onSortChange,
  stockOnlyFilter,
  onStockOnlyToggle,
  onClearFilters,
  onAddToCart,
  onQuickView
}) => {
  return (
    <section className="flex-1 flex flex-col gap-4">
      {/* Top Filter and Results Summary Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            {searchQuery ? (
              <span>
                Matching results for search: <span className="font-semibold text-indigo-600">"{searchQuery}"</span>
              </span>
            ) : (
              <span>Showing high-quality curated items in {selectedCategory.toLowerCase()}</span>
            )}
          </p>
        </div>

        {/* Controls: Stock Filter & Sort */}
        <div className="flex items-center flex-wrap gap-2.5 sm:self-center">
          {/* In-Stock Only Toggle */}
          <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={stockOnlyFilter}
              onChange={(e) => onStockOnlyToggle(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span>In-stock only</span>
          </label>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-gray-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-gray-800 outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'All' || stockOnlyFilter) && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center my-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No products found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
            {searchQuery
              ? `No items match your search for "${searchQuery}" in category "${selectedCategory}". Try adjusting your keywords.`
              : `There are currently no items available under the "${selectedCategory}" category filter.`}
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            Clear Filters & View All ({totalAvailableCount})
          </button>
        </div>
      )}
    </section>
  );
};
