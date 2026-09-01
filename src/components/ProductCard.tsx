import React from 'react';
import { ShoppingCart, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Product } from '../product.model';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  return (
    <article
      id={`product-card-${product.id}`}
      className={`group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col overflow-hidden relative ${
        !product.inStock ? 'opacity-90' : ''
      }`}
    >
      {/* Media Image Container */}
      <div className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
        />

        {/* In Stock / Out of Stock Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50/95 backdrop-blur-xs text-emerald-700 border border-emerald-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50/95 backdrop-blur-xs text-rose-700 border border-rose-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              Out of Stock
            </span>
          )}
        </div>

        {/* Category Label */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider bg-gray-900/75 backdrop-blur-md text-white shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Quick View Overlay Hover Action */}
        <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="px-3.5 py-2 bg-white/95 text-gray-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            Quick View
          </button>
        </div>
      </div>

      {/* Body & Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & Add To Cart */}
        <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Price
            </span>
            <span className="text-lg font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              product.inStock
                ? 'bg-gray-900 text-white hover:bg-indigo-600 active:scale-95 shadow-xs hover:shadow-indigo-100'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-80'
            }`}
            title={product.inStock ? 'Add to cart' : 'Out of stock'}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
