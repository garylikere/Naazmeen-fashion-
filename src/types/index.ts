export interface ColorVariation {
  id: string;
  colorName: string;
  colorHex: string;
  images: string[];
  stock: number;
  sku?: string;
  priceOverride?: number;
}

export type BagCategory =
  | 'Handbags'
  | 'Shoulder Bags'
  | 'Crossbody Bags'
  | 'Tote Bags'
  | 'Clutches'
  | 'Wallets';

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: BagCategory;
  price: number;
  salePrice?: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  rating: number;
  reviewCount: number;
  sku: string;
  stock: number; // total stock across variations
  colors: ColorVariation[];
  material: string;
  dimensions: string;
  hardware: string;
  lining: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // unique cart item id: productId_colorId
  productId: string;
  productName: string;
  productSlug: string;
  category: BagCategory;
  selectedColor: ColorVariation;
  selectedImage: string;
  unitPrice: number;
  quantity: number;
  maxStock: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'Cash on Delivery' | 'Credit/Debit Card' | 'Online Gateway';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
  orderNotes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  colorName: string;
  colorHex: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Authorized';
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface FilterState {
  category: BagCategory | 'All';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedColors: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-low-high' | 'price-high-low' | 'bestselling';
}
