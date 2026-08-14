import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiShoppingBag, FiStar, FiCheck, FiTruck } from 'react-icons/fi';
import { TbRuler } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, setSizeGuideOpen } = useShop();

  if (!quickViewProduct) return null;

  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Reset modal state when product changes
  React.useEffect(() => {
    setActiveImgIndex(0);
    if (quickViewProduct?.colors?.[0]?.name) {
      setSelectedColor(quickViewProduct.colors[0].name);
    }
    if (quickViewProduct?.sizes?.[0]) {
      setSelectedSize(quickViewProduct.sizes[0]);
    }
    setQuantity(1);
  }, [quickViewProduct?.id]);

  const isWishlisted = isInWishlist(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-ebony/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-offwhite rounded-3xl shadow-floating overflow-hidden z-10 border border-bisque/60 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-ebony hover:text-rose-antique flex items-center justify-center transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Image Gallery */}
            <div className="p-6 bg-champagne-light/40 flex flex-col items-center justify-center">
              <div className="relative aspect-[3/4] w-full max-h-[420px] rounded-2xl overflow-hidden shadow-sm mb-4">
                <img
                  src={quickViewProduct.images?.[activeImgIndex] || quickViewProduct.images?.[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3">
                {quickViewProduct.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx ? 'border-rose-antique scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Specs & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 max-h-[80vh] overflow-y-auto">
              
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs font-sans text-rose-antique font-semibold uppercase tracking-wider mb-1">
                  <span>{quickViewProduct.category}</span>
                  <div className="flex items-center gap-1 text-ebony">
                    <FiStar className="text-amber-500 fill-amber-500 text-xs" />
                    <span>{quickViewProduct.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl font-bold text-ebony mb-2">
                  {quickViewProduct.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-2xl font-bold text-ebony">
                    ₹{quickViewProduct.price?.toLocaleString('en-IN')}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="font-sans text-sm text-ebony/40 line-through">
                      ₹{quickViewProduct.oldPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                  {quickViewProduct.discount > 0 && (
                    <span className="bg-rose-antique text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-full uppercase">
                      {quickViewProduct.discount}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-ebony/70 leading-relaxed font-sans mb-4 line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.colors?.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-sans font-semibold text-ebony uppercase tracking-wider mb-2">
                      Color: <span className="text-rose-antique">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {quickViewProduct.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
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
                {quickViewProduct.sizes?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-sans font-semibold text-ebony uppercase tracking-wider">
                        Select Size:
                      </label>
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        className="text-[11px] font-sans text-rose-antique hover:underline flex items-center gap-1"
                      >
                        <TbRuler /> Size Guide
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold border transition-all ${
                            selectedSize === s
                              ? 'bg-ebony text-white border-ebony'
                              : 'bg-white text-ebony border-bisque/60 hover:border-rose-antique'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-bisque/40">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-bisque/80 rounded-full bg-white px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-ebony hover:text-rose-antique font-bold px-2"
                    >
                      -
                    </button>
                    <span className="font-sans text-xs font-bold px-3">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-ebony hover:text-rose-antique font-bold px-2"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-6 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag /> Add to Bag
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className="w-12 h-12 rounded-full border border-bisque/80 bg-white flex items-center justify-center text-ebony hover:text-rose-antique transition-colors"
                  >
                    {isWishlisted ? <FaHeart className="text-rose-antique" /> : <FiHeart />}
                  </button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-xs font-sans text-rose-antique hover:underline uppercase tracking-wider font-semibold py-1"
                >
                  View Full Product Details →
                </Link>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
