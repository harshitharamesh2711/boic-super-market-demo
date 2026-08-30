import React from 'react';
import { Store, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#1A1A1A] transition-all">
      <div className="max-w-md md:max-w-xl lg:max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Editorial Masthead Brand */}
        <button
          id="header-brand-btn"
          onClick={onGoHome}
          className="flex items-center gap-3 text-left group focus:outline-none transition-transform active:scale-[0.98]"
          aria-label="BoiC Small Super Market Home"
        >
          <div className="w-8 h-8 rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center group-hover:bg-transparent group-hover:text-[#1A1A1A] transition-colors">
            <Store className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/70 leading-none mb-0.5">
              Issue No. 042 • Provisions
            </span>
            <span className="font-heading text-lg sm:text-xl font-black tracking-tight text-[#1A1A1A] italic leading-tight group-hover:opacity-75 transition-opacity">
              BoiC Small Super Market
            </span>
          </div>
        </button>

        {/* Cart Icon Button */}
        <button
          id="header-cart-btn"
          onClick={onOpenCart}
          className="relative p-2 rounded-none border border-[#1A1A1A] bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F4F1EA] focus:outline-none transition-all active:scale-95"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="w-5 h-5 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans font-bold w-5 h-5 rounded-none border border-[#F4F1EA] flex items-center justify-center shadow-xs">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

