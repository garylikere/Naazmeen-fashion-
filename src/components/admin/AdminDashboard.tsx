import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ColorVariation, Order, OrderStatus, BagCategory } from '../../types';
import { BRAND_CONFIG } from '../../data/brandConfig';
import {
  Shield,
  Lock,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  X,
  Upload,
  ArrowRight,
  LogOut,
  RefreshCw,
  Eye,
  Sliders,
  Sparkles,
  ExternalLink,
  ChevronDown,
  MessageCircle
} from 'lucide-react';

const CATEGORIES: BagCategory[] = [
  'Handbags',
  'Shoulder Bags',
  'Crossbody Bags',
  'Tote Bags',
  'Clutches',
  'Wallets'
];

export const AdminDashboard: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminUser,
    adminLogin,
    adminLogout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToInitialData,
    orders,
    updateOrderStatus,
    setActiveView,
    setIsProductUploadOpen,
    showToast
  } = useStore();

  // Login form state - defaults to user's provided email
  const [loginEmail, setLoginEmail] = useState(BRAND_CONFIG.email);
  const [loginPassword, setLoginPassword] = useState('naazmeen123');

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'database'>('overview');

  // Product Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');

  // Order Search & Filter
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Product Form State
  const [productFormData, setProductFormData] = useState<{
    name: string;
    slug: string;
    tagline: string;
    category: BagCategory;
    price: number;
    salePrice?: number;
    sku: string;
    description: string;
    material: string;
    dimensions: string;
    hardware: string;
    lining: string;
    featured: boolean;
    bestseller: boolean;
    newArrival: boolean;
    features: string[];
    colors: ColorVariation[];
  }>({
    name: '',
    slug: '',
    tagline: '',
    category: 'Handbags',
    price: 550,
    salePrice: undefined,
    sku: 'AUR-NEW-01',
    description: '',
    material: 'Full-Grain Box Calfskin',
    dimensions: '26cm x 18cm x 10cm',
    hardware: '24k Brushed Gold Plated Brass',
    lining: 'Natural Italian Lambskin',
    featured: false,
    bestseller: false,
    newArrival: true,
    features: ['Hand-burnished edges', 'Detachable leather shoulder strap', 'Silk dust bag included'],
    colors: [
      {
        id: 'var-1',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 10,
        sku: 'AUR-NEW-BLK',
        images: ['/src/assets/images/bag_noir_handbag_1791211856470.jpg']
      },
      {
        id: 'var-2',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 8,
        sku: 'AUR-NEW-CGN',
        images: ['/src/assets/images/bag_cognac_shoulder_1791211869256.jpg']
      }
    ]
  });

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(loginEmail, loginPassword);
  };

  const handleQuickDemoLogin = () => {
    adminLogin(BRAND_CONFIG.email, 'naazmeen123');
  };

  // If Not Authenticated, Show Protected Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white rounded-3xl border border-[#EAE5D9] shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-[#C5A880] mx-auto flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8B5A2B]">
              Restricted Area
            </span>
            <h1 className="text-2xl font-serif font-semibold text-slate-950">
              {BRAND_CONFIG.name} Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Log in to upload products, manage inventory, and process orders.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="princtariqmirani@gmail.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Authenticate Session</span>
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-[#EAE5D9] text-center space-y-2">
            <p className="text-[11px] text-slate-400">
              Admin: <strong>{BRAND_CONFIG.email}</strong>
            </p>
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-[#8B5A2B] border border-amber-200 text-xs uppercase tracking-wider font-semibold rounded-xl transition-colors"
            >
              1-Click Instant Admin Login
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveView('home')}
              className="text-xs text-slate-500 hover:text-slate-900 underline"
            >
              ← Return to Boutique Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.orderStatus !== 'Cancelled' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Processing').length;
  const completedOrdersCount = orders.filter(o => o.orderStatus === 'Delivered').length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter(p => p.stock <= 5).length;

  // Filter products for table
  const filteredAdminProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.sku.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter orders for table
  const filteredAdminOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) || o.customerName.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open modal for Create
  const handleOpenCreateProduct = () => {
    setEditingProductId(null);
    setProductFormData({
      name: '',
      slug: '',
      tagline: '',
      category: 'Handbags',
      price: 590,
      salePrice: undefined,
      sku: `AUR-HB-${Math.floor(10 + Math.random() * 90)}`,
      description: 'Handcrafted in Florence from full-grain vegetable-tanned box calfskin, tailored with bespoke 24k brushed gold hardware.',
      material: '100% Full-Grain Tuscan Box Calfskin',
      dimensions: '26cm W x 19cm H x 11cm D',
      hardware: '24k Brushed Gold Plated Brass',
      lining: 'Italian Lambskin Leather',
      featured: false,
      bestseller: false,
      newArrival: true,
      features: ['Hand-burnished edges', 'Detachable leather shoulder strap', 'Silk dust bag included'],
      colors: [
        {
          id: `var-${Date.now()}-1`,
          colorName: 'Noir Black',
          colorHex: '#141416',
          stock: 8,
          sku: 'AUR-HB-BLK',
          images: ['/src/assets/images/bag_noir_handbag_1791211856470.jpg']
        },
        {
          id: `var-${Date.now()}-2`,
          colorName: 'Cognac Tan',
          colorHex: '#8B5A2B',
          stock: 6,
          sku: 'AUR-HB-CGN',
          images: ['/src/assets/images/bag_cognac_shoulder_1791211869256.jpg']
        }
      ]
    });
    setIsProductModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductFormData({
      name: prod.name,
      slug: prod.slug,
      tagline: prod.tagline,
      category: prod.category,
      price: prod.price,
      salePrice: prod.salePrice,
      sku: prod.sku,
      description: prod.description,
      material: prod.material,
      dimensions: prod.dimensions,
      hardware: prod.hardware,
      lining: prod.lining,
      featured: !!prod.featured,
      bestseller: !!prod.bestseller,
      newArrival: !!prod.newArrival,
      features: [...prod.features],
      colors: prod.colors.map(c => ({ ...c }))
    });
    setIsProductModalOpen(true);
  };

  // Save product (Add or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    const calculatedStock = productFormData.colors.reduce((sum, c) => sum + (c.stock || 0), 0);
    const slug = productFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingProductId) {
      updateProduct(editingProductId, {
        ...productFormData,
        slug,
        stock: calculatedStock
      });
    } else {
      addProduct({
        ...productFormData,
        slug,
        stock: calculatedStock,
        rating: 5.0,
        reviewCount: 1
      });
    }
    setIsProductModalOpen(false);
  };

  // Handle Image Upload for a color variation via FileReader
  const handleImageFileUpload = (colorIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setProductFormData(prev => {
          const updatedColors = [...prev.colors];
          const targetColor = updatedColors[colorIndex];
          if (targetColor) {
            targetColor.images = [dataUrl, ...targetColor.images];
          }
          return { ...prev, colors: updatedColors };
        });
        showToast('Image uploaded successfully for variation', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  // Add new color variation to the form
  const handleAddColorVariation = () => {
    const newVar: ColorVariation = {
      id: `var-${Date.now()}`,
      colorName: 'Alabaster Ivory',
      colorHex: '#F2EDE4',
      stock: 5,
      sku: `${productFormData.sku}-IVR`,
      images: ['/src/assets/images/luxury_structured_tote_1791211813488.jpg']
    };
    setProductFormData(prev => ({
      ...prev,
      colors: [...prev.colors, newVar]
    }));
  };

  // Remove color variation
  const handleRemoveColorVariation = (index: number) => {
    if (productFormData.colors.length <= 1) {
      showToast('At least one color variation is mandatory', 'error');
      return;
    }
    setProductFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE5D9]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#0F172A] text-[#C5A880]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-slate-950">
              {BRAND_CONFIG.name} · Admin Console
            </h1>
            <p className="text-xs text-slate-500">
              Director: <strong className="text-slate-800">{adminUser?.email}</strong> · WhatsApp: <strong>{BRAND_CONFIG.whatsapp}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Main Upload Product Button */}
          <button
            onClick={() => setIsProductUploadOpen(true)}
            className="px-4 py-2.5 bg-[#8B5A2B] hover:bg-[#724820] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
            title="Upload New Product"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Product (پروڈکٹ ڈالیں)</span>
          </button>

          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2.5 rounded-xl border border-[#EAE5D9] bg-white text-xs uppercase tracking-wider font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors"
          >
            Storefront
          </button>

          <button
            onClick={adminLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs uppercase tracking-wider font-semibold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-[#8B5A2B]" />
          </div>
          <p className="text-2xl font-serif font-bold text-slate-950 tabular-nums">
            ${totalSales}
          </p>
          <span className="text-[10px] text-emerald-700 font-medium">Completed & active orders</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#8B5A2B]" />
          </div>
          <p className="text-2xl font-serif font-bold text-slate-950 tabular-nums">
            {totalOrdersCount}
          </p>
          <span className="text-[10px] text-slate-500 font-medium">{pendingOrdersCount} requiring fulfillment</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Boutique Catalog</span>
            <Sparkles className="w-4 h-4 text-[#8B5A2B]" />
          </div>
          <p className="text-2xl font-serif font-bold text-slate-950 tabular-nums">
            {totalProductsCount} Designs
          </p>
          <span className="text-[10px] text-slate-500 font-medium">Across 6 silhouettes</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Low-Stock Warnings</span>
            <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-amber-500' : 'text-slate-400'}`} />
          </div>
          <p className="text-2xl font-serif font-bold text-slate-950 tabular-nums">
            {lowStockCount}
          </p>
          <span className="text-[10px] text-amber-700 font-medium">≤ 5 pieces remaining</span>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-[#EAE5D9] text-xs uppercase tracking-wider font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 transition-colors relative ${
            activeTab === 'overview'
              ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
              : 'hover:text-slate-900'
          }`}
        >
          Overview & Activity
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 transition-colors relative ${
            activeTab === 'products'
              ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
              : 'hover:text-slate-900'
          }`}
        >
          Product Management ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 transition-colors relative ${
            activeTab === 'orders'
              ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
              : 'hover:text-slate-900'
          }`}
        >
          Order Management ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`pb-3 px-4 transition-colors relative ${
            activeTab === 'database'
              ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F172A]'
              : 'hover:text-slate-900'
          }`}
        >
          Database & Sync
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-slate-900">
              Recent Atelier Orders
            </h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs font-semibold text-[#8B5A2B] hover:underline uppercase tracking-wider"
            >
              View All Orders →
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAE5D9] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE5D9] text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Pieces</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5D9] text-slate-700">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{o.customerName}</p>
                        <p className="text-[10px] text-slate-400">{o.customerEmail}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 tabular-nums">
                        {o.items.reduce((s, i) => s + i.quantity, 0)} items
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">${o.total}</td>
                      <td className="py-3 px-4 text-[11px]">{o.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border bg-slate-100 border-slate-300">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrderDetails(o);
                            setActiveTab('orders');
                          }}
                          className="text-xs font-semibold text-[#8B5A2B] hover:underline"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products or SKU..."
                  className="text-xs pl-9 pr-3 py-2 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B] w-64"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenCreateProduct}
              className="px-4 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-wider font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#C5A880]" />
              <span>Add New Creation</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAE5D9] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE5D9] text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Design</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Total Stock</th>
                    <th className="py-3 px-4">Colorways</th>
                    <th className="py-3 px-4">Status Badges</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5D9]">
                  {filteredAdminProducts.map(p => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.colors[0]?.images[0]}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg border border-[#EAE5D9] shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">{p.name}</p>
                            <p className="font-mono text-[10px] text-slate-400">{p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{p.category}</td>
                      <td className="py-3 px-4 tabular-nums">
                        {p.salePrice ? (
                          <div>
                            <span className="font-bold text-slate-900">${p.salePrice}</span>{' '}
                            <span className="line-through text-slate-400 text-[10px]">${p.price}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-slate-900">${p.price}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tabular-nums ${
                            p.stock <= 5
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {p.colors.map(col => (
                            <span
                              key={col.id}
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                              style={{ backgroundColor: col.colorHex }}
                              title={`${col.colorName}: ${col.stock} in stock`}
                            />
                          ))}
                          <span className="text-[10px] text-slate-400 ml-1">
                            ({p.colors.length})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.bestseller && (
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-900 text-white font-semibold">
                              Bestseller
                            </span>
                          )}
                          {p.newArrival && (
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#8B5A2B] text-white font-semibold">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-[#FAF8F5] rounded-md transition-colors"
                            title="Edit creation and variations"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete creation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Filter by Order ID or Client..."
                  className="text-xs pl-9 pr-3 py-2 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none focus:border-[#8B5A2B] w-64"
                />
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-[#EAE5D9] bg-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAE5D9] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE5D9] text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Items / Colorways</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment Mode</th>
                    <th className="py-3 px-4">Status Update</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5D9]">
                  {filteredAdminOrders.map(o => (
                    <tr key={o.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{o.customerName}</p>
                        <p className="text-[10px] text-slate-400">{o.customerPhone}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                              <span
                                className="w-2 h-2 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: it.colorHex }}
                              />
                              <span className="truncate max-w-[120px]">{it.productName}</span>
                              <span className="text-slate-400">({it.colorName} × {it.quantity})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                        ${o.total}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px]">{o.paymentMethod}</span>
                        <p className="text-[10px] text-slate-400">({o.paymentStatus})</p>
                      </td>
                      <td className="py-3 px-4">
                        {/* Status selector */}
                        <select
                          value={o.orderStatus}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#EAE5D9] bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="p-1.5 text-[#8B5A2B] hover:text-slate-950 font-semibold"
                        >
                          <Eye className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATABASE & SYNC */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-3xl border border-[#EAE5D9] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg font-semibold text-slate-900">
              Database Infrastructure & Firebase Settings
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Active Storage State: Local client storage with seamless Firestore readiness.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5D9] space-y-3 text-xs">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Optional Firebase Firestore Setup
            </h4>
            <p className="text-slate-600 leading-relaxed">
              To bind Aurelia Atelier to your dedicated live Google Firebase project, provide your Firebase keys in your <code>.env</code> file:
            </p>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
{`VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"`}
            </pre>
            <p className="text-slate-500 text-[11px]">
              Security rules are pre-drafted in <code>firestore.rules</code> and <code>firebase-blueprint.json</code>.
            </p>
          </div>

          <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-900">Reset Demo Catalog</h4>
              <p className="text-[11px] text-slate-400">Restore products, categories and seed orders to default factory state.</p>
            </div>
            <button
              onClick={resetToInitialData}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Default Catalog</span>
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#EAE5D9] overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="font-serif text-lg font-semibold text-slate-900">
                  {editingProductId ? 'Edit Product & Colorways' : 'Create New Luxury Creation'}
                </h3>
                <p className="text-xs text-slate-400">
                  Manage silhouette details, material descriptions, and independent colorway inventories.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Basic Fields */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9] space-y-4">
                <h4 className="font-serif text-sm font-semibold text-slate-900 border-b border-[#EAE5D9] pb-2">
                  1. Silhouette & Pricing
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productFormData.name}
                      onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                      placeholder="e.g. The Paloma Top Handle"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none focus:border-[#8B5A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Silhouette / Category *
                    </label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value as BagCategory })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Base Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={productFormData.price}
                      onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Sale Price ($) (Optional)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={productFormData.salePrice || ''}
                      onChange={(e) => setProductFormData({ ...productFormData, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                      placeholder="e.g. 520"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      SKU Reference *
                    </label>
                    <input
                      type="text"
                      required
                      value={productFormData.sku}
                      onChange={(e) => setProductFormData({ ...productFormData, sku: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={productFormData.tagline}
                    onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                    placeholder="Short editorial summary..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Description & Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                  />
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.bestseller}
                      onChange={(e) => setProductFormData({ ...productFormData, bestseller: e.target.checked })}
                      className="rounded accent-[#0F172A]"
                    />
                    <span>Bestseller Icon</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.newArrival}
                      onChange={(e) => setProductFormData({ ...productFormData, newArrival: e.target.checked })}
                      className="rounded accent-[#0F172A]"
                    />
                    <span>New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.featured}
                      onChange={(e) => setProductFormData({ ...productFormData, featured: e.target.checked })}
                      className="rounded accent-[#0F172A]"
                    />
                    <span>Featured Hero</span>
                  </label>
                </div>
              </div>

              {/* COLOR VARIATIONS MANAGER (CRITICAL FEATURE) */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9] space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-2">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-slate-900">
                      2. Color Variations & Assigned Photography
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Each colorway has its own images, stock, and hex swatch.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddColorVariation}
                    className="px-3 py-1.5 bg-amber-50 text-[#8B5A2B] border border-amber-200 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Colorway</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {productFormData.colors.map((color, idx) => (
                    <div
                      key={color.id || idx}
                      className="p-4 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5]/60 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/20"
                            style={{ backgroundColor: color.colorHex }}
                          />
                          <span className="font-semibold text-xs text-slate-900">
                            Colorway #{idx + 1}: {color.colorName}
                          </span>
                        </div>

                        {productFormData.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColorVariation(idx)}
                            className="text-[11px] text-rose-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove Color</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                            Color Name
                          </label>
                          <input
                            type="text"
                            required
                            value={color.colorName}
                            onChange={(e) => {
                              const updated = [...productFormData.colors];
                              updated[idx].colorName = e.target.value;
                              setProductFormData({ ...productFormData, colors: updated });
                            }}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#EAE5D9] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                            Color Hex (#141416)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={color.colorHex}
                              onChange={(e) => {
                                const updated = [...productFormData.colors];
                                updated[idx].colorHex = e.target.value;
                                setProductFormData({ ...productFormData, colors: updated });
                              }}
                              className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0"
                            />
                            <input
                              type="text"
                              value={color.colorHex}
                              onChange={(e) => {
                                const updated = [...productFormData.colors];
                                updated[idx].colorHex = e.target.value;
                                setProductFormData({ ...productFormData, colors: updated });
                              }}
                              className="w-full text-xs font-mono px-2 py-1.5 rounded-lg border border-[#EAE5D9] bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                            Inventory Stock
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={color.stock}
                            onChange={(e) => {
                              const updated = [...productFormData.colors];
                              updated[idx].stock = Number(e.target.value);
                              setProductFormData({ ...productFormData, colors: updated });
                            }}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#EAE5D9] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                            Variation SKU
                          </label>
                          <input
                            type="text"
                            value={color.sku || ''}
                            onChange={(e) => {
                              const updated = [...productFormData.colors];
                              updated[idx].sku = e.target.value;
                              setProductFormData({ ...productFormData, colors: updated });
                            }}
                            className="w-full text-xs font-mono px-2.5 py-1.5 rounded-lg border border-[#EAE5D9] bg-white"
                          />
                        </div>
                      </div>

                      {/* Image Manager for this variation */}
                      <div className="pt-2 border-t border-[#EAE5D9]/60">
                        <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-700 mb-2">
                          Assigned Photos for this Color ({color.images.length})
                        </label>

                        <div className="flex flex-wrap items-center gap-3">
                          {color.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative group/img">
                              <img
                                src={img}
                                alt="Variation thumb"
                                className="w-16 h-16 object-cover rounded-lg border border-[#EAE5D9]"
                              />
                              {color.images.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...productFormData.colors];
                                    updated[idx].images = updated[idx].images.filter((_, i) => i !== imgIdx);
                                    setProductFormData({ ...productFormData, colors: updated });
                                  }}
                                  className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}

                          {/* Upload image button */}
                          <label className="w-16 h-16 rounded-lg border-2 border-dashed border-[#EAE5D9] hover:border-[#8B5A2B] bg-white flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-[#8B5A2B] transition-colors">
                            <Upload className="w-4 h-4" />
                            <span className="text-[8px] uppercase font-semibold mt-1">Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageFileUpload(idx, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#EAE5D9] text-xs uppercase tracking-wider font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md"
                >
                  Save Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DETAILS MODAL / DRAWER */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EAE5D9] overflow-hidden my-8 relative p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Order Management</span>
                <h3 className="font-mono text-xl font-bold text-slate-900">{selectedOrderDetails.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Updater */}
            <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800">Current Order Status</p>
                <p className="text-[11px] text-slate-500">Update status to notify logistics & customer.</p>
              </div>
              <select
                value={selectedOrderDetails.orderStatus}
                onChange={(e) => {
                  const newStatus = e.target.value as OrderStatus;
                  updateOrderStatus(selectedOrderDetails.id, newStatus);
                  setSelectedOrderDetails({ ...selectedOrderDetails, orderStatus: newStatus });
                }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#0F172A] bg-white cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Client Info</span>
                <p className="font-bold text-slate-900">{selectedOrderDetails.customerName}</p>
                <p className="text-slate-600">{selectedOrderDetails.customerEmail}</p>
                <p className="text-slate-600">{selectedOrderDetails.customerPhone}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Delivery Address</span>
                <p className="text-slate-800">{selectedOrderDetails.shippingAddress.street}</p>
                <p className="text-slate-800">
                  {selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.province} {selectedOrderDetails.shippingAddress.postalCode}
                </p>
                {selectedOrderDetails.shippingAddress.orderNotes && (
                  <p className="text-[11px] text-slate-500 italic mt-1">"{selectedOrderDetails.shippingAddress.orderNotes}"</p>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800">Purchased Bags</h4>
              <div className="divide-y divide-[#EAE5D9] border border-[#EAE5D9] rounded-2xl bg-white p-3">
                {selectedOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.productName} className="w-12 h-12 object-cover rounded-lg border border-[#EAE5D9]" />
                      <div>
                        <p className="font-semibold text-slate-900">{item.productName}</p>
                        <p className="text-[11px] text-slate-500">
                          {item.colorName} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums">${item.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#EAE5D9] text-sm font-bold text-slate-950">
              <span className="font-serif">Total Authorized</span>
              <span className="tabular-nums">${selectedOrderDetails.total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
