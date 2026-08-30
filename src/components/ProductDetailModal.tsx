import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  ShieldCheck,
  MapPin,
  Clock
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  initialQuantity?: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  initialQuantity = 1,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity > 0 ? initialQuantity : 1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-md border border-[#1A1A1A] shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 bg-[#EBE7DE] border-b border-[#1A1A1A]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-[#FAF8F5] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] flex items-center justify-center shadow-xs transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badges */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {product.isOrganic && (
              <span className="bg-[#1A1A1A] text-[#F4F1EA] text-[9px] font-sans uppercase tracking-[0.15em] font-bold px-2.5 py-1 border border-[#F4F1EA]">
                100% Certified Organic
              </span>
            )}
            {product.isFreshToday && (
              <span className="bg-[#FAF8F5] text-[#1A1A1A] text-[9px] font-sans uppercase tracking-[0.15em] font-bold px-2.5 py-1 border border-[#1A1A1A]">
                Fresh Harvest Today
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-[#1A1A1A]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60">
                {product.category.replace('-', ' & ')}
              </span>
              <div className="flex items-center gap-1 text-xs font-serif text-[#1A1A1A]">
                <Star className="w-3.5 h-3.5 fill-[#1A1A1A] text-[#1A1A1A]" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#1A1A1A]/60 font-sans text-[10px]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mt-1 italic">
              {product.name}
            </h2>
            <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#1A1A1A]/60 mt-0.5">{product.unit}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 border-b border-[#1A1A1A]/20 pb-3">
            <span className="font-serif text-2xl font-bold italic text-[#1A1A1A]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-serif text-[#1A1A1A]/50 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1 text-xs sm:text-sm font-serif text-[#1A1A1A]/85 leading-relaxed">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70">Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Origin & Sourcing */}
          {product.origin && (
            <div className="bg-[#EBE7DE]/60 p-3 border border-[#1A1A1A] space-y-1 text-xs font-serif">
              <div className="flex items-center gap-1.5 text-[#1A1A1A] font-bold text-[10px] font-sans uppercase tracking-[0.15em]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Farm &amp; Sourcing Origin</span>
              </div>
              <p className="text-[#1A1A1A]/80">{product.origin}</p>
            </div>
          )}

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-serif text-[#1A1A1A]/70">
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#1A1A1A] p-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0" />
              <span>100% Quality Checked</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#1A1A1A] p-2">
              <Clock className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0" />
              <span>Same-Day Local Dispatch</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#EBE7DE] border-t border-[#1A1A1A] flex items-center justify-between gap-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#1A1A1A] p-0.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-[#EBE7DE] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] flex items-center justify-center transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-serif font-bold text-sm text-[#1A1A1A] w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#333] flex items-center justify-center transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="flex-1 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] py-3 px-4 border border-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add • ${(product.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

