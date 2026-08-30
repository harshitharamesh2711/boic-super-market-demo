import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onGoToShop: () => void;
  onStartCheckout: () => void;
  onOpenWhatsAppOrder: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoToShop,
  onStartCheckout,
  onOpenWhatsAppOrder,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 25.0;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = isFreeDelivery ? 0 : subtotal > 0 ? 2.99 : 0;
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.percent) / 100 : 0;
  const estimatedTax = (subtotal - discountAmount) * 0.05;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + estimatedTax);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME10' || code === 'BOICFRESH' || code === 'ORGANIC') {
      setAppliedCoupon({ code, percent: 10 });
      setCouponCode('');
    } else if (code === 'SUPER20') {
      setAppliedCoupon({ code, percent: 20 });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try "BOICFRESH" or "WELCOME10"');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-8 sm:p-12 text-center space-y-4 shadow-xs my-6 animate-in fade-in">
        <div className="w-16 h-16 border border-[#1A1A1A] bg-[#EBE7DE] mx-auto flex items-center justify-center text-[#1A1A1A]">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block">
            Basket Ledger Empty
          </span>
          <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] italic">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#1A1A1A]/75 max-w-xs mx-auto">
            Discover our farm-fresh vegetables, organic milk, sourdough, and everyday pantry staples.
          </p>
        </div>
        <button
          onClick={onGoToShop}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] transition-all active:scale-95"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-200">
      {/* Title & Clear Action */}
      <div className="flex items-end justify-between border-b border-[#1A1A1A] pb-2">
        <div>
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block mb-0.5">
            Order Manifest
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight italic">
            Shopping Cart
          </h1>
          <p className="text-xs font-serif text-[#1A1A1A]/70">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items selected in your current order
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] underline transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Free Delivery Progress Bar */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-3.5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif text-[#1A1A1A]">
          <Truck className="w-4 h-4 text-[#1A1A1A] shrink-0 stroke-[1.8]" />
          {isFreeDelivery ? (
            <span className="font-bold text-[#1A1A1A]">
              ✓ You have unlocked complimentary local dispatch!
            </span>
          ) : (
            <span>
              Add <strong className="font-bold italic">${amountToFreeShipping.toFixed(2)}</strong> more for <strong>Complimentary Dispatch</strong>
            </span>
          )}
        </div>
        <div className="w-full bg-[#EBE7DE] h-2 border border-[#1A1A1A] overflow-hidden">
          <div
            className="bg-[#1A1A1A] h-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="bg-[#FAF8F5] border border-[#1A1A1A] p-3 sm:p-4 flex items-center justify-between gap-3 shadow-xs"
          >
            {/* Image */}
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 border border-[#1A1A1A] object-cover bg-[#EBE7DE] shrink-0"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-sm font-bold text-[#1A1A1A] truncate">
                {item.product.name}
              </h3>
              <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#1A1A1A]/60">{item.product.unit}</p>
              <p className="text-sm font-serif font-bold italic text-[#1A1A1A] mt-0.5">
                ${item.product.price.toFixed(2)}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] p-1 transition-colors"
                aria-label={`Remove ${item.product.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#1A1A1A] p-0.5">
                <button
                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                  className="w-6 h-6 bg-[#EBE7DE] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] flex items-center justify-center transition-colors active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-serif font-bold text-[#1A1A1A] w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                  className="w-6 h-6 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#333] flex items-center justify-center transition-colors active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Code Section */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-4 space-y-2">
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/50" />
            <input
              type="text"
              placeholder="Coupon (e.g. BOICFRESH)"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponError('');
              }}
              className="w-full pl-9 pr-3 py-2 text-xs font-sans uppercase tracking-[0.1em] bg-white border border-[#1A1A1A] focus:outline-none placeholder:text-[#1A1A1A]/40"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] transition-colors"
          >
            Apply
          </button>
        </form>

        {appliedCoupon && (
          <div className="flex items-center justify-between text-xs font-serif text-[#1A1A1A] bg-[#EBE7DE] p-2 border border-[#1A1A1A]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.percent}% off)</span>
            </div>
            <button
              onClick={() => setAppliedCoupon(null)}
              className="text-[#1A1A1A] hover:underline text-[10px] font-sans uppercase tracking-[0.15em] font-bold"
            >
              Remove
            </button>
          </div>
        )}

        {couponError && (
          <p className="text-[11px] font-serif text-[#1A1A1A] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{couponError}</span>
          </p>
        )}
      </div>

      {/* Order Bill Summary (Ledger Style) */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-5 space-y-3 shadow-xs">
        <div className="border-b border-[#1A1A1A] pb-2">
          <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60">
            Statement of Account
          </span>
          <h3 className="font-heading text-base font-bold text-[#1A1A1A] italic">
            Ledger &amp; Totals
          </h3>
        </div>
        <div className="space-y-2 text-xs font-serif text-[#1A1A1A]/85">
          <div className="flex justify-between">
            <span>Item Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-[#1A1A1A] font-bold">
              <span>Coupon Reduction ({appliedCoupon.percent}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Courier Dispatch Fee</span>
            <span>{isFreeDelivery ? <strong className="font-bold uppercase tracking-wider text-[10px] font-sans">Complimentary</strong> : `$${deliveryFee.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Estimated Local Taxes</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>

          <div className="border-t-2 border-[#1A1A1A] pt-2.5 flex justify-between items-baseline text-sm font-bold text-[#1A1A1A]">
            <span className="font-sans uppercase tracking-[0.2em] text-xs">Total Amount Due</span>
            <span className="font-serif text-xl italic font-bold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Safe guarantee badge */}
        <div className="flex items-center gap-1.5 text-[10px] font-serif text-[#1A1A1A]/70 pt-1 border-t border-[#1A1A1A]/20">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
          <span>Guaranteed farm-fresh standard &amp; careful doorstep drop-off.</span>
        </div>

        {/* Main Actions: Checkout & WhatsApp Quick Order */}
        <div className="space-y-2 pt-2">
          <button
            id="btn-proceed-checkout"
            onClick={onStartCheckout}
            className="w-full bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] text-[11px] font-sans uppercase tracking-[0.25em] font-bold py-3.5 px-4 border border-[#1A1A1A] flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
          >
            <span>Proceed to Dispatch &amp; Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-whatsapp-cart"
            onClick={onOpenWhatsAppOrder}
            className="w-full bg-[#FAF8F5] hover:bg-[#EBE7DE] text-[#1A1A1A] border border-[#1A1A1A] text-[11px] font-sans uppercase tracking-[0.2em] font-bold py-3.5 px-4 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <MessageSquare className="w-4 h-4 stroke-[2]" />
            <span>Dispatch Cart via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

