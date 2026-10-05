import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { BagCategory } from '../../types';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';

const CATEGORIES: (BagCategory | 'All')[] = [
  'All',
  'Handbags',
  'Shoulder Bags',
  'Crossbody Bags',
  'Tote Bags',
  'Clutches',
  'Wallets'
];

const COLOR_SWATCHES = [
  { name: 'Noir Black', hex: '#141416' },
  { name: 'Cognac Tan', hex: '#8B5A2B' },
  { name: 'Alabaster Ivory', hex: '#F2EDE4' },
  { name: 'Forest Emerald', hex: '#1F3F2B' },
  { name: 'Merlot Burgundy', hex: '#5A1827' }
];

export const ShopPage: React.FC = () => {
  const { products, selectedCategoryFilter, setSelectedCategoryFilter } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low-high' | 'price-high-low' | 'bestselling'>('featured');
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleColorFilter = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategoryFilter('All');
    setSearchQuery('');
    setMaxPrice(800);
    setSelectedColors([]);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategoryFilter !== 'All' ||
    searchQuery.trim() !== '' ||
    maxPrice < 800 ||
    selectedColors.length > 0 ||
    inStockOnly;

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategoryFilter !== 'All') {
      result = result.filter(p => p.category === selectedCategoryFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price
    result = result.filter(p => {
      const effPrice = p.salePrice ?? p.price;
      return effPrice <= maxPrice;
    });

    // In Stock
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Color
    if (selectedColors.length > 0) {
      result = result.filter(p =>
        p.colors.some(col => selectedColors.includes(col.colorName))
      );
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'price-low-high') {
      result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    } else if (sortBy === 'bestselling') {
      result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    return result;
  }, [products, selectedCategoryFilter, searchQuery, maxPrice, inStockOnly, selectedColors, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="border-b border-[#EAE5D9] pb-8 mb-8 text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
          Artisanal Leathercraft
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-950 mt-1">
          The Boutique Collection
        </h1>
        <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed">
          Full-grain Tuscan leathers, bespoke 24k brushed brass locks, and hand-burnished silhouettes designed to accompany a life of elegance.
        </p>
      </div>

      {/* Mobile Filter Toggle & Quick Bar */}
      <div className="lg:hidden flex items-center justify-between pb-6 border-b border-[#EAE5D9] mb-6">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EAE5D9] bg-white text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#8B5A2B]" />
          <span>Filters & Categories</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#8B5A2B]" />
          )}
        </button>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs uppercase font-medium tracking-wider bg-white border border-[#EAE5D9] rounded-xl px-3 py-2.5 text-slate-800 appearance-none pr-8 focus:outline-none"
          >
            <option value="featured">Featured Order</option>
            <option value="newest">Newest Creations</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="bestselling">Bestselling Icons</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Main Two-Column Shop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block space-y-8 bg-white/70 p-6 rounded-2xl border border-[#EAE5D9] sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
            <h3 className="font-serif text-lg font-semibold text-slate-900">Refine Collection</h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] uppercase tracking-wider text-[#8B5A2B] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model or leather..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none focus:border-[#8B5A2B]"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Silhouettes
            </h4>
            <div className="space-y-1 text-xs">
              {CATEGORIES.map(cat => {
                const count = cat === 'All'
                  ? products.length
                  : products.filter(p => p.category === cat).length;
                const isSelected = selectedCategoryFilter === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-left transition-colors ${
                      isSelected
                        ? 'bg-[#0F172A] text-white font-medium'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] tabular-nums ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-slate-900">Max Investment</span>
              <span className="font-semibold text-slate-900 tabular-nums">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="200"
              max="800"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#8B5A2B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 tabular-nums">
              <span>$200</span>
              <span>$500</span>
              <span>$800</span>
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Leather Colorways
            </h4>
            <div className="space-y-1.5">
              {COLOR_SWATCHES.map(color => {
                const isSelected = selectedColors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    onClick={() => toggleColorFilter(color.name)}
                    className="w-full flex items-center justify-between text-xs py-1 px-1.5 rounded-md hover:bg-[#FAF8F5] text-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#8B5A2B]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability / In-Stock toggle */}
          <div className="pt-2 border-t border-[#EAE5D9]">
            <label className="flex items-center gap-2.5 text-xs text-slate-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-[#EAE5D9] text-[#8B5A2B] focus:ring-[#8B5A2B] cursor-pointer"
              />
              <span>In Stock in Florence Atelier</span>
            </label>
          </div>
        </aside>

        {/* Right Content: Product Grid and Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar for Desktop */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
            <p className="text-xs text-slate-500">
              Showing <strong className="text-slate-900 tabular-nums">{displayedProducts.length}</strong> of{' '}
              <strong className="text-slate-900 tabular-nums">{filteredProducts.length}</strong> designs
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 uppercase tracking-wider">Sort By:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#EAE5D9] rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 appearance-none pr-7 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="newest">Newest Additions</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="bestselling">Bestselling Icons</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Active:</span>
              {selectedCategoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-xs">
                  {selectedCategoryFilter}
                  <button onClick={() => setSelectedCategoryFilter('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedColors.map(color => (
                <span
                  key={color}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#EAE5D9] text-slate-800 text-xs"
                >
                  {color}
                  <button onClick={() => toggleColorFilter(color)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {maxPrice < 800 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#EAE5D9] text-slate-800 text-xs">
                  Under ${maxPrice}
                  <button onClick={() => setMaxPrice(800)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#EAE5D9] text-slate-800 text-xs">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#8B5A2B] hover:underline font-semibold ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white/50 rounded-2xl border border-[#EAE5D9] p-8 space-y-3">
              <p className="font-serif text-lg text-slate-800">No creations meet your refinement criteria</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Adjust your selected price range or colorways to explore the remaining pieces in our Florence atelier.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-3 px-5 py-2.5 bg-[#0F172A] text-white text-xs uppercase tracking-wider rounded-lg font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {displayedProducts.length < filteredProducts.length && (
            <div className="pt-8 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-8 py-3.5 bg-white border border-[#EAE5D9] hover:border-slate-900 text-slate-900 text-xs uppercase tracking-widest font-semibold rounded-xl shadow-sm hover:shadow transition-all"
              >
                Load More Creations ({filteredProducts.length - displayedProducts.length} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-sm bg-[#FAF8F5] h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
                <h3 className="font-serif text-lg font-semibold text-slate-900">Refine Collection</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Silhouettes */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-2">
                  Category
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`p-2 rounded-lg text-xs font-medium text-left border ${
                        selectedCategoryFilter === cat
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-white text-slate-700 border-[#EAE5D9]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colorways */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-2">
                  Leather Tone
                </h4>
                <div className="space-y-1.5">
                  {COLOR_SWATCHES.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleColorFilter(color.name)}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-[#EAE5D9] text-xs text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color.hex }} />
                        <span>{color.name}</span>
                      </div>
                      {selectedColors.includes(color.name) && <Check className="w-3.5 h-3.5 text-[#8B5A2B]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE5D9] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#0F172A] text-white text-xs uppercase tracking-wider font-semibold rounded-xl"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2 text-xs uppercase tracking-wider text-slate-500 font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
