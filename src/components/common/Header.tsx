import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, X, Shield, Package, ArrowRight, Upload, MessageCircle } from 'lucide-react';
import { BagCategory } from '../../types';
import { BRAND_CONFIG } from '../../data/brandConfig';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setSelectedCategoryFilter,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsProductUploadOpen,
    isAdminLoggedIn
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);

  const handleNavClick = (view: 'home' | 'shop' | 'admin' | 'orders', category?: BagCategory | 'All') => {
    if (category) {
      setSelectedCategoryFilter(category);
    } else if (view === 'shop') {
      setSelectedCategoryFilter('All');
    }
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5D9]/80 transition-all">
      {/* Promotional Top Bar with WhatsApp & Email */}
      {!promoDismissed && (
        <div className="bg-[#0F172A] text-[#FAF8F5] px-4 py-2 text-[11px] tracking-widest font-medium uppercase text-center relative flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-[#C5A880] font-semibold">{BRAND_CONFIG.name}</span>
            <span>·</span>
            <a
              href={BRAND_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: {BRAND_CONFIG.whatsapp}</span>
            </a>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline text-slate-300">{BRAND_CONFIG.email}</span>
            <span className="hidden lg:inline text-[#C5A880]">· Cash on Delivery Available</span>
          </div>
          <button
            onClick={() => setPromoDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 hover:text-slate-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-[0.16em] font-semibold text-[#0F172A] uppercase transition-colors group-hover:text-[#8B5A2B]">
              NAAZMEEN FASHION
            </span>
            <span className="block text-[9px] tracking-[0.3em] text-[#8B5A2B] uppercase font-sans font-medium -mt-0.5">
              Luxury Women's Bags
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-slate-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-[#0F172A] relative py-1 ${
              activeView === 'home' ? 'text-[#0F172A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#0F172A]' : ''
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('shop', 'All')}
            className={`transition-colors hover:text-[#0F172A] relative py-1 ${
              activeView === 'shop' ? 'text-[#0F172A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#0F172A]' : ''
            }`}
          >
            Boutique
          </button>

          <button
            onClick={() => handleNavClick('shop', 'Handbags')}
            className="transition-colors hover:text-[#0F172A] py-1"
          >
            Handbags
          </button>

          <button
            onClick={() => handleNavClick('shop', 'Shoulder Bags')}
            className="transition-colors hover:text-[#0F172A] py-1"
          >
            Shoulder Bags
          </button>

          <button
            onClick={() => handleNavClick('shop', 'Tote Bags')}
            className="transition-colors hover:text-[#0F172A] py-1"
          >
            Totes
          </button>

          <button
            onClick={() => handleNavClick('orders')}
            className={`transition-colors hover:text-[#0F172A] py-1 flex items-center gap-1.5 ${
              activeView === 'orders' ? 'text-[#0F172A] font-semibold' : ''
            }`}
          >
            <Package className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Orders</span>
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* UPLOAD PRODUCT BUTTON (Direct action for owner) */}
          <button
            onClick={() => setIsProductUploadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#8B5A2B] hover:bg-[#724820] text-white shadow-sm transition-all hover:scale-105"
            title="Upload New Product"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Product</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-[#EAE5D9]/50 rounded-full transition-colors relative"
            aria-label="Search collection"
            title="Search collection"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-[#EAE5D9]/50 rounded-full transition-colors relative"
            aria-label="View saved items"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B5A2B] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-[#EAE5D9]/50 rounded-full transition-colors relative group"
            aria-label="Open shopping bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#0F172A] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Portal Shortcut */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-colors border ${
              activeView === 'admin' || isAdminLoggedIn
                ? 'bg-[#0F172A] text-[#FAF8F5] border-[#0F172A]'
                : 'text-slate-600 border-[#EAE5D9] hover:border-slate-400 hover:text-slate-900 bg-white/60'
            }`}
            title="Admin Management Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE5D9] bg-[#FAF8F5] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Quick Upload in Mobile Menu */}
          <button
            onClick={() => {
              setIsProductUploadOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-[#8B5A2B] text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Product / نئی پروڈکٹ اپلوڈ کریں</span>
          </button>

          <div className="grid grid-cols-2 gap-3 text-xs uppercase font-medium tracking-wider text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              All Bags
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Handbags')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Handbags
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Shoulder Bags')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Shoulder Bags
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Crossbody Bags')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Crossbody
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Tote Bags')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Totes
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Clutches')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Clutches
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Wallets')}
              className="text-left p-3 rounded-lg bg-white/70 border border-[#EAE5D9] hover:bg-white"
            >
              Wallets
            </button>
          </div>

          <div className="pt-2 border-t border-[#EAE5D9] flex flex-col gap-2">
            <a
              href={BRAND_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {BRAND_CONFIG.whatsapp}</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleNavClick('orders')}
              className="flex items-center justify-between w-full p-3 rounded-lg bg-white text-xs font-medium uppercase tracking-wider text-slate-800 border border-[#EAE5D9]"
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8B5A2B]" />
                <span>Track Orders</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-between w-full p-3 rounded-lg bg-[#0F172A] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C5A880]" />
                <span>Admin Portal</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

