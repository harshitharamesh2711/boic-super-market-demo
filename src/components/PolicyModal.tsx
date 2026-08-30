import React from 'react';
import { X, Shield, FileText, Truck } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'shipping' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Protocol & Data Policy',
      icon: Shield,
      subtitle: 'Protection of subscriber & customer information',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect minimal contact details (name, delivery address, phone number) purely to fulfill your grocery orders and provide dispatch updates.'
        },
        {
          heading: '2. Local Data Storage',
          body: 'Your basket selections and transaction ledger are securely preserved locally in your browser so you never lose track of your neighborhood grocery items.'
        },
        {
          heading: '3. No Third-Party Data Sharing',
          body: 'We never sell or rent your personal information to third parties. Your information remains strictly within BoiC Small Super Market operations.'
        }
      ]
    },
    terms: {
      title: 'Terms of Merchant Service',
      icon: FileText,
      subtitle: 'Fair pricing, fresh harvest guarantee & quality standards',
      sections: [
        {
          heading: '1. Freshness Guarantee',
          body: 'All fresh produce, dairy, and bakery items are inspected on the morning of dispatch. If any item does not meet your standards, we offer an immediate replacement or store credit.'
        },
        {
          heading: '2. Pricing & Weight Variance',
          body: 'Produce sold by approximate weights is weighed carefully before packing to ensure you receive true value.'
        },
        {
          heading: '3. Order Adjustments',
          body: 'You may modify or cancel your order anytime before our dispatch runner departs by calling +1 234 567 890.'
        }
      ]
    },
    shipping: {
      title: 'Dispatch & Delivery Standards',
      icon: Truck,
      subtitle: 'Local distribution radius, tariffs & courier time slots',
      sections: [
        {
          heading: '1. Delivery Radius',
          body: 'We deliver within a 5-mile radius of our store location at 123 Local Street. Orders are packed in insulated containers to keep dairy and greens crisp.'
        },
        {
          heading: '2. Delivery Fees',
          body: 'Standard local delivery is $2.99. Orders over $25.00 qualify for complimentary delivery.'
        },
        {
          heading: '3. Dispatch Hours & Speed',
          body: 'Orders placed between 8:00 AM and 8:00 PM are delivered in under 60-90 minutes, or during your selected delivery slot.'
        }
      ]
    }
  };

  const current = contentMap[type];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-md border border-[#1A1A1A] shadow-2xl max-h-[85vh] flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
                Official Publication
              </span>
              <h2 className="font-heading font-bold text-base text-[#1A1A1A] italic">
                {current.title}
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
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#1A1A1A]/85 font-serif leading-relaxed">
          {current.sections.map((sec, idx) => (
            <div key={idx} className="space-y-1 border-b border-[#1A1A1A]/10 pb-3 last:border-none">
              <h3 className="font-heading font-bold text-sm text-[#1A1A1A] italic">
                {sec.heading}
              </h3>
              <p className="text-[12px]">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EBE7DE] border-t border-[#1A1A1A] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] text-[10px] font-sans uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] transition-colors shadow-xs"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

