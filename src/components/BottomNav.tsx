import React from 'react';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  cartCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#eae7e7] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md md:max-w-xl lg:max-w-4xl mx-auto px-4 py-2 flex items-center justify-around">
        {/* Home Tab */}
        <button
          id="nav-home-btn"
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'home'
              ? 'bg-[#1b5e20] text-white px-5 py-1.5 rounded-xl font-medium shadow-sm'
              : 'text-[#5d5f5f] hover:text-[#00450d] py-1 px-3'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">Home</span>
        </button>

        {/* Categories Tab */}
        <button
          id="nav-categories-btn"
          onClick={() => onChangeTab('categories')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'categories'
              ? 'bg-[#1b5e20] text-white px-4 py-1.5 rounded-xl font-medium shadow-sm'
              : 'text-[#5d5f5f] hover:text-[#00450d] py-1 px-3'
          }`}
          aria-label="Categories"
        >
          <LayoutGrid className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">Categories</span>
        </button>

        {/* Cart Tab */}
        <button
          id="nav-cart-btn"
          onClick={() => onChangeTab('cart')}
          className={`flex flex-col items-center justify-center relative transition-all ${
            activeTab === 'cart'
              ? 'bg-[#1b5e20] text-white px-4 py-1.5 rounded-xl font-medium shadow-sm'
              : 'text-[#5d5f5f] hover:text-[#00450d] py-1 px-3'
          }`}
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && activeTab !== 'cart' && (
              <span className="absolute -top-1.5 -right-2 bg-[#1b5e20] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </span>
        </button>

        {/* Profile Tab */}
        <button
          id="nav-profile-btn"
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'profile'
              ? 'bg-[#1b5e20] text-white px-4 py-1.5 rounded-xl font-medium shadow-sm'
              : 'text-[#5d5f5f] hover:text-[#00450d] py-1 px-3'
          }`}
          aria-label="Profile"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
};
