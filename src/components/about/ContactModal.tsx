import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Mail, Phone, MapPin, Send, Check, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brandConfig';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Order via WhatsApp');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all contact fields', 'error');
      return;
    }
    setSent(true);
    showToast(`Your message has been dispatched to ${BRAND_CONFIG.name}.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-xl rounded-3xl shadow-2xl border border-[#EAE5D9] overflow-hidden my-8 relative">
        <button
          onClick={() => {
            setIsContactOpen(false);
            setSent(false);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
              Direct Assistance
            </span>
            <h2 className="text-2xl font-serif font-semibold text-slate-950 mt-1">
              Connect With {BRAND_CONFIG.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Order directly via WhatsApp or send us an email for inquiries, custom orders, or delivery support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a
              href={BRAND_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-start gap-3 group"
            >
              <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="font-semibold text-emerald-950">WhatsApp Concierge</p>
                <p className="font-mono text-emerald-800 text-xs font-bold">{BRAND_CONFIG.whatsappFormatted}</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">Click to chat directly</p>
              </div>
            </a>

            <a
              href={`mailto:${BRAND_CONFIG.email}`}
              className="p-3.5 rounded-xl bg-white border border-[#EAE5D9] hover:border-[#8B5A2B] transition-colors flex items-start gap-3 group"
            >
              <div className="p-2 rounded-lg bg-slate-900 text-[#C5A880] shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email Address</p>
                <p className="text-slate-700 text-xs truncate max-w-[150px]">{BRAND_CONFIG.email}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">24-hour reply</p>
              </div>
            </a>
          </div>

          {sent ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-slate-900">Inquiry Received</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                A Naazmeen Fashion representative will review your message and reply to {email} or contact you on WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                    Email or WhatsApp Number
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="0300... or your email"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                  Nature of Inquiry
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B]"
                >
                  <option value="Order via WhatsApp">Direct Order Inquiry</option>
                  <option value="Private Styling">Product & Sizing Information</option>
                  <option value="Delivery">Cash on Delivery & Shipping Status</option>
                  <option value="Wholesale">Wholesale & Bulk Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which bag you want or ask any questions..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Send Message</span>
                </button>

                <a
                  href={BRAND_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
