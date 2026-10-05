import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, Check, MessageCircle, Mail, Phone, Upload } from 'lucide-react';
import { BagCategory } from '../../types';
import { BRAND_CONFIG } from '../../data/brandConfig';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategoryFilter, showToast, setIsAboutOpen, setIsContactOpen, setIsProductUploadOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast(`Privilege subscription confirmed. Welcome to ${BRAND_CONFIG.name}.`, 'success');
  };

  const navigateToCategory = (cat: BagCategory) => {
    setSelectedCategoryFilter(cat);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-[#FAF8F5] pt-16 pb-12 border-t border-slate-800">
      {/* Trust Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 text-[#C5A880] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white font-sans">Premium Calfskin</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Vegetable-tanned premium leathers curated for lasting beauty.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 text-[#C5A880] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white font-sans">Cash on Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Insured delivery with cash on delivery available nationwide.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 text-[#C5A880] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white font-sans">WhatsApp Concierge</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Order directly on WhatsApp: {BRAND_CONFIG.whatsappFormatted}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 text-[#C5A880] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white font-sans">Quality Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Guaranteed authentic luxury craftsmanship with 30-day exchange.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif tracking-[0.18em] font-semibold text-[#FAF8F5] uppercase">
              {BRAND_CONFIG.name}
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-[#C5A880] uppercase font-sans font-medium -mt-1">
              Luxury Women's Handbags & Accessories
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              Dedicated to luxury craftsmanship, iconic women's handbags, clutches, and leather accessories tailored for timeless grace.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <a
                href={BRAND_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong>{BRAND_CONFIG.whatsappFormatted}</strong></span>
              </a>
              <a
                href={`mailto:${BRAND_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-[#C5A880] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Email: <strong>{BRAND_CONFIG.email}</strong></span>
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-2">
                Join the Naazmeen VIP Club
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-lg">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Your subscription is confirmed. Welcome to Naazmeen Fashion.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-l-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C5A880] hover:bg-[#b09068] text-slate-950 font-medium px-4 py-2.5 rounded-r-lg text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Boutique Navigation */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-4">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateToCategory('Handbags')} className="hover:text-white transition-colors">
                  Iconic Handbags
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Shoulder Bags')} className="hover:text-white transition-colors">
                  Shoulder Bags
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Crossbody Bags')} className="hover:text-white transition-colors">
                  Crossbody Bags
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Tote Bags')} className="hover:text-white transition-colors">
                  Architectural Totes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Clutches')} className="hover:text-white transition-colors">
                  Evening Clutches
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Wallets')} className="hover:text-white transition-colors">
                  Leather Wallets & Accs.
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-4">
              Client Support
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href={BRAND_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp 03033237505</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{BRAND_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <button onClick={() => { setActiveView('orders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Customer Concierge Form
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors">
                  Leather Care & Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Administration & Fast Product Upload */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-4">
              Quick Admin Actions
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setIsProductUploadOpen(true)}
                  className="px-3 py-2 bg-[#8B5A2B] hover:bg-[#724820] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 w-full"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Product (اپلوڈ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-medium text-[#C5A880] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Admin Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors">
                  About Naazmeen Fashion
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Press & Business Inquiries
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} {BRAND_CONFIG.name}. All Rights Reserved. Email: {BRAND_CONFIG.email} · WhatsApp: {BRAND_CONFIG.whatsapp}
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>·</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>·</span>
          <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
        </div>
      </div>
    </footer>
  );
};
