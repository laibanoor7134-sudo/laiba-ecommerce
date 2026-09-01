import React from 'react';
import { X, ShoppingCart, Check, AlertCircle, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../product.model';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 animate-scale-in border border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-64 md:h-full bg-gray-100 min-h-[300px]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-gray-900/80 backdrop-blur-md text-white">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Ready to Ship
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    <AlertCircle className="w-3 h-3 text-rose-500" />
                    Sold Out
                  </span>
                )}
                <span className="text-xs text-gray-400 font-mono">SKU: {product.id}</span>
              </div>

              <h2 className="text-xl font-extrabold text-gray-900 leading-tight mb-3">
                {product.name}
              </h2>

              <div className="text-2xl font-black text-indigo-600 mb-4">
                ${product.price.toFixed(2)}
                <span className="text-xs font-semibold text-gray-400 ml-2">USD</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-6 bg-gray-50 p-3.5 rounded-xl border border-gray-200/70">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Free standard delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                  <span>30-Day returns</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Official Laiba Store Guarantee</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
                className="flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Currently Unavailable'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
