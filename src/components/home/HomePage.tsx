import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  HERO_IMAGE,
  ATELIER_IMAGE,
  EDITORIAL_BANNER,
  CATEGORY_DATA
} from '../../data/seedProducts';
import { ProductCard } from '../shop/ProductCard';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  Star,
  Quote,
  CheckCircle2,
  ChevronRight,
  Upload,
  MessageCircle
} from 'lucide-react';
import { BagCategory } from '../../types';
import { BRAND_CONFIG } from '../../data/brandConfig';

export const HomePage: React.FC = () => {
  const {
    products,
    setActiveView,
    setSelectedCategoryFilter,
    setSelectedProductId,
    setIsAboutOpen,
    setIsContactOpen,
    setIsProductUploadOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newArrivals'>('bestsellers');

  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);
  const displayedProducts = activeTab === 'bestsellers' ? bestsellers : newArrivals;

  const handleCategoryClick = (catName: BagCategory) => {
    setSelectedCategoryFilter(catName);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreHero = () => {
    setSelectedCategoryFilter('All');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Large Hero Section */}
      <section className="relative overflow-hidden bg-[#0A1128] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A880] text-[11px] uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Naazmeen Fashion Exclusive 2026 Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.1] tracking-tight text-[#FAF8F5]">
                {BRAND_CONFIG.name} <br />
                <span className="italic font-normal text-[#C5A880]">Elegance In Every Stitch.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-light max-w-lg leading-relaxed">
                Handcrafted luxury women's bags, structured handbags, totes, and leather accessories designed to elevate your personal style with graceful luxury.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExploreHero}
                  className="px-8 py-4 bg-[#FAF8F5] text-[#0F172A] hover:bg-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-xl transition-all flex items-center gap-2 group hover:scale-[1.02]"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href={BRAND_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-xl transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp: {BRAND_CONFIG.whatsapp}</span>
                </a>

                {/* Direct Upload Product Button */}
                <button
                  onClick={() => setIsProductUploadOpen(true)}
                  className="px-5 py-4 bg-[#8B5A2B] hover:bg-[#724820] text-white border border-[#C5A880]/40 text-xs uppercase tracking-widest font-semibold rounded-xl transition-all flex items-center gap-2 shadow-md"
                  title="Upload New Product"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Product</span>
                </button>
              </div>

              {/* Trust Metric callout */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[#FAF8F5] tabular-nums">100%</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Genuine Quality</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[#FAF8F5] tabular-nums">Cash on</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Delivery Available</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[#FAF8F5] tabular-nums">24/7</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">WhatsApp Support</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src={HERO_IMAGE}
                  alt="Naazmeen Fashion model with luxury handbag"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">Naazmeen Signature Creation</span>
                    <h3 className="font-serif text-lg font-medium text-white">The Paloma Top Handle in Noir</h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProductId('prod-01');
                      setActiveView('product');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 transition-all"
                    aria-label="View The Paloma Top Handle"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Section: 6 Defined Silhouettes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE5D9]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
              Refined Silhouettes
            </p>
            <h2 className="text-3xl font-serif font-semibold text-slate-950 mt-1">
              Explore By Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter('All');
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-wider font-semibold text-slate-800 hover:text-[#8B5A2B] transition-colors mt-3 sm:mt-0 flex items-center gap-1.5"
          >
            <span>View All Collections</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORY_DATA.map(cat => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#EAE5D9] hover:border-[#C5A880] transition-all hover:shadow-md cursor-pointer"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#FAF8F5] mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-serif text-sm font-semibold text-slate-900 group-hover:text-[#8B5A2B] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">{cat.count} Designs</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers & New Arrivals Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
              Handcrafted in Florence
            </p>
            <h2 className="text-3xl font-serif font-semibold text-slate-950 mt-1">
              Curated Highlights
            </h2>
          </div>

          {/* Segmented Tab Controls */}
          <div className="flex items-center p-1 bg-[#EAE5D9]/60 rounded-xl">
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'newArrivals'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Promotional / Editorial Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE5D9]">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative">
            <img
              src={EDITORIAL_BANNER}
              alt="Aurelia Atelier editorial banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center p-6 sm:p-12 lg:p-16">
            <div className="max-w-xl text-white space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
                Private Atelier Release
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light leading-tight">
                The Heritage Palette: <br />
                <span className="italic font-normal text-[#C5A880]">Merlot, Cognac & Noir</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Dyed with natural vegetable extracts, our autumn-winter hues evolve with a luminous patina unique to your journey.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    setActiveView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-[#FAF8F5] text-[#0F172A] hover:bg-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Explore Limited Colorways</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship & Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Craftsmanship Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#EAE5D9] shadow-lg aspect-[4/3] bg-[#F5F2EB]">
              <img
                src={ATELIER_IMAGE}
                alt="Artisan hands stitching leather handbag"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#EAE5D9] shadow-md text-xs font-serif text-slate-900">
                Atelier di Firenze · Est. 2026
              </div>
            </div>
          </div>

          {/* Value Pillars Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
                The Aurelia Promise
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-950 mt-1">
                Why Discerning Women Choose Aurelia
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              We reject the planned obsolescence of mass fashion. Every bag is an investment piece engineered to withstand decades of daily use while retaining its sculptural silhouette.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8B5A2B] shrink-0 border border-amber-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Vegetable-Tanned Tuscan Calfskin</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Tanned with tree bark in water baths without toxic chrome salts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8B5A2B] shrink-0 border border-amber-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Custom 24k Gold-Brushed Hardware</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Cast in solid brass, triple-dipped, and hand-polished to resist scratching.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8B5A2B] shrink-0 border border-amber-200">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Complimentary Insured Courier</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Dispatched with security tags, silk dust covers, and signed receipts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8B5A2B] shrink-0 border border-amber-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Lifetime Restoration Support</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Complimentary annual conditioning and edge retouching at our ateliers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
              Verified Client Voices
            </p>
            <h2 className="text-3xl font-serif font-semibold text-slate-950 mt-1">
              Words From The Atelier Circle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5D9] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-serif italic text-base">
                  "The Paloma Top Handle arrived in London within two days. The box calfskin has an exquisite matte glow that rivals Hermès and Celine, but with an uncompromising understated spirit."
                </p>
              </div>
              <div className="pt-3 border-t border-[#EAE5D9]/70 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-slate-900">Lady Eleanor Vance</h5>
                  <p className="text-[10px] text-slate-500">London, United Kingdom</p>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Collector
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5D9] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-serif italic text-base">
                  "The Grand Tote in Alabaster fits my MacBook and daily files effortlessly. The handles don't dig into my shoulder, and the leather aroma upon opening the box was divine."
                </p>
              </div>
              <div className="pt-3 border-t border-[#EAE5D9]/70 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-slate-900">Camille Dupont</h5>
                  <p className="text-[10px] text-slate-500">Paris, France</p>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Collector
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5D9] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-serif italic text-base">
                  "Color switching was exact on the site—I chose the Forest Emerald Celine Saddle and it looks even more mesmerizing in person. Outstanding craftsmanship and packaging."
                </p>
              </div>
              <div className="pt-3 border-t border-[#EAE5D9]/70 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-slate-900">Sophia Montgomery</h5>
                  <p className="text-[10px] text-slate-500">New York, USA</p>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Collector
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
