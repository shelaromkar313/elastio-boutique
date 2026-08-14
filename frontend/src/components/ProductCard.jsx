import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingBag, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist, setQuickViewProduct, addToCart } = useShop();

  const isWishlisted = isInWishlist(product.id);
  const mainImage = product.images?.[0] || '/hero-kurti-model.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-floating transition-all duration-500 border border-bisque/30 flex flex-col"
    >
      {/* Image Display Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-champagne-light/30">
        
        {/* Main Product Link */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-ebony text-white font-sans text-[8px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-rose-antique text-white font-sans text-[8px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
              {product.discount}% OFF
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-thyme text-white font-sans text-[8px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-ebony hover:text-rose-antique hover:scale-110 transition-all duration-300"
          aria-label="Add to Wishlist"
        >
          {isWishlisted ? (
            <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-antique" />
          ) : (
            <FiHeart className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </button>

        {/* Quick View & Quick Add Action Drawer on Hover */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 flex items-center gap-2">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 bg-white/90 hover:bg-white text-ebony font-sans text-xs font-semibold py-2.5 px-3 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center gap-1.5 transition-all hover:text-rose-antique"
          >
            <FiEye className="text-sm" /> Quick View
          </button>

          <button
            onClick={() => addToCart(product, product.colors[0]?.name, product.sizes[0] || 'M', 1)}
            className="w-10 h-10 rounded-full bg-ebony hover:bg-rose-antique text-white flex items-center justify-center shadow-lg transition-colors flex-shrink-0"
            title="Quick Add to Bag"
          >
            <FiShoppingBag className="text-sm" />
          </button>
        </div>

      </div>

      {/* Product Information Body */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">

        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-sans text-ebony/60 mb-0.5 sm:mb-1">
            <span className="uppercase tracking-wider font-medium text-rose-antique truncate mr-1">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <FiStar className="text-amber-500 fill-amber-500 text-[10px] sm:text-xs" />
              <span className="font-semibold text-ebony">{product.rating}</span>
              <span className="text-ebony/40 hidden sm:inline">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-xs sm:text-base font-bold text-ebony group-hover:text-rose-antique transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color Dots & Size Pills */}
        <div className="flex items-center justify-between pt-1">
          {/* Color Dots */}
          <div className="flex items-center gap-1">
            {product.colors?.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/20 inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              ></span>
            ))}
            {product.colors?.length > 3 && (
              <span className="text-[9px] sm:text-[10px] text-ebony/50 font-sans">+{product.colors.length - 3}</span>
            )}
          </div>

          {/* Sizes preview */}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-sans font-semibold text-ebony/60">
            {product.sizes?.slice(0, 4).map((s, idx) => (
              <span key={idx} className="bg-offwhite px-1.5 py-0.5 rounded border border-bisque/50">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Savings */}
        <div className="flex items-baseline gap-1 sm:gap-2 pt-1.5 sm:pt-2 border-t border-bisque/30">
          <span className="font-serif text-sm sm:text-lg font-bold text-ebony">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.oldPrice && (
            <span className="font-sans text-[10px] sm:text-xs text-ebony/40 line-through">
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount > 0 && (
            <span className="font-sans text-[9px] sm:text-[11px] font-bold text-thyme ml-auto">
              Save ₹{(product.oldPrice - product.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
