import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingBag,
  Citrus,
  Pizza,
  Droplet,
  Plus,
  Minus,
  Check,
  Sparkles,
  Tag
} from 'lucide-react';
import { CategoryId, Product, CartItem } from '../types';

interface CategoriesScreenProps {
  products: Product[];
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'organic' | 'deals' | 'fresh'>('all');

  const categories = [
    { id: 'all' as const, label: 'All Items', icon: SlidersHorizontal },
    { id: 'fruits-veggies' as const, label: 'Fruits & Veggies', icon: Citrus },
    { id: 'groceries' as const, label: 'Groceries', icon: ShoppingBag },
    { id: 'dairy' as const, label: 'Dairy', icon: Droplet },
    { id: 'snacks' as const, label: 'Snacks', icon: Pizza },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search query
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter
      let matchesTag = true;
      if (filterType === 'organic') matchesTag = !!item.isOrganic;
      if (filterType === 'deals') matchesTag = !!item.originalPrice;
      if (filterType === 'fresh') matchesTag = !!item.isFreshToday;

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [products, selectedCategory, searchQuery, filterType]);

  const getItemQuantityInCart = (productId: string) => {
    const found = cartItems.find((ci) => ci.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="space-y-5 pb-14 animate-in fade-in duration-200">
      {/* Header & Search Bar */}
      <div className="space-y-3">
        <div className="border-b border-[#1A1A1A] pb-2">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block mb-0.5">
            Catalogue No. 042 • Fresh Yield
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight italic">
            Browse Market
          </h1>
          <p className="text-xs font-serif text-[#1A1A1A]/75 mt-0.5">
            Hand-selected, fresh items delivered straight to your door.
          </p>
        </div>

        {/* Search Input (Editorial Line Box) */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/60" />
          <input
            id="product-search-input"
            type="text"
            placeholder="Search groceries, avocados, sourdough, milk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-[#FAF8F5] border border-[#1A1A1A] text-sm font-serif text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:bg-white shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Horizontal Scrolling Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-[10px] font-sans uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-all shrink-0 border border-[#1A1A1A] ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                  : 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#EBE7DE]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Filter Tags (Organic, Deals, Fresh) */}
      <div className="flex items-center gap-2 text-xs flex-wrap">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70">
          Filter:
        </span>
        <button
          onClick={() => setFilterType('all')}
          className={`px-2.5 py-1 text-[10px] font-sans uppercase tracking-[0.15em] font-bold border border-[#1A1A1A] transition-colors ${
            filterType === 'all'
              ? 'bg-[#1A1A1A] text-[#F4F1EA]'
              : 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#EBE7DE]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType(filterType === 'organic' ? 'all' : 'organic')}
          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-sans uppercase tracking-[0.15em] font-bold border border-[#1A1A1A] transition-colors ${
            filterType === 'organic'
              ? 'bg-[#1A1A1A] text-[#F4F1EA]'
              : 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#EBE7DE]'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Organic</span>
        </button>
        <button
          onClick={() => setFilterType(filterType === 'deals' ? 'all' : 'deals')}
          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-sans uppercase tracking-[0.15em] font-bold border border-[#1A1A1A] transition-colors ${
            filterType === 'deals'
              ? 'bg-[#1A1A1A] text-[#F4F1EA]'
              : 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#EBE7DE]'
          }`}
        >
          <Tag className="w-3 h-3" />
          <span>On Sale</span>
        </button>
        <button
          onClick={() => setFilterType(filterType === 'fresh' ? 'all' : 'fresh')}
          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-sans uppercase tracking-[0.15em] font-bold border border-[#1A1A1A] transition-colors ${
            filterType === 'fresh'
              ? 'bg-[#1A1A1A] text-[#F4F1EA]'
              : 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#EBE7DE]'
          }`}
        >
          <span>Fresh Today</span>
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-8 text-center space-y-3 mt-4">
          <div className="w-12 h-12 border border-[#1A1A1A] bg-[#EBE7DE] mx-auto flex items-center justify-center text-[#1A1A1A]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#1A1A1A] italic">
            No items found
          </h3>
          <p className="text-xs font-serif text-[#1A1A1A]/70 max-w-xs mx-auto">
            We couldn't find any products matching your search or filters. Try searching for "milk", "avocado", or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
              onSelectCategory('all');
            }}
            className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
          {filteredProducts.map((product) => {
            const qty = getItemQuantityInCart(product.id);
            return (
              <div
                key={product.id}
                className="group bg-[#FAF8F5] border border-[#1A1A1A] hover:bg-[#EBE7DE]/30 transition-all flex flex-col justify-between"
              >
                {/* Product Image & Badges */}
                <div
                  className="cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="relative h-32 sm:h-40 bg-[#EBE7DE] border-b border-[#1A1A1A] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isOrganic && (
                        <span className="bg-[#1A1A1A] text-[#F4F1EA] text-[8px] font-sans uppercase tracking-[0.15em] font-bold px-2 py-0.5 border border-[#F4F1EA]">
                          Organic
                        </span>
                      )}
                      {product.isFreshToday && (
                        <span className="bg-[#FAF8F5] text-[#1A1A1A] text-[8px] font-sans uppercase tracking-[0.15em] font-bold px-2 py-0.5 border border-[#1A1A1A]">
                          Fresh
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="absolute top-2 right-2 bg-[#1A1A1A] text-[#F4F1EA] text-[8px] font-sans uppercase tracking-[0.15em] font-bold px-1.5 py-0.5 border border-[#F4F1EA]">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-1">
                    <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/60 line-clamp-1 font-bold">
                      {product.origin || 'BoiC Market'}
                    </p>
                    <h3 className="font-heading text-sm font-bold text-[#1A1A1A] line-clamp-2 leading-snug group-hover:opacity-75 transition-opacity">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#1A1A1A]/60 font-medium">
                      {product.unit}
                    </p>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="p-3 pt-0 flex items-center justify-between border-t border-[#1A1A1A]/20 mt-1">
                  <div className="flex flex-col">
                    <span className="font-serif text-sm sm:text-base font-bold italic text-[#1A1A1A]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] font-serif text-[#1A1A1A]/50 line-through -mt-0.5">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity modifier or Add button */}
                  {qty === 0 ? (
                    <button
                      id={`add-btn-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.15em] font-bold border border-[#1A1A1A] flex items-center gap-1 shadow-xs transition-all active:scale-95"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#1A1A1A] p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="w-6 h-6 bg-[#EBE7DE] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] flex items-center justify-center transition-colors active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-serif font-bold text-[#1A1A1A] w-5 text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-6 h-6 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#333] flex items-center justify-center transition-colors active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

