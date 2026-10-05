import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { BagCategory } from '../../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProductId,
    setActiveView,
    setSelectedCategoryFilter
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.colors.some(c => c.colorName.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setActiveView('product');
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (cat: BagCategory) => {
    setSelectedCategoryFilter(cat);
    setActiveView('shop');
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#EAE5D9] overflow-hidden my-8 sm:my-16">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE5D9] flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search handbags, crossbody, cognac leather, tote..."
            className="w-full bg-transparent text-base sm:text-lg text-slate-900 placeholder-slate-400 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-slate-600 hover:text-slate-900 bg-[#EAE5D9]/50 hover:bg-[#EAE5D9] rounded-lg transition-colors shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Popular Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {(['Handbags', 'Shoulder Bags', 'Crossbody Bags', 'Tote Bags', 'Clutches', 'Wallets'] as BagCategory[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#EAE5D9] rounded-lg hover:border-slate-900 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-[#C5A880]" />
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Featured Bestsellers
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 4).map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleProductSelect(p.id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-[#EAE5D9] bg-white/70 hover:bg-white hover:border-[#C5A880] cursor-pointer transition-all group"
                    >
                      <img
                        src={p.colors[0]?.images[0]}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-lg bg-stone-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-slate-400 uppercase tracking-wider truncate">{p.category}</p>
                        <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-[#8B5A2B]">{p.name}</p>
                        <p className="text-xs font-medium text-slate-700 tabular-nums">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
              </p>
              <div className="divide-y divide-[#EAE5D9]">
                {filteredProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleProductSelect(p.id)}
                    className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-white/60 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={p.colors[0]?.images[0]}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-lg bg-stone-100 shrink-0 border border-[#EAE5D9]"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B5A2B] font-semibold">{p.category}</span>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#8B5A2B] transition-colors truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          <span className="tabular-nums font-semibold text-slate-900">
                            ${p.salePrice ? p.salePrice : p.price}
                          </span>
                          {p.salePrice && (
                            <span className="line-through text-slate-400 tabular-nums">${p.price}</span>
                          )}
                          <span>·</span>
                          <span>{p.colors.length} colorways</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all shrink-0 mr-2" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-serif text-slate-700">No leather pieces match "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by category, silhouette, or color such as "Handbags" or "Noir".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
