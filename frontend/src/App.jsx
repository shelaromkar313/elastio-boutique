import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import SizeGuideModal from './components/SizeGuideModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
// Helper component to scroll window to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col justify-between bg-offwhite text-ebony font-sans antialiased selection:bg-blush selection:text-ebony">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Customer Routes */}
              <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Overlays & Modals */}
          <Toast />
          <QuickViewModal />
          <SearchModal />
          <SizeGuideModal />
          <CartDrawer />
          <CheckoutModal />
        </div>
      </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
