import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Package,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Order, StoreInfo } from '../types';

interface ProfileScreenProps {
  orders: Order[];
  storeInfo: StoreInfo;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'shipping') => void;
  onGoToShop: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  orders,
  storeInfo,
  onOpenCall,
  onOpenWhatsApp,
  onOpenPolicy,
  onGoToShop
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How fast is local grocery delivery?',
      a: 'We fulfill orders directly from our neighborhood store shelves. Standard local delivery arrives in under 60-90 minutes, or you can pick your preferred morning/evening time slot at checkout.'
    },
    {
      q: 'Can I order directly over WhatsApp or Phone?',
      a: 'Yes! We love personalized community service. Tap the WhatsApp button or call us at +1 234 567 890, and our staff will handpick and pack your items immediately.'
    },
    {
      q: 'Where does BoiC source produce?',
      a: 'We partner directly with local family farms in our surrounding region, harvesting fruits and vegetables daily for maximum freshness and flavor.'
    }
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Customer Header Card (Member Registry) */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-5 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center font-heading font-bold text-xl italic shadow-xs">
          JD
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block">
            Member No. 10842
          </span>
          <h1 className="font-heading text-xl font-bold text-[#1A1A1A] truncate italic">
            Jane Doe
          </h1>
          <p className="text-xs font-serif text-[#1A1A1A]/70">Local Neighborhood Member • Established 2024</p>
          <div className="inline-flex items-center gap-1.5 mt-1.5 text-[9px] font-sans uppercase tracking-[0.15em] font-bold text-[#1A1A1A] bg-[#EBE7DE] border border-[#1A1A1A] px-2 py-0.5">
            <CheckCircle2 className="w-3 h-3 text-[#1A1A1A]" /> BoiC Verified Patron
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="space-y-3">
        <div className="flex items-end justify-between border-b border-[#1A1A1A] pb-2">
          <div>
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
              Fulfilled Ledgers
            </span>
            <h2 className="font-heading text-lg font-bold text-[#1A1A1A] italic">
              Recent Dispatches ({orders.length})
            </h2>
          </div>
          <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1A1A1A]/60 font-bold">
            Real-time Status
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-6 text-center space-y-2">
            <Package className="w-8 h-8 text-[#1A1A1A]/60 mx-auto stroke-[1.5]" />
            <p className="text-sm font-heading font-bold text-[#1A1A1A] italic">No prior orders recorded</p>
            <p className="text-xs font-serif text-[#1A1A1A]/70">Your fresh local produce dispatches will appear here upon purchase.</p>
            <button
              onClick={onGoToShop}
              className="mt-2 inline-block text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A] underline hover:opacity-70"
            >
              Browse Products →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FAF8F5] border border-[#1A1A1A] p-4 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/20 pb-2">
                  <div>
                    <span className="font-heading text-sm font-bold text-[#1A1A1A] italic">
                      Order #{order.id}
                    </span>
                    <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#1A1A1A]/60">{order.date}</p>
                  </div>
                  <span className="text-[9px] font-sans uppercase tracking-[0.15em] font-bold px-2.5 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA]">
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="text-xs font-serif text-[#1A1A1A]/85 space-y-1">
                  {order.items.map((it) => (
                    <div key={it.product.id} className="flex justify-between">
                      <span>{it.quantity}x {it.product.name}</span>
                      <span className="font-bold">${(it.product.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total and destination */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/70 text-[11px] font-serif">
                    📍 {order.deliveryAddress}
                  </span>
                  <span className="font-serif font-bold italic text-sm text-[#1A1A1A]">
                    Total: ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Store Location & Live Status */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
          <div>
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
              Flagship Merchant
            </span>
            <h2 className="font-heading text-base font-bold text-[#1A1A1A] italic">
              Store &amp; Dispatch Location
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.15em] text-[#1A1A1A] font-bold bg-[#EBE7DE] border border-[#1A1A1A] px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] animate-pulse" />
            Open For Service
          </span>
        </div>

        <div className="space-y-2.5 text-xs font-serif text-[#1A1A1A]">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{storeInfo.address}</p>
              <p className="text-[11px] text-[#1A1A1A]/60 font-sans">Delivering within 5 miles radius</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span>{storeInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#1A1A1A] shrink-0" />
            <span>{storeInfo.hoursWeekday}</span>
          </div>
        </div>

        {/* Quick Contact buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A1A1A]/20">
          <button
            onClick={onOpenCall}
            className="px-3 py-2.5 bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] flex items-center justify-center gap-1.5 hover:bg-transparent hover:text-[#1A1A1A] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Line</span>
          </button>
          <button
            onClick={onOpenWhatsApp}
            className="px-3 py-2.5 bg-[#FAF8F5] border border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-1.5 hover:bg-[#EBE7DE] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-5 shadow-xs space-y-3">
        <div className="border-b border-[#1A1A1A] pb-2">
          <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
            Knowledge Base
          </span>
          <h2 className="font-heading text-base font-bold text-[#1A1A1A] italic flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#1A1A1A]" />
            <span>Frequently Asked Questions</span>
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#1A1A1A] bg-white overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-3 text-left text-xs font-serif font-bold text-[#1A1A1A] flex items-center justify-between bg-[#FAF8F5] hover:bg-[#EBE7DE] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  className={`w-4 h-4 text-[#1A1A1A] transition-transform ${
                    activeFaq === idx ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="p-3 text-xs font-serif text-[#1A1A1A]/80 bg-white border-t border-[#1A1A1A] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Policies Links */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A] p-4 text-xs font-serif text-[#1A1A1A] space-y-2 shadow-xs">
        <div className="flex justify-between items-center py-1 cursor-pointer hover:opacity-60 transition-opacity" onClick={() => onOpenPolicy('privacy')}>
          <span>Privacy &amp; Cookie Disclosure</span>
          <ChevronRight className="w-4 h-4 text-[#1A1A1A]" />
        </div>
        <div className="border-t border-[#1A1A1A]/20" />
        <div className="flex justify-between items-center py-1 cursor-pointer hover:opacity-60 transition-opacity" onClick={() => onOpenPolicy('terms')}>
          <span>Terms of Trade &amp; Honest Pricing</span>
          <ChevronRight className="w-4 h-4 text-[#1A1A1A]" />
        </div>
        <div className="border-t border-[#1A1A1A]/20" />
        <div className="flex justify-between items-center py-1 cursor-pointer hover:opacity-60 transition-opacity" onClick={() => onOpenPolicy('shipping')}>
          <span>Dispatch Zones &amp; Delivery Logistics</span>
          <ChevronRight className="w-4 h-4 text-[#1A1A1A]" />
        </div>
      </div>
    </div>
  );
};

