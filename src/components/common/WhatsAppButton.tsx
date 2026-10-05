import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../data/brandConfig';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = encodeURIComponent(
    `Hello Naazmeen Fashion, I would like to inquire about your women's bags collection.`
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE5D9] p-4 max-w-xs w-72 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE5D9]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                NF
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">{BRAND_CONFIG.name}</p>
                <p className="text-[10px] text-emerald-600 font-medium">WhatsApp Support Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
              aria-label="Close WhatsApp card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 space-y-1.5">
            <p>Direct WhatsApp Order & Inquiries:</p>
            <p className="font-mono font-bold text-slate-900 text-sm">{BRAND_CONFIG.whatsappFormatted}</p>
            <p className="text-[11px] text-slate-500">
              Order any bag directly on WhatsApp with cash on delivery or instant confirmation.
            </p>
          </div>

          <a
            href={`${BRAND_CONFIG.whatsappLink}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all hover:scale-105 group border-2 border-white"
        aria-label="Contact on WhatsApp"
        title="WhatsApp: 03033237505"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          WhatsApp: {BRAND_CONFIG.whatsapp}
        </span>
      </button>
    </div>
  );
};
