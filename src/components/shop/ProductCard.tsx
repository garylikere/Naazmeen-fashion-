import React, { useState } from 'react';
import { Product, ColorVariation } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    setSelectedProductId,
    setActiveView,
    toggleWishlist,
    isInWishlist,
    addToCart
  } = useStore();

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const selectedColor: ColorVariation = product.colors[activeColorIndex] || product.colors[0];
  const primaryImage = selectedColor?.images[0] || product.colors[0]?.images[0] || '';
  const secondaryImage = selectedColor?.images[1] || product.colors[0]?.images[1] || primaryImage;

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-white rounded-2xl border border-[#EAE5D9] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]/70 cursor-pointer relative"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.bestseller && (
          <span className="bg-[#0F172A] text-[#FAF8F5] text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md shadow-sm">
            Bestseller
          </span>
        )}
        {product.newArrival && !product.bestseller && (
          <span className="bg-[#8B5A2B] text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md shadow-sm">
            New Arrival
          </span>
        )}
        {product.salePrice && (
          <span className="bg-rose-700 text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md shadow-sm">
            Special Edition
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-[#EAE5D9] text-slate-700 hover:text-rose-600 transition-all shadow-sm hover:scale-110"
        aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'text-rose-600 fill-rose-600' : ''
          }`}
        />
      </button>

      {/* Image Container with Hover Swap */}
      <div className="relative aspect-square w-full bg-[#F5F2EB]/50 overflow-hidden flex items-center justify-center">
        <img
          src={primaryImage}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Subtle fallback skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#EAE5D9]/40 animate-pulse" />
        )}

        {/* Quick Add overlay button */}
        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#0F172A]/90 hover:bg-[#0F172A] text-white text-[11px] font-semibold tracking-wider uppercase rounded-xl backdrop-blur-md shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-medium">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-slate-700 text-xs tabular-nums">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#8B5A2B] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-2 border-t border-[#EAE5D9]/70 flex items-center justify-between">
          {/* Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={color.id}
                onClick={() => setActiveColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeColorIndex === idx
                    ? 'ring-2 ring-[#0F172A] ring-offset-1 scale-110 border-white'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.colorHex }}
                title={`${color.colorName} (${color.stock} available)`}
                aria-label={color.colorName}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium ml-0.5">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            {product.salePrice ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs line-through text-slate-400 tabular-nums">
                  ${product.price}
                </span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  ${product.salePrice}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-slate-900 tabular-nums">
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
