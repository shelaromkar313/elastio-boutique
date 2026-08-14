import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiYoutube, FiSend, FiShield, FiTruck, FiRefreshCw, FiAward } from 'react-icons/fi';
import { FaPinterestP } from 'react-icons/fa';
import EstiloLogo from './EstiloLogo';

const Footer = () => {
  return (
    <footer className="bg-ebony text-white relative overflow-hidden pt-16 pb-12 border-t border-rose-antique/20">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-antique/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-thyme/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Luxury Value Pillars Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-antique/10 flex items-center justify-center text-blush text-xl flex-shrink-0">
              <FiAward />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-champagne-light">Authentic Heritage</h4>
              <p className="text-[11px] font-sans text-white/60">Handcrafted by Master Artisans</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-antique/10 flex items-center justify-center text-blush text-xl flex-shrink-0">
              <FiTruck />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-champagne-light">Express Delivery</h4>
              <p className="text-[11px] font-sans text-white/60">Free Shipping on ₹3,999+</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-antique/10 flex items-center justify-center text-blush text-xl flex-shrink-0">
              <FiRefreshCw />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-champagne-light">Easy Exchanges</h4>
              <p className="text-[11px] font-sans text-white/60">7-Day Hassle-Free Returns</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-antique/10 flex items-center justify-center text-blush text-xl flex-shrink-0">
              <FiShield />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-champagne-light">100% Secure Shopping</h4>
              <p className="text-[11px] font-sans text-white/60">Encrypted Payments & COD</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <EstiloLogo size="lg" variant="light" />
            <p className="text-xs sm:text-sm font-sans text-white/70 leading-relaxed max-w-sm">
              Estilo Wear is an exclusive luxury boutique celebrating the timeless grandeur of Indian women’s ethnic fashion. From hand-embroidered Lucknowi Chikankari to handwoven Banarasi Silk Sarees, we curate pieces that empower you to slay every look.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blush hover:bg-rose-antique hover:text-white transition-all">
                <FiInstagram className="text-base" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blush hover:bg-rose-antique hover:text-white transition-all">
                <FaPinterestP className="text-base" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blush hover:bg-rose-antique hover:text-white transition-all">
                <FiFacebook className="text-base" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blush hover:bg-rose-antique hover:text-white transition-all">
                <FiYoutube className="text-base" />
              </a>
            </div>
          </div>

          {/* Collection Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-champagne tracking-wider uppercase mb-5 border-b border-white/10 pb-2">
              Collections
            </h4>
            <ul className="space-y-3 text-xs font-sans text-white/75">
              <li><Link to="/shop?category=Designer Kurtis" className="hover:text-blush transition-colors">Designer Kurtis</Link></li>
              <li><Link to="/shop?category=Chikankari Kurtis" className="hover:text-blush transition-colors">Lucknowi Chikankari</Link></li>
              <li><Link to="/shop?category=Anarkali Suits" className="hover:text-blush transition-colors">Anarkali Suits</Link></li>
              <li><Link to="/shop?category=Silk Sarees" className="hover:text-blush transition-colors">Banarasi & Silk Sarees</Link></li>
              <li><Link to="/shop?category=Organza Sarees" className="hover:text-blush transition-colors">Organza Sarees</Link></li>
              <li><Link to="/shop?category=Co-Ord Sets" className="hover:text-blush transition-colors">Boutique Co-Ord Sets</Link></li>
              <li><Link to="/shop?occasion=Wedding Collection" className="hover:text-blush transition-colors">Wedding Couture</Link></li>
            </ul>
          </div>

          {/* Boutique Service Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-champagne tracking-wider uppercase mb-5 border-b border-white/10 pb-2">
              Customer Care
            </h4>
            <ul className="space-y-3 text-xs font-sans text-white/75">
              <li><Link to="/contact" className="hover:text-blush transition-colors">Boutique Appointments</Link></li>
              <li><Link to="/about" className="hover:text-blush transition-colors">Artisan Craftsmanship</Link></li>
              <li><Link to="/contact" className="hover:text-blush transition-colors">Bespoke Tailoring</Link></li>
              <li><Link to="/contact" className="hover:text-blush transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-blush transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-blush transition-colors">Size Guide & Fit</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-serif text-base font-bold text-champagne tracking-wider uppercase mb-5 border-b border-white/10 pb-2">
              Privé Circle
            </h4>
            <p className="text-xs font-sans text-white/70 mb-4 leading-relaxed">
              Subscribe to receive private collection previews, VIP boutique invitations, and ₹500 off your first couture order.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Estilo Wear Privé!'); }} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  className="w-full bg-white/10 text-white placeholder-white/40 text-xs px-4 py-3 rounded-full border border-white/20 focus:outline-none focus:border-rose-antique transition-colors pr-10"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 px-3 bg-rose-antique hover:bg-rose-deep text-white rounded-full transition-colors flex items-center justify-center text-xs"
                >
                  <FiSend />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Legal & Payment Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans">
          <p>© {new Date().getFullYear()} Estilo Wear. All Rights Reserved. Designed for Modern Luxury.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-blush break-words">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-blush break-words">Terms of Service</Link>
            <Link to="/contact" className="hover:text-blush break-words">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
