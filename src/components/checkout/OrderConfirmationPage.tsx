import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CreditCard,
  Banknote
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastPlacedOrder, setActiveView } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-2xl text-slate-900">No Recent Order Found</h2>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-[#0F172A] text-white text-xs uppercase tracking-wider rounded-lg"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header Banner */}
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
          Order Confirmed
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-950">
          Thank You, {order.customerName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto leading-relaxed">
          Your order has been recorded at our Florence Atelier. A confirmation dossier and tracking link have been dispatched to <strong className="text-slate-900">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Order Dossier Card */}
      <div className="bg-white rounded-3xl border border-[#EAE5D9] shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
        {/* Order Reference Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EAE5D9]">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Order Reference</span>
            <p className="font-mono text-base font-bold text-slate-900 tracking-wider">
              {order.id}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Dispatch Status</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-800">
                {order.orderStatus} · Preparing Packaging
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Payment Authorization</span>
            <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              {order.paymentMethod === 'Cash on Delivery' ? (
                <>
                  <Banknote className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Due upon Courier Handover</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Settled via Secure Card</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Fulfillment Journey
          </p>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold uppercase tracking-wider">
            <div className="p-2.5 rounded-xl bg-[#0F172A] text-white">
              <span>1. Confirmed</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-[#8B5A2B] border border-amber-200">
              <span>2. Processing</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
              <span>3. Shipped</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
              <span>4. Delivered</span>
            </div>
          </div>
        </div>

        {/* Purchased Pieces Breakdown */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Selected Pieces ({order.items.length})
          </p>
          <div className="divide-y divide-[#EAE5D9] border border-[#EAE5D9] rounded-2xl p-4 bg-[#FAF8F5]/60">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-xl bg-stone-100 border border-[#EAE5D9] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 truncate">
                      {item.productName}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span>{item.colorName}</span>
                      <span>·</span>
                      <span className="tabular-nums">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0">
                  ${item.subtotal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-2 border-t border-[#EAE5D9] pt-4 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900 tabular-nums">${order.subtotal}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Privilege Discount ({order.couponCode || 'PROMO'})</span>
              <span className="font-semibold tabular-nums">-${order.discount}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>White-Glove Express Delivery</span>
            <span className="font-medium text-slate-900">
              {order.shippingFee === 0 ? 'Complimentary' : `$${order.shippingFee}`}
            </span>
          </div>

          <div className="flex justify-between text-base font-bold text-slate-950 pt-3 border-t border-[#EAE5D9]">
            <span className="font-serif">Total Authorized</span>
            <span className="tabular-nums">${order.total}</span>
          </div>
        </div>

        {/* Shipping Address Summary */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5D9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <h5 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
              Delivery Recipient
            </h5>
            <p className="text-slate-800 font-medium">{order.shippingAddress.fullName}</p>
            <p className="text-slate-500">{order.shippingAddress.phone}</p>
            <p className="text-slate-500">{order.shippingAddress.email}</p>
          </div>

          <div>
            <h5 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
              Destination
            </h5>
            <p className="text-slate-700">
              {order.shippingAddress.street}
              {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}
            </p>
            <p className="text-slate-700">
              {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
            </p>
            {order.shippingAddress.orderNotes && (
              <p className="text-slate-500 italic mt-1 text-[11px]">
                "{order.shippingAddress.orderNotes}"
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EAE5D9]">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#EAE5D9] text-xs uppercase tracking-wider font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveView('orders')}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-[#0F172A] text-xs uppercase tracking-wider font-semibold text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors"
            >
              View My Orders
            </button>

            <button
              onClick={() => setActiveView('shop')}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
