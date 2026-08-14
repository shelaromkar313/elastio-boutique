import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="py-28 px-4 text-center space-y-6 max-w-lg mx-auto">
      <span className="font-serif text-8xl font-bold text-rose-antique/40 block">
        404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ebony">
        Outfit Not Found in Atelier
      </h1>
      <p className="text-xs sm:text-sm font-sans text-ebony/60 leading-relaxed">
        The page or collection you are searching for might have moved or is temporarily unavailable. Let us guide you back to our curated boutique collections.
      </p>
      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="bg-ebony text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-rose-deep transition-colors inline-flex items-center gap-2"
        >
          Return Home <FiArrowRight />
        </Link>
        <Link
          to="/shop"
          className="bg-bisque/40 text-ebony hover:bg-bisque font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-colors"
        >
          Shop Catalog
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
