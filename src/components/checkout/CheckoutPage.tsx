import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress, PaymentMethod } from '../../types';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Tag,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brandConfig';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartShipping,
    cartDiscount,
    appliedCoupon,
    cartTotal,
    placeOrder,
    setActiveView,
    customerEmail,
    showToast
  } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: 'Client Order',
    email: customerEmail || BRAND_CONFIG.email,
    phone: BRAND_CONFIG.whatsapp,
    street: 'Main Commercial Area',
    apartment: 'House / Suite 12',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500',
    orderNotes: 'Please call on WhatsApp: 03033237505 before delivery.'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit/Debit Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-2xl text-slate-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-slate-500">Add an item to your bag before proceeding to checkout.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 bg-[#0F172A] text-white text-xs uppercase tracking-wider font-semibold rounded-xl"
        >
          Explore Boutique
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.city) {
      setErrorMessage('Please fill out all mandatory shipping details.');
      showToast('Please complete required shipping fields', 'error');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      await placeOrder(formData, paymentMethod);
      setActiveView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage('An error occurred during order dispatch. Please retry.');
      showToast('Failed to complete order. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Return to cart button */}
      <button
        onClick={() => setActiveView('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-950 mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Boutique</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Form: Customer & Shipping Details */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
              Secure Order Dispatch
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-950 mt-1">
              Shipping & Client Concierge
            </h1>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm space-y-4">
              <h3 className="font-serif text-base font-semibold text-slate-900 border-b border-[#EAE5D9] pb-3">
                1. Client Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Lady Eleanor Vance"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Email Address (For Tracking & Invoice) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="eleanor@atelier.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Phone Number (For Courier Contact) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+44 7700 900341"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm space-y-4">
              <h3 className="font-serif text-base font-semibold text-slate-900 border-b border-[#EAE5D9] pb-3">
                2. Delivery Destination
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="14 Kensington Palace Gardens"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Apartment / Suite / Private Wing (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment || ''}
                    onChange={handleInputChange}
                    placeholder="Suite 4B"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="London"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Province / State *
                    </label>
                    <input
                      type="text"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleInputChange}
                      placeholder="Greater London"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="W8 4QP"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Special Atelier Delivery Instructions
                  </label>
                  <textarea
                    name="orderNotes"
                    rows={2}
                    value={formData.orderNotes || ''}
                    onChange={handleInputChange}
                    placeholder="e.g. Leave with private concierge or gate guard..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm space-y-4">
              <h3 className="font-serif text-base font-semibold text-slate-900 border-b border-[#EAE5D9] pb-3">
                3. Payment Method
              </h3>

              <div className="space-y-3">
                {/* Credit / Debit Card Option */}
                <label
                  className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Credit/Debit Card'
                      ? 'border-[#0F172A] bg-[#FAF8F5] ring-1 ring-[#0F172A]'
                      : 'border-[#EAE5D9] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit/Debit Card"
                      checked={paymentMethod === 'Credit/Debit Card'}
                      onChange={() => setPaymentMethod('Credit/Debit Card')}
                      className="mt-1 accent-[#0F172A]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#8B5A2B]" />
                        <span className="text-xs font-semibold text-slate-900">
                          Credit / Debit Card (Visa, Mastercard, Amex)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Encrypted 256-bit gateway. Direct bank authorization.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Instant
                  </span>
                </label>

                {/* Simulated Card Fields if Credit Card selected */}
                {paymentMethod === 'Credit/Debit Card' && (
                  <div className="p-4 bg-white rounded-xl border border-[#EAE5D9] space-y-3 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-[#EAE5D9] bg-[#FAF8F5]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-[#EAE5D9] bg-[#FAF8F5]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-[#EAE5D9] bg-[#FAF8F5]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Option */}
                <label
                  className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-[#0F172A] bg-[#FAF8F5] ring-1 ring-[#0F172A]'
                      : 'border-[#EAE5D9] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="mt-1 accent-[#0F172A]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#8B5A2B]" />
                        <span className="text-xs font-semibold text-slate-900">
                          Cash on Delivery (White-Glove Courier Handover)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Inspect your packaged bag with the courier before completing cash payment.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Lock className="w-4 h-4 text-[#C5A880]" />
                <span>
                  {isProcessing
                    ? 'Processing Naazmeen Order...'
                    : `Confirm & Place Order · $${cartTotal}`}
                </span>
              </button>

              <a
                href={`${BRAND_CONFIG.whatsappLink}?text=${encodeURIComponent(
                  `Hello ${BRAND_CONFIG.name}, I want to place an order for:\n${cart
                    .map((i) => `- ${i.productName} (${i.selectedColor.colorName}) x${i.quantity} = $${i.unitPrice * i.quantity}`)
                    .join('\n')}\nTotal: $${cartTotal}\nCustomer: ${formData.fullName}\nPhone: ${formData.phone}\nAddress: ${formData.street}, ${formData.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Order Directly to WhatsApp ({BRAND_CONFIG.whatsapp})</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Protected by 256-bit TLS encryption · 100% Genuine Italian Provenance</span>
            </div>
          </form>
        </div>

        {/* Right Sticky Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm sticky top-28 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
            <h3 className="font-serif text-lg font-semibold text-slate-900">Order Summary</h3>
            <span className="text-xs text-slate-500 tabular-nums">
              {cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'}
            </span>
          </div>

          {/* Items Preview */}
          <div className="divide-y divide-[#EAE5D9] max-h-72 overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                <img
                  src={item.selectedImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg bg-stone-100 border border-[#EAE5D9] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-slate-900 truncate">{item.productName}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: item.selectedColor.colorHex }}
                    />
                    <span className="truncate">{item.selectedColor.colorName}</span>
                    <span>·</span>
                    <span className="tabular-nums">Qty: {item.quantity}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1 tabular-nums">
                    ${item.unitPrice * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 pt-3 border-t border-[#EAE5D9] text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900 tabular-nums">${cartSubtotal}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Privilege Code ({appliedCoupon})</span>
                </span>
                <span className="font-semibold tabular-nums">-${cartDiscount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>White-Glove Express Courier</span>
              <span className="font-medium text-slate-900 tabular-nums">
                {cartShipping === 0 ? 'Complimentary' : `$${cartShipping}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-slate-950 pt-3 border-t border-[#EAE5D9]">
              <span className="font-serif">Total Due</span>
              <span className="tabular-nums">${cartTotal}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5D9] text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Truck className="w-4 h-4 text-[#8B5A2B]" />
              <span>Complimentary Returns</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              If your handbag does not enchant you upon unboxing, return it within 30 days in its original silk dust bag for an immediate exchange or full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
