import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiStar, FiHeart, FiShoppingBag, FiTruck, FiShield, 
  FiRefreshCw, FiCheck, FiShare2, FiMapPin 
} from 'react-icons/fi';
import { TbRuler } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist, setSizeGuideOpen, showToast } = useShop();

  const product = productsData.find((p) => p.id === id) || productsData[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState(null);

  // Reset gallery state whenever product id changes
  React.useEffect(() => {
    setActiveImageIndex(0);
    if (product?.colors?.[0]?.name) {
      setSelectedColor(product.colors[0].name);
    }
    if (product?.sizes?.[0]) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
    setPincodeMsg(null);
    // Update browser tab title to match product
    document.title = `${product.name} | ESTILO WEAR`;
    return () => {
      document.title = 'ESTILO WEAR | Slay Every Look';
    };
  }, [id, product.id]);

  const isWishlisted = isInWishlist(product.id);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeMsg(`Express delivery available to ${pincode} by ${new Date(Date.now() + 86400000 * 3).toDateString()}`);
    } else {
      setPincodeMsg('Please enter a valid 6-digit PIN code.');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const relatedProducts = productsData.filter(
    (p) => p.id !== product.id && p.mainCategory === product.mainCategory
  );

  return (
    <div className="pb-16 sm:pb-24 pt-4 sm:pt-6">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="text-xs font-sans text-ebony/60 flex items-center gap-2">
          <Link to="/" className="hover:text-rose-antique">Home</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-rose-antique">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ebony font-bold truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-champagne-light/30 shadow-sm border border-bisque/50">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isNewArrival && (
                  <span className="bg-ebony text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    New Arrival
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-rose-antique text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Share Icon */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-ebony hover:text-rose-antique transition-colors"
                title="Share Outfit"
              >
                <FiShare2 className="text-sm" />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-rose-antique scale-105 shadow-md' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Controls */}
          <div className="space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Category & Rating Header */}
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-rose-antique font-bold uppercase tracking-widest">
                  {product.category} • SKU: {product.sku || 'EST-892'}
                </span>
                <div className="flex items-center gap-1.5 text-ebony">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="fill-amber-500 text-xs" />
                    ))}
                  </div>
                  <span className="font-bold text-xs">{product.rating}</span>
                  <span className="text-ebony/50">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ebony leading-tight">
                {product.name}
              </h1>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-3xl font-bold text-ebony">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.oldPrice && (
                  <span className="font-sans text-sm text-ebony/40 line-through">
                    ₹{product.oldPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-rose-antique/10 text-rose-deep font-sans text-xs font-bold px-3 py-1 rounded-full uppercase">
                    You Save ₹{(product.oldPrice - product.price).toLocaleString('en-IN')} ({product.discount}% OFF)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-sans text-ebony/80 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors?.length > 0 && (
                <div className="pt-2">
                  <span className="block text-xs font-sans font-bold text-ebony uppercase tracking-wider mb-2">
                    Color: <strong className="text-rose-antique">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === c.name ? 'border-ebony scale-110 shadow-sm' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && <FiCheck className="text-white text-xs" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes?.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans font-bold text-ebony uppercase tracking-wider">
                      Select Size
                    </span>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-xs font-sans text-rose-antique hover:underline flex items-center gap-1 font-semibold"
                    >
                      <TbRuler /> View Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-sans font-bold border transition-all ${
                          selectedSize === s
                            ? 'bg-ebony text-white border-ebony shadow-md'
                            : 'bg-white text-ebony border-bisque hover:border-rose-antique'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode Delivery Checker */}
              <div className="bg-champagne-light/50 p-4 rounded-2xl border border-bisque/60 space-y-2">
                <span className="text-xs font-sans font-bold text-ebony flex items-center gap-1.5 uppercase tracking-wider">
                  <FiMapPin className="text-rose-antique" /> Check Express Delivery
                </span>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code"
                    className="flex-1 bg-white border border-bisque rounded-xl px-3 py-2 text-xs font-sans focus:outline-none focus:border-rose-antique"
                  />
                  <button
                    type="submit"
                    className="bg-ebony text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-rose-deep transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeMsg && (
                  <p className="text-[11px] font-sans text-thyme font-bold pt-1">{pincodeMsg}</p>
                )}
              </div>

              {/* Call to Action Controls */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-bisque rounded-full px-3 py-3 bg-white w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-xs font-bold px-2 hover:text-rose-antique"
                  >
                    -
                  </button>
                  <span className="text-xs font-sans font-bold px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-xs font-bold px-2 hover:text-rose-antique"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
                  className="flex-1 bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-full shadow-floating transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FiShoppingBag className="text-base" /> Add to Shopping Bag
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-14 h-14 rounded-full border border-bisque bg-white flex items-center justify-center text-ebony hover:text-rose-antique transition-colors shadow-sm flex-shrink-0"
                  aria-label="Wishlist"
                >
                  {isWishlisted ? (
                    <FaHeart className="w-5 h-5 text-rose-antique" />
                  ) : (
                    <FiHeart className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Guarantees List */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-bisque/50 text-center font-sans text-[11px] text-ebony/70">
                <div className="flex flex-col items-center gap-1.5 p-2">
                  <FiTruck className="text-lg text-rose-antique" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2">
                  <FiRefreshCw className="text-lg text-rose-antique" />
                  <span>7-Day Easy Exchange</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2">
                  <FiShield className="text-lg text-rose-antique" />
                  <span>100% Authentic Handloom</span>
                </div>
              </div>

            </div>

            {/* Product Specifications Accordion/Details */}
            <div className="bg-white p-6 rounded-3xl border border-bisque/60 space-y-3 font-sans text-xs">
              <h3 className="font-serif text-base font-bold text-ebony uppercase tracking-wider border-b border-bisque/40 pb-2">
                Craftsmanship & Product Details
              </h3>
              <ul className="space-y-2 text-ebony/80 list-disc pl-4">
                {product.details?.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
              <p className="pt-2 text-ebony/60 border-t border-bisque/30">
                <strong>Care Instructions:</strong> {product.care}
              </p>
            </div>

          </div>

        </div>

        {/* Related Products Slider */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-bisque/60 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
                Complete Your Look
              </span>
              <h2 className="font-serif text-3xl font-bold text-ebony">
                You May Also Love
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
