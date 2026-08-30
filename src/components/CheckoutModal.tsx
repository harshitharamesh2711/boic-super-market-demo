import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  CreditCard,
  Banknote,
  CheckCircle2,
  Truck,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  deliveryFee,
  discount,
  total,
  onOrderPlaced,
}) => {
  const [name, setName] = useState('Jane Doe');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [address, setAddress] = useState('123 Local Street, Apt 4B, Your Town');
  const [instructions, setInstructions] = useState('Please leave at the door');
  const [timeSlot, setTimeSlot] = useState('Today • 1:00 PM – 4:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'whatsapp'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `BOIC-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...cartItems],
        subtotal,
        deliveryFee,
        discount,
        total,
        status: 'Received',
        deliveryAddress: address,
        paymentMethod:
          paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : paymentMethod === 'card'
            ? 'Credit Card / UPI'
            : 'WhatsApp Confirmation',
        timeSlot
      };

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderPlaced(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-lg border border-[#1A1A1A] shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
                Dispatch Registry
              </span>
              <h2 className="font-heading font-bold text-base text-[#1A1A1A] italic">
                {completedOrder ? 'Order Confirmed' : 'Local Delivery Checkout'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-[#FAF8F5] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm text-[#1A1A1A]">
          {completedOrder ? (
            /* Order Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 border-2 border-[#1A1A1A] bg-[#EBE7DE] text-[#1A1A1A] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block">
                  Confirmation Receipt
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1A1A1A] italic">
                  Order Successfully Placed
                </h3>
                <p className="text-xs font-serif text-[#1A1A1A]/70">
                  Order Reference: <strong className="text-[#1A1A1A]">{completedOrder.id}</strong>
                </p>
                <p className="text-xs font-serif text-[#1A1A1A]/85 max-w-sm mx-auto pt-1 leading-relaxed">
                  Our grocery team has received your order. We are handpicking your fresh produce and preparing your package for {completedOrder.timeSlot}.
                </p>
              </div>

              {/* Order summary pill */}
              <div className="bg-[#EBE7DE]/60 p-4 border border-[#1A1A1A] text-left space-y-2 text-xs font-serif">
                <div className="flex justify-between text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-2">
                  <span className="font-sans uppercase tracking-[0.15em] text-[10px] font-bold">Deliver To:</span>
                  <span className="truncate max-w-[200px]">
                    {completedOrder.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-[#1A1A1A]">
                  <span className="font-sans uppercase tracking-[0.15em] text-[10px]">Total Due:</span>
                  <span className="text-[#1A1A1A] font-serif font-bold italic text-lg">
                    ${completedOrder.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#1A1A1A]/70 text-[11px]">
                  <span>Payment Mode:</span>
                  <span>{completedOrder.paymentMethod}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold transition-all"
              >
                Done &amp; Return to Market
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Delivery Address */}
              <div className="space-y-2">
                <label className="font-sans uppercase tracking-[0.2em] font-bold text-[10px] text-[#1A1A1A] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address &amp; Contact</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2.5 bg-white border border-[#1A1A1A] text-xs font-serif text-[#1A1A1A] focus:outline-none placeholder:text-[#1A1A1A]/40"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2.5 bg-white border border-[#1A1A1A] text-xs font-serif text-[#1A1A1A] focus:outline-none placeholder:text-[#1A1A1A]/40"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Street Address, Apt / Suite"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1A1A1A] text-xs font-serif text-[#1A1A1A] focus:outline-none placeholder:text-[#1A1A1A]/40"
                />
                <input
                  type="text"
                  placeholder="Delivery Note (e.g. Ring bell, gate code)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full p-2 bg-white border border-[#1A1A1A] text-xs font-serif text-[#1A1A1A] focus:outline-none placeholder:text-[#1A1A1A]/40"
                />
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <label className="font-sans uppercase tracking-[0.2em] font-bold text-[10px] text-[#1A1A1A] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Delivery Time Slot</span>
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    'Morning • 8-11 AM',
                    'Today • 1-4 PM',
                    'Evening • 6-9 PM'
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2 text-[10px] font-sans uppercase tracking-[0.1em] font-bold border text-center transition-all ${
                        timeSlot.includes(slot.split('•')[1]?.trim() || slot)
                          ? 'bg-[#1A1A1A] text-[#F4F1EA] border-[#1A1A1A]'
                          : 'border-[#1A1A1A]/40 bg-white text-[#1A1A1A] hover:bg-[#EBE7DE]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="font-sans uppercase tracking-[0.2em] font-bold text-[10px] text-[#1A1A1A] flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5" />
                  <span>Payment Method</span>
                </label>
                <div className="space-y-1.5 font-serif">
                  <label className="flex items-center gap-3 p-2.5 border border-[#1A1A1A] bg-white cursor-pointer hover:bg-[#EBE7DE]/40">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#1A1A1A]"
                    />
                    <Banknote className="w-4 h-4 text-[#1A1A1A]" />
                    <div className="flex-1">
                      <p className="font-bold text-xs text-[#1A1A1A]">Cash / Card on Delivery</p>
                      <p className="text-[10px] text-[#1A1A1A]/60 font-sans">Pay conveniently when groceries arrive</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2.5 border border-[#1A1A1A] bg-white cursor-pointer hover:bg-[#EBE7DE]/40">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#1A1A1A]"
                    />
                    <CreditCard className="w-4 h-4 text-[#1A1A1A]" />
                    <div className="flex-1">
                      <p className="font-bold text-xs text-[#1A1A1A]">Credit Card / Online</p>
                      <p className="text-[10px] text-[#1A1A1A]/60 font-sans">Instant secure digital settlement</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2.5 border border-[#1A1A1A] bg-white cursor-pointer hover:bg-[#EBE7DE]/40">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="accent-[#1A1A1A]"
                    />
                    <MessageSquare className="w-4 h-4 text-[#1A1A1A]" />
                    <div className="flex-1">
                      <p className="font-bold text-xs text-[#1A1A1A]">WhatsApp Store Confirmation</p>
                      <p className="text-[10px] text-[#1A1A1A]/60 font-sans">Our dispatch merchant will message you</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order total footer */}
              <div className="pt-3 border-t border-[#1A1A1A] space-y-3">
                <div className="flex justify-between items-baseline text-sm font-bold text-[#1A1A1A]">
                  <span className="font-sans uppercase tracking-[0.2em] text-xs">Total Amount Due:</span>
                  <span className="font-serif text-xl italic text-[#1A1A1A]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] text-[11px] font-sans uppercase tracking-[0.25em] font-bold py-3.5 px-4 border border-[#1A1A1A] flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Placing Order...</span>
                  ) : (
                    <>
                      <span>Confirm &amp; Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

