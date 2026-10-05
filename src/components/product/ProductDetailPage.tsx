import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ColorVariation, Product } from '../../types';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check,
  Layers,
  Maximize2,
  Info,
  MessageCircle
} from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';
import { BRAND_CONFIG } from '../../data/brandConfig';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    getProductById,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveView,
    setIsCartOpen
  } = useStore();

  const product = getProductById(selectedProductId || '') || products[0];

  // Selected Color Variation State
  const [selectedColor, setSelectedColor] = useState<ColorVariation>(() => product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'craftsmanship' | 'dimensions' | 'delivery'>('details');

  // CRITICAL COLOR VARIATION FUNCTIONALITY:
  // When product changes or when color is switched, update the color and reset image index
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product?.id]);

  const handleColorChange = (color: ColorVariation) => {
    setSelectedColor(color);
    setActiveImageIndex(0); // reset to first image of this specific color!
    if (quantity > color.stock) {
      setQuantity(Math.max(1, color.stock));
    }
  };

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-serif">Product Not Found</h2>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-6 py-2 bg-[#0F172A] text-white text-xs uppercase tracking-wider rounded-lg"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  // Current active images based strictly on selected color
  const colorImages = selectedColor.images && selectedColor.images.length > 0
    ? selectedColor.images
    : product.colors[0]?.images || [];

  const currentMainImage = colorImages[activeImageIndex] || colorImages[0];
  const isFavorited = isInWishlist(product.id);
  const effectivePrice = selectedColor.priceOverride ?? product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Related products from the same category or bestsellers
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.bestseller))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-wider">
        <button onClick={() => setActiveView('home')} className="hover:text-slate-900 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => {
            setActiveView('shop');
          }}
          className="hover:text-slate-900 transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Contiguous Purchase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Product Gallery (Sticky on desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
          {/* Thumbnails Rail */}
          {colorImages.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-20 shrink-0 py-1">
              {colorImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square w-16 md:w-20 rounded-xl overflow-hidden border transition-all shrink-0 bg-[#F5F2EB] ${
                    activeImageIndex === idx
                      ? 'border-[#0F172A] ring-2 ring-[#0F172A]/20 shadow-sm'
                      : 'border-[#EAE5D9] hover:border-slate-400 opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`View gallery view ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Feature Image */}
          <div className="flex-1 relative aspect-square w-full rounded-2xl overflow-hidden border border-[#EAE5D9] bg-[#F5F2EB]/50 group">
            <img
              src={currentMainImage}
              alt={`${product.name} in ${selectedColor.colorName}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.bestseller && (
                <span className="bg-[#0F172A] text-white text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-md shadow-sm">
                  Bestseller
                </span>
              )}
              {product.newArrival && (
                <span className="bg-[#8B5A2B] text-white text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-md shadow-sm">
                  Atelier 2026 Collection
                </span>
              )}
            </div>

            {/* Color Swatch Watermark */}
            <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#EAE5D9] shadow-sm flex items-center gap-2 text-xs font-medium text-slate-800">
              <span
                className="w-3 h-3 rounded-full border border-black/20"
                style={{ backgroundColor: selectedColor.colorHex }}
              />
              <span>{selectedColor.colorName}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          {/* Header & Title */}
          <div className="border-b border-[#EAE5D9] pb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B5A2B]">
                {product.category} · Ref. {selectedColor.sku || product.sku}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-slate-600 font-medium tabular-nums">
                  {product.rating} ({product.reviewCount} client reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-950 tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs text-slate-600 font-light leading-relaxed">
              {product.tagline}
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-serif font-semibold text-slate-950 tabular-nums">
                ${effectivePrice}
              </span>
              {product.salePrice && (
                <span className="text-base line-through text-slate-400 tabular-nums">
                  ${product.price}
                </span>
              )}
              <span className="text-[11px] text-emerald-800 font-medium px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                Taxes & Duties Included
              </span>
            </div>
          </div>

          {/* Color Variation Selector (Critical Feature) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-900 font-serif text-sm">
                Selected Tone: <strong className="font-sans font-semibold text-slate-950">{selectedColor.colorName}</strong>
              </span>
              <span className="text-[11px] text-slate-500">
                {selectedColor.stock > 0 ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    In Stock ({selectedColor.stock} pieces remaining)
                  </span>
                ) : (
                  <span className="text-rose-700 font-semibold">Out of Stock in this tone</span>
                )}
              </span>
            </div>

            {/* Interactive Color Swatches */}
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = color.id === selectedColor.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    className={`group relative p-1 rounded-full transition-all flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-[#0F172A] ring-offset-2 scale-110 shadow-sm'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    aria-label={`Select ${color.colorName}`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-black/15 block shadow-inner"
                      style={{ backgroundColor: color.colorHex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper & Stock Warning */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-700">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#EAE5D9] rounded-xl bg-white px-3 py-2 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(selectedColor.stock, quantity + 1))}
                  disabled={quantity >= selectedColor.stock}
                  className="px-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-slate-500">
                White-glove inspection & authenticity certificate issued prior to dispatch.
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={selectedColor.stock === 0}
                className="flex-1 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A880] transition-transform group-hover:scale-110" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border border-[#EAE5D9] bg-white hover:border-[#C5A880] transition-all shadow-sm ${
                  isFavorited ? 'text-rose-600 border-rose-200' : 'text-slate-700'
                }`}
                aria-label="Save to Wishlist"
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={selectedColor.stock === 0}
              className="w-full py-3.5 bg-[#8B5A2B] hover:bg-[#724820] text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Buy with Express Checkout</span>
            </button>

            {/* Direct WhatsApp Ordering */}
            <a
              href={`${BRAND_CONFIG.whatsappLink}?text=${encodeURIComponent(
                `Hello ${BRAND_CONFIG.name}, I want to order "${product.name}" in ${selectedColor.colorName} for $${effectivePrice}. Please share delivery and cash on delivery details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order via WhatsApp ({BRAND_CONFIG.whatsapp})</span>
            </a>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#EAE5D9] text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8B5A2B] shrink-0" />
              <span>Complimentary insured shipping over $400</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#8B5A2B] shrink-0" />
              <span>30-Day complimentary returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B5A2B] shrink-0" />
              <span>Lifetime atelier warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5A2B] shrink-0" />
              <span>Silk dust bag included</span>
            </div>
          </div>

          {/* Tabbed Specifications */}
          <div className="pt-6 border-t border-[#EAE5D9]">
            <div className="flex border-b border-[#EAE5D9] text-xs font-semibold uppercase tracking-wider text-slate-500">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-3 transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
                    : 'hover:text-slate-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('craftsmanship')}
                className={`pb-3 px-3 transition-colors relative ${
                  activeTab === 'craftsmanship'
                    ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
                    : 'hover:text-slate-900'
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('dimensions')}
                className={`pb-3 px-3 transition-colors relative ${
                  activeTab === 'dimensions'
                    ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
                    : 'hover:text-slate-900'
                }`}
              >
                Dimensions
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-3 px-3 transition-colors relative ${
                  activeTab === 'delivery'
                    ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
                    : 'hover:text-slate-900'
                }`}
              >
                Shipping
              </button>
            </div>

            <div className="py-4 text-xs text-slate-600 leading-relaxed">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'craftsmanship' && (
                <div className="space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-[#EAE5D9]/60">
                    <span className="font-semibold text-slate-800">Leather:</span>
                    <span>{product.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE5D9]/60">
                    <span className="font-semibold text-slate-800">Lining:</span>
                    <span>{product.lining}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE5D9]/60">
                    <span className="font-semibold text-slate-800">Hardware:</span>
                    <span>{product.hardware}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Vegetable-tanned using certified chestnut bark extracts. Free from heavy metals and harsh synthetic coatings.
                  </p>
                </div>
              )}

              {activeTab === 'dimensions' && (
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#EAE5D9]/60">
                    <span className="font-semibold text-slate-800">Measures:</span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE5D9]/60">
                    <span className="font-semibold text-slate-800">Weight:</span>
                    <span>Approx. 580g (feathery all-day comfort)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Care instructions: Store in provided silk dust bag away from direct radiator heat. Nourish annually with organic beeswax leather balm.
                  </p>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-2">
                  <p>
                    All Aurelia pieces are prepared with personal ribbon packaging in our Tuscan workshop.
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Express Insured Courier: 2–4 business days worldwide.</li>
                    <li>Cash on Delivery accepted in supported regions.</li>
                    <li>Signatures required on all deliveries for mutual security.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-14 border-t border-[#EAE5D9]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8B5A2B] font-semibold">
                Curated Harmonies
              </p>
              <h2 className="text-2xl font-serif font-semibold text-slate-900 mt-1">
                You May Also Admire
              </h2>
            </div>
            <button
              onClick={() => setActiveView('shop')}
              className="text-xs uppercase tracking-wider font-semibold text-slate-800 hover:text-[#8B5A2B] transition-colors"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
