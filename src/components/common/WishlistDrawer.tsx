import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Trash2, Heart, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setSelectedProductId,
    setActiveView
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleOpenProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product');
    setIsWishlistOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#EAE5D9] flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#8B5A2B] fill-[#8B5A2B]" />
              <h3 className="text-lg font-serif font-semibold text-slate-900 tracking-wide">
                Saved Creations ({wishlistProducts.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-[#EAE5D9]/50 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EAE5D9]/50 mx-auto flex items-center justify-center text-slate-400">
                  <Heart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-base text-slate-800">Your wishlist is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our handcrafted leather collections and tap the heart icon to save your favorite designs.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActiveView('shop');
                  }}
                  className="mt-4 px-5 py-2.5 bg-[#0F172A] text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Boutique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              wishlistProducts.map(p => {
                const primaryColor = p.colors[0];
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-[#EAE5D9] bg-white flex items-center gap-4 transition-all hover:border-[#C5A880]"
                  >
                    <img
                      src={primaryColor?.images[0]}
                      alt={p.name}
                      onClick={() => handleOpenProduct(p.id)}
                      className="w-20 h-20 object-cover rounded-lg bg-stone-100 border border-[#EAE5D9] cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">{p.category}</p>
                      <h4
                        onClick={() => handleOpenProduct(p.id)}
                        className="text-xs font-semibold text-slate-900 truncate hover:text-[#8B5A2B] cursor-pointer"
                      >
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ${p.salePrice ? p.salePrice : p.price}
                        </span>
                        {p.salePrice && (
                          <span className="text-[11px] line-through text-slate-400 tabular-nums">
                            ${p.price}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => addToCart(p, primaryColor, 1)}
                          className="px-3 py-1.5 bg-[#0F172A] text-white text-[11px] font-medium rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-md hover:bg-rose-50"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
