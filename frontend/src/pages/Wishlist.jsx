import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <div className="pb-24 pt-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
          Your Favorites
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ebony mt-2">
          Boutique Wishlist
        </h1>
        <p className="text-xs font-sans text-ebony/60 mt-2">
          {wishlist.length} saved luxury outfit{wishlist.length === 1 ? '' : 's'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-bisque/50 max-w-md mx-auto p-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center text-rose-antique text-2xl mx-auto">
              <FiHeart />
            </div>
            <h3 className="font-serif text-xl font-bold text-ebony">Your Wishlist is Empty</h3>
            <p className="text-xs font-sans text-ebony/60">
              Save your favorite designer kurtis, sarees, and boutique outfits to review anytime.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-ebony text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-rose-deep transition-colors"
            >
              Explore Collection <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
