import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  ColorVariation,
  CartItem,
  Order,
  OrderStatus,
  ShippingAddress,
  PaymentMethod,
  BagCategory
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/seedProducts';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & View State
  activeView: 'home' | 'shop' | 'product' | 'checkout' | 'confirmation' | 'admin' | 'orders';
  setActiveView: (view: 'home' | 'shop' | 'product' | 'checkout' | 'confirmation' | 'admin' | 'orders') => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategoryFilter: BagCategory | 'All';
  setSelectedCategoryFilter: (cat: BagCategory | 'All') => void;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isProductUploadOpen: boolean;
  setIsProductUploadOpen: (open: boolean) => void;

  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToInitialData: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartDiscount: number;
  appliedCoupon: string | null;
  cartTotal: number;
  addToCart: (product: Product, color: ColorVariation, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: PaymentMethod) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminUser: { email: string; name: string; role: 'admin' } | null;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  // Customer Profile
  customerEmail: string;
  setCustomerEmail: (email: string) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'aurelia_products_v2',
  ORDERS: 'aurelia_orders_v2',
  CART: 'aurelia_cart_v2',
  WISHLIST: 'aurelia_wishlist_v2',
  ADMIN_AUTH: 'aurelia_admin_auth_v2',
  CUSTOMER_EMAIL: 'aurelia_customer_email_v2',
  COUPON: 'aurelia_coupon_v2'
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'product' | 'checkout' | 'confirmation' | 'admin' | 'orders'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<BagCategory | 'All'>('All');

  // Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProductUploadOpen, setIsProductUploadOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  }, [products]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders', e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  }, [orders]);

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading wishlist', e);
    }
    return ['prod-01', 'prod-03'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.COUPON);
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: 'admin' } | null>(() => {
    if (localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true') {
      return { email: 'admin@aurelia.com', name: 'Atelier Director', role: 'admin' };
    }
    return null;
  });

  // Customer Email
  const [customerEmail, setCustomerEmail] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CUSTOMER_EMAIL) || 'eleanor.vance@vogue-press.co.uk';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_EMAIL, customerEmail);
  }, [customerEmail]);

  // Product Lookup
  const getProductById = (id: string) => products.find(p => p.id === id);
  const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `prod-${Date.now().toString().slice(-5)}`;
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id,
      createdAt: now,
      updatedAt: now
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Created new product: ${newProduct.name}`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    const p = products.find(prod => prod.id === id);
    setProducts(prev => prev.filter(prod => prod.id !== id));
    showToast(`Product "${p?.name || id}" removed`, 'info');
  };

  const resetToInitialData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    showToast('Catalog restored to default boutique collection', 'info');
  };

  // Cart operations
  const addToCart = (product: Product, color: ColorVariation, quantity: number = 1) => {
    const cartItemId = `${product.id}_${color.id}`;
    const effectivePrice = color.priceOverride ?? product.salePrice ?? product.price;
    const selectedImg = color.images[0] || product.colors[0]?.images[0] || '';

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, color.stock);
        return prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item);
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          category: product.category,
          selectedColor: color,
          selectedImage: selectedImg,
          unitPrice: effectivePrice,
          quantity: Math.min(quantity, color.stock > 0 ? color.stock : 1),
          maxStock: color.stock
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${product.name} (${color.colorName}) to your shopping bag`, 'success');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const cappedQty = Math.min(quantity, item.maxStock);
        return { ...item, quantity: cappedQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart totals calculation
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  // Free shipping on orders over $400, otherwise $25 white-glove express courier
  const cartShipping = cartSubtotal >= 400 || cartSubtotal === 0 ? 0 : 25;

  let cartDiscount = 0;
  if (appliedCoupon === 'AURELIA15') {
    cartDiscount = Math.round(cartSubtotal * 0.15);
  } else if (appliedCoupon === 'WELCOME50') {
    cartDiscount = Math.min(cartSubtotal, 50);
  } else if (appliedCoupon === 'LUXE20') {
    cartDiscount = Math.round(cartSubtotal * 0.20);
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AURELIA15' || cleanCode === 'WELCOME50' || cleanCode === 'LUXE20') {
      setAppliedCoupon(cleanCode);
      localStorage.setItem(STORAGE_KEYS.COUPON, cleanCode);
      showToast(`Privilege code ${cleanCode} applied!`, 'success');
      return { success: true, message: `Privilege code applied!` };
    }
    showToast('Invalid coupon code. Try AURELIA15 or WELCOME50', 'error');
    return { success: false, message: 'Invalid or expired privilege code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    showToast('Coupon code removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const prod = products.find(p => p.id === productId);
      if (exists) {
        showToast(`Removed "${prod?.name || 'bag'}" from your wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Added "${prod?.name || 'bag'}" to your wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = async (shippingAddress: ShippingAddress, paymentMethod: PaymentMethod): Promise<Order> => {
    const orderId = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const orderItems = cart.map(item => ({
      productId: item.productId,
      productName: item.productName,
      colorName: item.selectedColor.colorName,
      colorHex: item.selectedColor.colorHex,
      image: item.selectedImage,
      price: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.unitPrice * item.quantity
    }));

    const newOrder: Order = {
      id: orderId,
      customerId: `cust-${Date.now()}`,
      customerName: shippingAddress.fullName,
      customerEmail: shippingAddress.email,
      customerPhone: shippingAddress.phone,
      shippingAddress,
      items: orderItems,
      subtotal: cartSubtotal,
      shippingFee: cartShipping,
      discount: cartDiscount,
      couponCode: appliedCoupon || undefined,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      createdAt: now,
      updatedAt: now
    };

    // Automatically reduce product and variation stock
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        const itemBought = cart.find(c => c.productId === prod.id);
        if (!itemBought) return prod;

        const updatedColors = prod.colors.map(col => {
          if (col.id === itemBought.selectedColor.id) {
            const nextColorStock = Math.max(0, col.stock - itemBought.quantity);
            return { ...col, stock: nextColorStock };
          }
          return col;
        });

        const newTotalStock = updatedColors.reduce((sum, c) => sum + c.stock, 0);

        return {
          ...prod,
          stock: newTotalStock,
          colors: updatedColors,
          updatedAt: now
        };
      });
    });

    // Add to orders
    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCustomerEmail(shippingAddress.email);

    // Clear cart and coupon
    clearCart();
    removeCoupon();

    showToast(`Order #${orderId} confirmed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: status,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));
    showToast(`Order ${orderId} updated to ${status}`, 'success');
  };

  // Admin Auth
  const adminLogin = (email: string, pass: string): boolean => {
    // Accepts demo admin credentials including Tariq Mirani
    if (
      email === 'princtariqmirani@gmail.com' ||
      (email === 'admin@aurelia.com' && pass === 'aurelia123') ||
      (email === 'angelesalex247@gmail.com') ||
      (email.includes('admin') && pass.length >= 4)
    ) {
      setIsAdminLoggedIn(true);
      setAdminUser({ email, name: 'Naazmeen Fashion Director', role: 'admin' });
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      showToast('Welcome, Administrator. Access granted to Naazmeen Fashion.', 'success');
      return true;
    }
    showToast('Invalid administrator credentials. Try princtariqmirani@gmail.com', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    showToast('Admin session ended', 'info');
    setActiveView('home');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryFilter,
        setSelectedCategoryFilter,

        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,
        isProductUploadOpen,
        setIsProductUploadOpen,

        products,
        getProductById,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToInitialData,

        cart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartDiscount,
        appliedCoupon,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,

        isAdminLoggedIn,
        adminUser,
        adminLogin,
        adminLogout,

        customerEmail,
        setCustomerEmail,

        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
