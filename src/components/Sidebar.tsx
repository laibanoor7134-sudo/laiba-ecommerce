import React from 'react';
import { 
  Layers, 
  Smartphone, 
  Watch, 
  Glasses, 
  Home, 
  Shirt,
  Sparkles
} from 'lucide-react';
import { Product } from '../product.model';

interface SidebarProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  products: Product[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  products
}) => {
  // Category icon resolver
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'all':
        return <Layers className="w-4 h-4" />;
      case 'electronics':
        return <Smartphone className="w-4 h-4" />;
      case 'accessories':
        return <Glasses className="w-4 h-4" />;
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'wearables':
        return <Watch className="w-4 h-4" />;
      case 'clothing':
        return <Shirt className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Count products per category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return products.length;
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase()).length;
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs sticky top-24">
        
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Categories
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {categories.length} total
          </span>
        </div>

        {/* Category list items */}
        <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none" aria-label="Product categories">
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat}
                id={`category-btn-${cat.toLowerCase()}`}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isSelected ? 'text-white' : 'text-gray-400'}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                </div>

                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Store perks/info box */}
        <div className="mt-6 pt-5 border-t border-gray-100 hidden lg:block">
          <div className="bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-100/60 text-xs text-indigo-950">
            <p className="font-semibold text-indigo-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Store Guarantee
            </p>
            <p className="text-gray-600 leading-relaxed">
              Fast domestic shipping & 30-day effortless returns on all in-stock products.
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
};
