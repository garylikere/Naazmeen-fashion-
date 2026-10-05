import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Package,
  Search,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Banknote
} from 'lucide-react';

export const CustomerOrdersPage: React.FC = () => {
  const { orders, setActiveView, setSelectedProductId, customerEmail, setCustomerEmail, addToCart, getProductById, showToast } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  const filteredOrders = orders.filter(o => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.items.some(i => i.productName.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleReorder = (item: import('../../types').OrderItem) => {
    const product = getProductById(item.productId);
    if (product) {
      const color = product.colors.find(c => c.colorName === item.colorName) || product.colors[0];
      addToCart(product, color, item.quantity);
      showToast(`Added ${product.name} to shopping bag`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="border-b border-[#EAE5D9] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B5A2B]">
            Client Portal
          </span>
          <h1 className="text-3xl font-serif font-semibold text-slate-950 mt-1">
            My Atelier Orders
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track fulfillment, verify authenticity dossiers, and review past artisanal acquisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. AUR-84291)..."
              className="text-xs pl-9 pr-3 py-2 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B] w-64"
            />
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAE5D9] p-8 space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif text-lg text-slate-800">No Orders On Record</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have not placed an order yet. Explore our handcrafted handbags to begin your journey with Aurelia.
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="mt-3 px-6 py-2.5 bg-[#0F172A] text-white text-xs uppercase tracking-wider font-semibold rounded-xl"
          >
            Explore Boutique
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Order List Column */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Orders History ({filteredOrders.length})
            </p>

            <div className="space-y-3">
              {filteredOrders.map(order => {
                const isSelected = selectedOrder?.id === order.id;
                const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#0F172A] shadow-md ring-1 ring-[#0F172A]'
                        : 'bg-white/70 border-[#EAE5D9] hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {order.id}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span>{formattedDate}</span>
                      <span className="font-bold text-slate-900 tabular-nums">${order.total}</span>
                    </div>

                    {/* Preview of item thumbnails */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#EAE5D9]/60">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.image}
                          alt={item.productName}
                          className="w-10 h-10 object-cover rounded-lg border border-[#EAE5D9]"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          +{order.items.length - 3} more
                        </span>
                      )}
                      <span className="ml-auto text-[11px] font-semibold text-[#8B5A2B] flex items-center">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Order Detail Dossier Column */}
          {selectedOrder && (
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAE5D9] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAE5D9]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-lg font-bold text-slate-950">
                      {selectedOrder.id}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        selectedOrder.orderStatus
                      )}`}
                    >
                      {selectedOrder.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Authorized on {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Total Authorized</span>
                  <p className="text-xl font-bold font-serif text-slate-900 tabular-nums">
                    ${selectedOrder.total}
                  </p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                  Purchased Pieces
                </h4>
                <div className="divide-y divide-[#EAE5D9] border border-[#EAE5D9] rounded-2xl p-4 bg-[#FAF8F5]/50">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded-xl border border-[#EAE5D9] shrink-0"
                        />
                        <div>
                          <h5 className="text-xs font-semibold text-slate-900">{item.productName}</h5>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
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

                      <div className="text-right flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ${item.subtotal}
                        </span>
                        <button
                          onClick={() => handleReorder(item)}
                          className="p-1.5 rounded-lg border border-[#EAE5D9] hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                          title="Re-order this item"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5D9] text-xs space-y-1">
                  <span className="font-semibold text-slate-800 uppercase tracking-wider text-[10px]">
                    Shipping Destination
                  </span>
                  <p className="font-medium text-slate-900">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-slate-600">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-slate-600">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.postalCode}
                  </p>
                  <p className="text-slate-500">{selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5D9] text-xs space-y-1">
                  <span className="font-semibold text-slate-800 uppercase tracking-wider text-[10px]">
                    Payment & Settlement
                  </span>
                  <p className="font-medium text-slate-900 flex items-center gap-1.5">
                    {selectedOrder.paymentMethod === 'Cash on Delivery' ? (
                      <>
                        <Banknote className="w-4 h-4 text-[#8B5A2B]" />
                        <span>Cash on Delivery</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-[#8B5A2B]" />
                        <span>Secure Card Payment</span>
                      </>
                    )}
                  </p>
                  <p className="text-slate-600">Status: {selectedOrder.paymentStatus}</p>
                  {selectedOrder.couponCode && (
                    <p className="text-emerald-700">Code: {selectedOrder.couponCode} (-${selectedOrder.discount})</p>
                  )}
                  <p className="text-slate-500">Shipping: {selectedOrder.shippingFee === 0 ? 'Complimentary' : `$${selectedOrder.shippingFee}`}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Authenticated Certificate ID #AC-{selectedOrder.id}</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="text-slate-600 hover:text-slate-900 underline"
                >
                  Print Official Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
