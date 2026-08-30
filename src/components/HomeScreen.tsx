import React from 'react';
import {
  ShoppingBag,
  Citrus,
  Pizza,
  Droplet,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CategoryId, Product, StoreInfo } from '../types';

interface HomeScreenProps {
  storeInfo: StoreInfo;
  onSelectCategory: (categoryId: CategoryId) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'shipping') => void;
  featuredProducts?: Product[];
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  storeInfo,
  onSelectCategory,
  onOpenCall,
  onOpenWhatsApp,
  onOpenPolicy,
  featuredProducts = [],
  onSelectProduct,
  onAddToCart
}) => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Banner with Editorial Architectural Framing & Inset Quote */}
      <section
        id="hero-banner-section"
        className="relative bg-[#1A1A1A] border border-[#1A1A1A] overflow-hidden"
      >
        {/* Editorial Corner Frame Accent */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l border-t border-[#F4F1EA]/60 z-20 pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r border-t border-[#F4F1EA]/60 z-20 pointer-events-none" />

        <div className="relative min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-8">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
            alt="BoiC Small Super Market Interior"
            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.65]"
            loading="eager"
          />

          {/* Hero Content */}
          <div className="relative z-10 space-y-3 max-w-lg">
            <div className="inline-block">
              <span className="px-2.5 py-1 bg-[#F4F1EA] text-[#1A1A1A] text-[9px] font-sans uppercase tracking-[0.25em] font-bold border border-[#1A1A1A]">
                Feature Provender • Autumn 2024
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight leading-[1.05] text-[#F4F1EA] italic">
              Welcome to BoiC<br />
              Small Super Market
            </h1>

            <p className="text-[#F4F1EA]/90 text-sm font-serif leading-relaxed max-w-sm">
              Your local neighborhood store for artisanal groceries, organic farm produce, and everyday pantry essentials.
            </p>
          </div>
        </div>

        {/* Editorial Inset Quote Box */}
        <div className="bg-[#FAF8F5] p-4 sm:p-5 border-t border-[#1A1A1A] flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-serif italic text-[#1A1A1A]">
              "Good food is not a luxury, but a daily architectural cornerstone of well-being."
            </p>
            <p className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60">
              — BoiC Market Curators • Vals Edition
            </p>
          </div>
          <div className="w-2.5 h-2.5 bg-[#1A1A1A] shrink-0 rotate-45" />
        </div>
      </section>

      {/* About Us Card (Editorial Chronicle) */}
      <section
        id="about-us-card"
        className="bg-[#FAF8F5] border border-[#1A1A1A] p-6 sm:p-7 relative shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/70">
            The Chronicle
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#1A1A1A]/50">
            Est. 2024
          </span>
        </div>

        <h2 className="font-heading text-2xl font-black text-[#1A1A1A] italic tracking-tight mb-3">
          About Us
        </h2>
        <p className="text-[#1A1A1A]/85 text-sm sm:text-base leading-relaxed font-serif">
          BoiC is your neighborhood supermarket, dedicated to providing the freshest produce and highest quality everyday essentials. We believe in bringing the community together through affordable, locally-sourced, and premium groceries.
        </p>

        <div className="mt-5 pt-4 border-t border-[#1A1A1A]/20 flex items-center gap-3">
          <div className="w-8 h-[1px] bg-[#1A1A1A]" />
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]">
            Locally Sourced &amp; Inspected Daily
          </span>
        </div>
      </section>

      {/* Our Products Section (2x2 Category Grid with Editorial Framing) */}
      <section id="our-products-section" className="space-y-4">
        <div className="flex items-end justify-between border-b border-[#1A1A1A] pb-2">
          <div>
            <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block mb-0.5">
              Index of Goods
            </span>
            <h2 className="font-heading text-2xl font-black text-[#1A1A1A] tracking-tight italic">
              Our Products
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('fruits-veggies')}
            className="group flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A] hover:opacity-60 transition-opacity pb-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category 1: Groceries */}
          <button
            id="cat-card-groceries"
            onClick={() => onSelectCategory('groceries')}
            className="group flex flex-col bg-[#FAF8F5] border border-[#1A1A1A] text-left transition-all hover:bg-[#EBE7DE] active:scale-[0.99]"
          >
            <div className="h-28 sm:h-32 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
              <div className="w-12 h-12 border border-[#1A1A1A] bg-[#FAF8F5] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all">
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/40">
                01
              </span>
            </div>
            <div className="py-3 px-3 bg-[#FAF8F5] group-hover:bg-[#EBE7DE] text-center transition-colors">
              <span className="font-heading text-sm font-bold text-[#1A1A1A] tracking-wide">
                Groceries
              </span>
            </div>
          </button>

          {/* Category 2: Fruits & Veggies */}
          <button
            id="cat-card-fruits-veggies"
            onClick={() => onSelectCategory('fruits-veggies')}
            className="group flex flex-col bg-[#FAF8F5] border border-[#1A1A1A] text-left transition-all hover:bg-[#EBE7DE] active:scale-[0.99]"
          >
            <div className="h-28 sm:h-32 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
              <div className="w-12 h-12 border border-[#1A1A1A] bg-[#FAF8F5] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all">
                <Citrus className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/40">
                02
              </span>
            </div>
            <div className="py-3 px-3 bg-[#FAF8F5] group-hover:bg-[#EBE7DE] text-center transition-colors">
              <span className="font-heading text-sm font-bold text-[#1A1A1A] tracking-wide">
                Fruits &amp; Veggies
              </span>
            </div>
          </button>

          {/* Category 3: Snacks */}
          <button
            id="cat-card-snacks"
            onClick={() => onSelectCategory('snacks')}
            className="group flex flex-col bg-[#FAF8F5] border border-[#1A1A1A] text-left transition-all hover:bg-[#EBE7DE] active:scale-[0.99]"
          >
            <div className="h-28 sm:h-32 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
              <div className="w-12 h-12 border border-[#1A1A1A] bg-[#FAF8F5] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all">
                <Pizza className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/40">
                03
              </span>
            </div>
            <div className="py-3 px-3 bg-[#FAF8F5] group-hover:bg-[#EBE7DE] text-center transition-colors">
              <span className="font-heading text-sm font-bold text-[#1A1A1A] tracking-wide">
                Snacks
              </span>
            </div>
          </button>

          {/* Category 4: Dairy */}
          <button
            id="cat-card-dairy"
            onClick={() => onSelectCategory('dairy')}
            className="group flex flex-col bg-[#FAF8F5] border border-[#1A1A1A] text-left transition-all hover:bg-[#EBE7DE] active:scale-[0.99]"
          >
            <div className="h-28 sm:h-32 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
              <div className="w-12 h-12 border border-[#1A1A1A] bg-[#FAF8F5] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all">
                <Droplet className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/40">
                04
              </span>
            </div>
            <div className="py-3 px-3 bg-[#FAF8F5] group-hover:bg-[#EBE7DE] text-center transition-colors">
              <span className="font-heading text-sm font-bold text-[#1A1A1A] tracking-wide">
                Dairy
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Fresh Picks Spotlight (Editorial Catalog Cards) */}
      {featuredProducts.length > 0 && (
        <section id="fresh-picks-section" className="space-y-4 pt-2">
          <div className="flex items-end justify-between border-b border-[#1A1A1A] pb-2">
            <div>
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block mb-0.5">
                Curated Selection
              </span>
              <h2 className="font-heading text-xl font-bold text-[#1A1A1A] italic">
                Today's Fresh Picks
              </h2>
            </div>
            <button
              onClick={() => onSelectCategory('fruits-veggies')}
              className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:underline"
            >
              See All &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 2).map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF8F5] border border-[#1A1A1A] p-3 flex flex-col justify-between group hover:bg-[#EBE7DE]/40 transition-colors"
              >
                <div
                  className="cursor-pointer space-y-2"
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                >
                  <div className="relative h-28 overflow-hidden bg-[#EBE7DE] border border-[#1A1A1A]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isFreshToday && (
                      <span className="absolute top-1.5 left-1.5 bg-[#1A1A1A] text-[#F4F1EA] text-[9px] font-sans uppercase tracking-[0.15em] font-bold px-2 py-0.5">
                        Fresh Daily
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#1A1A1A] line-clamp-1 group-hover:opacity-75 transition-opacity">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1A1A1A]/60">
                      {product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1A1A1A]/20">
                  <span className="font-serif text-sm font-bold italic text-[#1A1A1A]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="px-3 py-1 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.15em] font-bold transition-all active:scale-95"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Us Card (Editorial Concierge Card) */}
      <section
        id="contact-us-card"
        className="bg-[#FAF8F5] border border-[#1A1A1A] p-6 sm:p-7 space-y-6 shadow-xs relative"
      >
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/70">
            Dispatch &amp; Concierge
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#1A1A1A]/50">
            Inquiries
          </span>
        </div>

        <h2 className="font-heading text-2xl font-black text-[#1A1A1A] italic tracking-tight">
          Contact Us
        </h2>

        {/* Contact Info List */}
        <div className="space-y-4 text-sm text-[#1A1A1A] font-serif">
          {/* Location */}
          <div className="flex items-start gap-3.5 pb-3 border-b border-[#1A1A1A]/15">
            <div className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <p className="font-medium text-[#1A1A1A]">{storeInfo.address}</p>
              <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#1A1A1A]/60 mt-0.5">
                Near Central Community Park
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3.5 pb-3 border-b border-[#1A1A1A]/15">
            <div className="w-5 h-5 text-[#1A1A1A] shrink-0">
              <Phone className="w-4 h-4 stroke-[2]" />
            </div>
            <a
              href={`tel:${storeInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="font-bold text-[#1A1A1A] hover:underline font-serif"
            >
              {storeInfo.phone}
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3.5">
            <div className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="space-y-0.5">
              <p className="font-medium text-[#1A1A1A]">{storeInfo.hoursWeekday}</p>
              <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#1A1A1A]/60">
                {storeInfo.hoursSunday}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Call Now & WhatsApp with Editorial Styling */}
        <div className="space-y-3 pt-2">
          {/* Call Now Button (Solid black editorial) */}
          <button
            id="btn-call-now"
            onClick={onOpenCall}
            className="w-full bg-[#1A1A1A] hover:bg-[#2E2E2E] active:bg-black text-[#F4F1EA] font-sans uppercase tracking-[0.25em] text-xs font-bold py-3.5 px-4 border border-[#1A1A1A] flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
          >
            <Phone className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Call Now</span>
          </button>

          {/* WhatsApp Button (White/paper with crisp border, inverted on hover) */}
          <button
            id="btn-whatsapp"
            onClick={onOpenWhatsApp}
            className="w-full bg-transparent hover:bg-[#1A1A1A] hover:text-[#F4F1EA] active:bg-[#1A1A1A] text-[#1A1A1A] border border-[#1A1A1A] font-sans uppercase tracking-[0.25em] text-xs font-bold py-3.5 px-4 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>WhatsApp</span>
          </button>
        </div>
      </section>

      {/* Footer Section (Editorial Colophon) */}
      <footer id="home-footer" className="text-center pt-6 pb-6 space-y-4 border-t border-[#1A1A1A]">
        {/* Brand name & Issue */}
        <div className="space-y-1">
          <p className="font-heading font-black text-lg text-[#1A1A1A] italic tracking-tight">
            BoiC Market Archive
          </p>
          <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#1A1A1A]/60 font-bold">
            The Neighborhood Provender &amp; Goods
          </p>
        </div>

        {/* Policy Links */}
        <div className="flex items-center justify-center gap-4 text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70">
          <button
            onClick={() => onOpenPolicy('privacy')}
            className="hover:text-[#1A1A1A] hover:underline"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('terms')}
            className="hover:text-[#1A1A1A] hover:underline"
          >
            Terms of Service
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('shipping')}
            className="hover:text-[#1A1A1A] hover:underline"
          >
            Shipping Info
          </button>
        </div>

        {/* Copyright */}
        <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/50">
          &copy; 2024 BoiC Small Super Market. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

