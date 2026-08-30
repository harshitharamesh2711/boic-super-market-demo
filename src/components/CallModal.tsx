import React, { useState } from 'react';
import { X, Phone, PhoneCall, Clock, CheckCircle2 } from 'lucide-react';
import { StoreInfo } from '../types';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  storeInfo,
}) => {
  const [simulatedCalling, setSimulatedCalling] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedCall = () => {
    setSimulatedCalling(true);
    setTimeout(() => {
      window.location.href = `tel:${storeInfo.phone.replace(/[^0-9+]/g, '')}`;
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-sm border border-[#1A1A1A] shadow-2xl flex flex-col animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-[#EBE7DE] border-b border-[#1A1A1A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
                Direct Telephony
              </span>
              <h2 className="font-heading font-bold text-base text-[#1A1A1A] italic">
                Direct Line Connect
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
        <div className="p-6 text-center space-y-4 text-xs sm:text-sm text-[#1A1A1A]">
          <div className="w-16 h-16 border-2 border-[#1A1A1A] bg-[#EBE7DE] text-[#1A1A1A] mx-auto flex items-center justify-center shadow-xs">
            <PhoneCall className={`w-8 h-8 ${simulatedCalling ? 'animate-pulse' : ''}`} />
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block">
              Merchant Desk
            </span>
            <h3 className="font-heading text-lg font-bold text-[#1A1A1A] italic">
              {storeInfo.name}
            </h3>
            <p className="font-serif text-2xl font-bold text-[#1A1A1A]">
              {storeInfo.phone}
            </p>
          </div>

          <div className="bg-[#EBE7DE]/60 p-3.5 border border-[#1A1A1A] space-y-1.5 text-xs text-left font-serif">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-bold text-[10px] font-sans uppercase tracking-[0.15em]">
              <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
              <span>Lines Currently Open</span>
            </div>
            <p className="text-[#1A1A1A]/80 text-[11px]">
              {storeInfo.hoursWeekday}
            </p>
            <p className="text-[#1A1A1A]/80 text-[11px]">
              {storeInfo.hoursSunday}
            </p>
          </div>

          {/* Call Buttons */}
          <div className="space-y-2 pt-2">
            <a
              href={`tel:${storeInfo.phone.replace(/[^0-9+]/g, '')}`}
              onClick={handleSimulatedCall}
              className="w-full bg-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] text-[#F4F1EA] py-3.5 px-4 border border-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Dial Hotline • {storeInfo.phone}</span>
            </a>
            <button
              onClick={onClose}
              className="w-full text-[#1A1A1A]/70 hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.15em] py-2 font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

