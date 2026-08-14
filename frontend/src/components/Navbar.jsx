import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, 
  FiChevronDown, FiArrowRight, FiPercent, FiPhone
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { useShop } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import EstiloLogo from './EstiloLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const { cartCount, wishlist, setIsSearchOpen, setIsCartOpen } = useShop();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Handle scroll detection for sticky transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location]);

  const kurtiCategories = [
    { title: 'Designer Kurtis', path: '/shop?category=Designer Kurtis' },
    { title: 'Cotton Kurtis', path: '/shop?category=Cotton Kurtis' },
    { title: 'Chikankari Kurtis', path: '/shop?category=Chikankari Kurtis' },
    { title: 'Straight Kurtis', path: '/shop?category=Straight Kurtis' },
    { title: 'Printed Kurtis', path: '/shop?category=Printed Kurtis' },
    { title: 'Anarkali Suits', path: '/shop?category=Anarkali Suits' }
  ];

  const sareeCategories = [
    { title: 'Banarasi Sarees', path: '/shop?category=Banarasi Sarees' },
    { title: 'Silk Sarees', path: '/shop?category=Silk Sarees' },
    { title: 'Organza Sarees', path: '/shop?category=Organza Sarees' },
    { title: 'Cotton Sarees', path: '/shop?category=Cotton Sarees' },
    { title: 'Linen Sarees', path: '/shop?category=Linen Sarees' }
  ];

  return (
    <>
      <div className="sticky top-0 z-50">
      {/* ── 1. Continuous Right-to-Left Announcement Ticker (White Background) ── */}
      <div className="bg-white text-ebony text-[11px] font-sans tracking-[0.22em] uppercase py-2 border-b border-bisque/40 overflow-hidden relative select-none z-40">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          {/* Ticker Item Group 1 */}
          <div className="flex items-center gap-8 shrink-0">
            <span className="flex items-center gap-2">
              <BsStars className="text-rose-antique text-xs animate-pulse" />
              <span>COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹1,499</span>
            </span>
            <span className="text-bisque font-bold">|</span>
            <span className="flex items-center gap-2">
              <BsStars className="text-thyme text-xs animate-pulse" />
              <span>USE CODE <strong className="text-rose-antique font-bold">BOUTIQUE10</strong> FOR 10% OFF</span>
            </span>
            <span className="text-bisque font-bold">|</span>
            <span className="flex items-center gap-2">
              <BsStars className="text-rose-antique text-xs animate-pulse" />
              <span>AUTHENTIC HANDLOOM BOUTIQUE COUTURE</span>
            </span>
            <span className="text-bisque font-bold">|</span>
          </div>

          {/* Ticker Item Group 2 (Duplicate for continuous loop) */}
          <div className="flex items-center gap-8 shrink-0">
            <span className="flex items-center gap-2">
              <BsStars className="text-rose-antique text-xs animate-pulse" />
              <span>COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹1,499</span>
            </span>
            <span className="text-bisque font-bold">|</span>
            <span className="flex items-center gap-2">
              <BsStars className="text-thyme text-xs animate-pulse" />
              <span>USE CODE <strong className="text-rose-antique font-bold">BOUTIQUE10</strong> FOR 10% OFF</span>
            </span>
            <span className="text-bisque font-bold">|</span>
            <span className="flex items-center gap-2">
              <BsStars className="text-rose-antique text-xs animate-pulse" />
              <span>AUTHENTIC HANDLOOM BOUTIQUE COUTURE</span>
            </span>
            <span className="text-bisque font-bold">|</span>
          </div>
        </motion.div>
      </div>

      {/* ── 2. Premium Fixed Header (Luxury Black Background) ── */}
      <header
        className={`w-full transition-all duration-500 bg-ebony text-white ${
          isScrolled
            ? 'bg-ebony/98 backdrop-blur-md shadow-2xl py-2 sm:py-3 border-b border-white/15'
            : 'bg-ebony py-2.5 sm:py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">

            {/* Left: Estilo Wear Logo + Mobile Menu Button */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-none min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 text-white hover:text-blush transition-colors rounded-full focus:outline-none flex-shrink-0"
                aria-label="Open Menu"
              >
                <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="flex-shrink min-w-0">
                <EstiloLogo size="sm" variant="light" className="sm:hidden" />
                <EstiloLogo size="md" variant="light" className="hidden sm:inline-flex" />
              </div>
            </div>

            {/* Center: Navigation Menu */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-6">
              <Link
                to="/"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 whitespace-nowrap"
              >
                Home
              </Link>

              <Link
                to="/shop?filter=new"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap"
              >
                New Arrivals
                <span className="w-1.5 h-1.5 rounded-full bg-blush animate-ping flex-none"></span>
              </Link>

              <Link
                to="/shop"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 whitespace-nowrap"
              >
                Shop
              </Link>

              {/* Kurtis Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('kurtis')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to="/shop?category=Kurtis"
                  className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 inline-flex items-center gap-1 whitespace-nowrap"
                >
                  Kurtis
                  <FiChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMegaMenu === 'kurtis' ? 'rotate-180 text-blush' : ''}`} />
                </Link>

                <AnimatePresence>
                  {activeMegaMenu === 'kurtis' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full -left-20 w-[600px] bg-ebony text-white shadow-floating rounded-2xl p-6 border border-white/20 grid grid-cols-2 gap-6 z-50 glass-panel-dark"
                    >
                      <div>
                        <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-3 border-b border-white/20 pb-2">
                          Kurti Collections
                        </h4>
                        <ul className="space-y-2">
                          {kurtiCategories.map((item) => (
                            <li key={item.title}>
                              <Link
                                to={item.path}
                                className="text-xs font-sans text-white/80 hover:text-blush transition-colors flex items-center gap-2 group"
                              >
                                <span className="w-1 h-1 rounded-full bg-blush/60 group-hover:w-2 group-hover:bg-blush transition-all"></span>
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative rounded-xl overflow-hidden group">
                        <img
                          src="/hero-kurti-model.png"
                          alt="Chikankari Kurti Preview"
                          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ebony/90 via-transparent to-transparent flex flex-col justify-end p-4">
                          <span className="text-[10px] text-blush uppercase tracking-widest font-semibold">Spotlight</span>
                          <span className="text-sm font-serif text-white font-bold">Lucknowi Chikankari</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sarees Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('sarees')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to="/shop?category=Sarees"
                  className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 inline-flex items-center gap-1 whitespace-nowrap"
                >
                  Sarees
                  <FiChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMegaMenu === 'sarees' ? 'rotate-180 text-blush' : ''}`} />
                </Link>

                <AnimatePresence>
                  {activeMegaMenu === 'sarees' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full -left-20 w-[600px] bg-ebony text-white shadow-floating rounded-2xl p-6 border border-white/20 grid grid-cols-2 gap-6 z-50 glass-panel-dark"
                    >
                      <div>
                        <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-3 border-b border-white/20 pb-2">
                          Heritage Sarees
                        </h4>
                        <ul className="space-y-2">
                          {sareeCategories.map((item) => (
                            <li key={item.title}>
                              <Link
                                to={item.path}
                                className="text-xs font-sans text-white/80 hover:text-blush transition-colors flex items-center gap-2 group"
                              >
                                <span className="w-1 h-1 rounded-full bg-blush/60 group-hover:w-2 group-hover:bg-blush transition-all"></span>
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative rounded-xl overflow-hidden group">
                        <img
                          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80"
                          alt="Banarasi Saree Preview"
                          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ebony/90 via-transparent to-transparent flex flex-col justify-end p-4">
                          <span className="text-[10px] text-blush uppercase tracking-widest font-semibold">Crafted in Kashi</span>
                          <span className="text-sm font-serif text-white font-bold">Pure Banarasi Silk</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/shop"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 whitespace-nowrap"
              >
                Collections
              </Link>

              <Link
                to="/shop?occasion=Festive Wear"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 whitespace-nowrap"
              >
                Festive
              </Link>

              <Link
                to="/shop?filter=sale"
                className="text-[11px] font-sans font-bold tracking-[0.15em] text-blush hover:text-white uppercase transition-colors py-2 flex items-center gap-1 whitespace-nowrap"
              >
                <FiPercent className="text-[10px]" />
                Sale
              </Link>

              <Link
                to="/about"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 whitespace-nowrap"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-[11px] font-sans font-semibold tracking-[0.15em] text-white/90 hover:text-blush uppercase transition-colors py-2 whitespace-nowrap"
              >
                Contact
              </Link>
            </nav>

            {/* Right: Search Icon, Wishlist, Profile, Shopping Cart */}
            <div className="flex items-center gap-0 sm:gap-1 flex-none flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2.5 text-white hover:text-blush transition-colors rounded-full hover:bg-white/10"
                aria-label="Search Catalog"
              >
                <FiSearch className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-1.5 sm:p-2.5 text-white hover:text-blush transition-colors rounded-full hover:bg-white/10 relative"
                aria-label="View Wishlist"
              >
                <FiHeart className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-blush text-ebony font-sans text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Profile — visible on all sizes */}
              <Link
                to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'}
                className="p-1.5 sm:p-2.5 text-white hover:text-blush transition-colors rounded-full hover:bg-white/10"
                aria-label="My Account"
              >
                <FiUser className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 sm:p-2.5 text-white hover:text-blush transition-colors rounded-full hover:bg-white/10 relative"
                aria-label="Open Shopping Bag"
              >
                <FiShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-thyme-light text-white font-sans text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>
    </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-ebony/60 backdrop-blur-sm z-50"
            />

            {/* Slide-in Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-md bg-offwhite z-50 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="p-5 flex items-center justify-between border-b border-bisque/60 bg-champagne-light">
                  <EstiloLogo size="sm" variant="dark" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-ebony hover:text-rose-antique transition-colors rounded-full"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Links List */}
                <div className="p-6 space-y-4">
                  <Link to="/" className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique">
                    Home
                  </Link>
                  <Link to="/shop?filter=new" className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique flex items-center justify-between">
                    New Arrivals
                    <span className="text-[10px] bg-rose-antique text-white px-2 py-0.5 rounded-full font-sans">New</span>
                  </Link>
                  <Link to="/shop" className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique">
                    Shop All
                  </Link>
                  
                  {/* Kurtis Submenu */}
                  <div className="pt-2">
                    <span className="text-xs font-serif font-bold text-rose-antique uppercase tracking-widest block mb-2">
                      Kurtis & Suits
                    </span>
                    <div className="pl-3 space-y-2 border-l border-rose-antique/30">
                      {kurtiCategories.map((c) => (
                        <Link key={c.title} to={c.path} className="block text-xs font-sans text-ebony/80 hover:text-rose-antique">
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Sarees Submenu */}
                  <div className="pt-2">
                    <span className="text-xs font-serif font-bold text-rose-antique uppercase tracking-widest block mb-2">
                      Luxury Sarees
                    </span>
                    <div className="pl-3 space-y-2 border-l border-rose-antique/30">
                      {sareeCategories.map((c) => (
                        <Link key={c.title} to={c.path} className="block text-xs font-sans text-ebony/80 hover:text-rose-antique">
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link to="/shop?category=Co-Ord Sets" className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique pt-2">
                    Co-Ord Sets
                  </Link>
                  <Link to="/about" className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique">
                    About Boutique
                  </Link>
                  <Link to="/contact" className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique">
                    Contact & Appointments
                  </Link>
                  <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'} className="block text-sm font-sans font-semibold text-ebony uppercase tracking-wider hover:text-rose-antique pt-4 border-t border-bisque/60 mt-4">
                    {user ? 'My Dashboard' : 'Log In / Register'}
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-6 border-t border-bisque/60 bg-champagne-light/50 space-y-4">
                <div className="flex items-center gap-3 text-xs text-ebony/80">
                  <FiPhone className="text-rose-antique" />
                  <span>Personal Stylist Hotline: +91 98765 43210</span>
                </div>
                <Link 
                  to="/shop" 
                  className="w-full inline-flex items-center justify-center gap-2 bg-ebony text-white py-3 rounded-full text-xs font-sans uppercase tracking-widest font-semibold hover:bg-rose-deep transition-colors"
                >
                  Explore Collection <FiArrowRight />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
