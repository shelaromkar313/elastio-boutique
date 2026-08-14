import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { productsData } from '../data/products';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = ['Chikankari', 'Banarasi Silk', 'Anarkali', 'Organza Saree', 'Co-Ord Set', 'Wedding Couture'];

  const filteredProducts = query.trim()
    ? productsData.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.occasion.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-ebony/75 backdrop-blur-md"
        />

        {/* Search Container */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-2xl bg-offwhite rounded-3xl shadow-floating border border-bisque/80 p-6 z-10 glass-panel"
        >
          {/* Header Input */}
          <div className="relative flex items-center mb-6">
            <FiSearch className="absolute left-4 text-rose-antique text-xl" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Kurtis, Sarees, Anarkalis, Fabrics..."
              className="w-full pl-12 pr-12 py-3.5 bg-champagne-light/50 border border-bisque text-ebony placeholder-ebony/40 rounded-full font-sans text-sm focus:outline-none focus:border-rose-antique transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-12 text-ebony/50 hover:text-ebony text-sm p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 p-2 text-ebony/70 hover:text-rose-antique rounded-full"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Popular Tag Pills */}
          {!query && (
            <div className="mb-4">
              <span className="text-xs font-sans font-bold text-ebony/50 uppercase tracking-wider block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3.5 py-1.5 bg-white border border-bisque/60 hover:border-rose-antique rounded-full text-xs font-sans text-ebony/80 hover:text-rose-antique transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query && (
            <div className="max-h-[380px] overflow-y-auto space-y-3 pr-2">
              <div className="text-xs font-sans text-ebony/60 font-semibold mb-2">
                Found {filteredProducts.length} results for "{query}"
              </div>

              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-champagne-light/60 transition-colors border border-transparent hover:border-bisque/50 group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-18 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-rose-antique font-sans">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-ebony group-hover:text-rose-antique transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-sans text-ebony/60">Fabric: {product.fabric}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-sm font-bold text-ebony block">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-sans text-rose-antique flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        View <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-ebony/60 font-sans text-sm">
                  No matching boutique items found. Try searching for "Chikankari" or "Saree".
                </div>
              )}
            </div>
          )}

          {/* View All Search Button */}
          {query && filteredProducts.length > 0 && (
            <div className="mt-4 pt-3 border-t border-bisque/50 text-center">
              <Link
                to={`/shop?search=${encodeURIComponent(query)}`}
                onClick={() => setIsSearchOpen(false)}
                className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold text-rose-antique hover:underline tracking-wider"
              >
                View All Results in Catalog <FiArrowRight />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
