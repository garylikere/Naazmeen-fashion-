import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AboutModal } from './components/about/AboutModal';
import { ContactModal } from './components/about/ContactModal';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { CustomerOrdersPage } from './components/orders/CustomerOrdersPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { QuickProductUploadModal } from './components/admin/QuickProductUploadModal';
import { WhatsAppButton } from './components/common/WhatsAppButton';

const AppContent: React.FC = () => {
  const { activeView, isProductUploadOpen, setIsProductUploadOpen } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-[#0F172A] selection:text-[#FAF8F5]">
      {/* Universal Top Navigation Header */}
      <Header />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeView === 'home' && <HomePage />}
        {activeView === 'shop' && <ShopPage />}
        {activeView === 'product' && <ProductDetailPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'confirmation' && <OrderConfirmationPage />}
        {activeView === 'orders' && <CustomerOrdersPage />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <AboutModal />
      <ContactModal />
      <ToastContainer />

      {/* Dedicated Quick Product Upload Modal */}
      <QuickProductUploadModal
        isOpen={isProductUploadOpen}
        onClose={() => setIsProductUploadOpen(false)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

