import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, ExternalLink, Send } from 'lucide-react';
import { CartItem, StoreInfo } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  storeInfo: StoreInfo;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  storeInfo,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build default message
  const generateDefaultMessage = () => {
    if (cartItems.length === 0) {
      return `Hello BoiC Small Super Market! 👋\n\nI would like to inquire about today's fresh grocery arrivals and local delivery availability.`;
    }

    const itemsText = cartItems
      .map(
        (it) =>
          `• ${it.quantity}x ${it.product.name} (${it.product.unit}) - $${(
            it.product.price * it.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const total = cartItems.reduce(
      (sum, it) => sum + it.product.price * it.quantity,
      0
    );

    return `Hello BoiC Small Super Market! 🛒\n\nI would like to place an order for delivery:\n\n${itemsText}\n\n*Estimated Total: $${total.toFixed(
      2
    )}*\n\nPlease confirm availability and payment details. Thank you!`;
  };

  const [message, setMessage] = useState(generateDefaultMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanPhone = storeInfo.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-md border border-[#1A1A1A] shadow-2xl flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
                Direct Line Dispatch
              </span>
              <h2 className="font-heading font-bold text-base text-[#1A1A1A] italic">
                WhatsApp Dispatch Order
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

        {/* Body */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-[#1A1A1A]">
          <p className="text-xs font-serif text-[#1A1A1A]/85">
            Review or customize your order manifest below, then tap <strong>Open in WhatsApp</strong> to transmit directly to our store counter:
          </p>

          {/* Message Box */}
          <div className="relative">
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-white border border-[#1A1A1A] text-xs font-mono text-[#1A1A1A] focus:outline-none leading-relaxed resize-none"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2.5 right-2.5 px-2 py-1 bg-[#FAF8F5] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] flex items-center gap-1 text-[9px] font-sans uppercase tracking-[0.15em] font-bold transition-colors"
              title="Copy text"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#EBE7DE]/60 p-3 border border-[#1A1A1A] text-xs font-serif text-[#1A1A1A] flex items-start gap-2">
            <span className="text-sm leading-none">💬</span>
            <p className="text-[11px] leading-snug">
              Store hotline on WhatsApp: <strong>{storeInfo.phone}</strong>. Responses are typically returned within 2-5 minutes during trading hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EBE7DE] border-t border-[#1A1A1A] flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A] py-3.5 px-4 text-[10px] font-sans uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      </div>
    </div>
  );
};

