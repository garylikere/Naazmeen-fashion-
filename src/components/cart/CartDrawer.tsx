import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    cartShipping,
    cartDiscount,
    appliedCoupon,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    setActiveView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActiveView('shop');
  };

  // Free shipping threshold math: $400
  const freeShippingThreshold = 400;
  const awayFromFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#EAE5D9] flex flex-col">
          {/* Cart Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE5D9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#0F172A]" />
              <h3 className="text-lg font-serif font-semibold text-slate-900 tracking-wide">
                Shopping Bag ({cartCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-[#EAE5D9]/50 transition-colors"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#EAE5D9]/70">
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                {awayFromFreeShipping > 0 ? (
                  <span className="text-slate-600">
                    Add <strong className="text-[#8B5A2B] tabular-nums">${awayFromFreeShipping}</strong> more for complimentary delivery
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Complimentary White-Glove Courier Unlocked
                  </span>
                )}
                <span className="tabular-nums text-slate-400">{freeShippingPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#EAE5D9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8B5A2B] transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EAE5D9]/40 mx-auto flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
                </div>
                <h4 className="font-serif text-lg text-slate-800">Your shopping bag is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Discover our timeless handcrafted luxury handbags, sculpted by Italian artisans.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="mt-4 px-5 py-2.5 bg-[#0F172A] text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Boutique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#EAE5D9] bg-white flex items-center gap-3.5 transition-all shadow-sm"
                >
                  <img
                    src={item.selectedImage}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg bg-stone-100 border border-[#EAE5D9] shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">{item.category}</p>
                    <h4 className="text-xs font-semibold text-slate-900 truncate">{item.productName}</h4>

                    {/* Selected color swatch indicator */}
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-600">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: item.selectedColor.colorHex }}
                      />
                      <span className="truncate">{item.selectedColor.colorName}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#EAE5D9] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-slate-900 text-slate-500 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:text-slate-900 text-slate-500 disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ${item.unitPrice * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Totals */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#EAE5D9] bg-white space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-emerald-300 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="font-semibold text-slate-800">{appliedCoupon}</span>
                      <span className="text-emerald-700">(-${cartDiscount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-slate-400 hover:text-slate-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Privilege Code (e.g. WELCOME50)"
                      className="w-full text-xs uppercase px-3 py-2 rounded-lg border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B] bg-[#FAF8F5]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-slate-900 bg-[#EAE5D9] hover:bg-[#d9d2c5] rounded-lg transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 tabular-nums">${cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Savings</span>
                    <span className="font-medium tabular-nums">-${cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Courier</span>
                  <span className="font-medium text-slate-900 tabular-nums">
                    {cartShipping === 0 ? 'Complimentary' : `$${cartShipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-[#EAE5D9]">
                  <span className="font-serif">Estimated Total</span>
                  <span className="tabular-nums font-sans">${cartTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full py-2.5 text-xs uppercase tracking-wider text-slate-600 hover:text-slate-950 font-medium transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
