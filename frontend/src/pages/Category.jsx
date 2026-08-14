import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsData, categoriesData } from '../data/products';

const Category = () => {
  const { slug } = useParams();

  const categoryName = slug ? slug.replace('-', ' ') : 'Boutique Collection';

  const categoryProducts = productsData.filter((p) =>
    p.category.toLowerCase().includes(categoryName.toLowerCase()) ||
    p.mainCategory?.toLowerCase().includes(categoryName.toLowerCase()) ||
    p.subCategory?.toLowerCase().includes(categoryName.toLowerCase())
  );

  return (
    <div className="pb-20 pt-6">
      {/* Category Banner */}
      <div className="relative bg-ebony text-white py-20 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ebony via-ebony/70 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=80"
          alt={categoryName}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-3">
          <span className="text-xs font-sans font-bold text-blush uppercase tracking-[0.3em]">
            Estilo Wear Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold capitalize text-white">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm font-sans text-white/80 max-w-lg leading-relaxed font-light">
            Explore handcrafted designs curated with fine embroidery, pure fabrics, and authentic Indian artistry.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-bisque/60">
          <span className="text-xs font-sans font-bold text-ebony">
            Showing {categoryProducts.length} Items
          </span>
          <Link
            to="/shop"
            className="text-xs font-sans font-bold uppercase tracking-wider text-rose-antique hover:underline"
          >
            Explore All Outfits →
          </Link>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-bisque/50">
            <h3 className="font-serif text-xl font-bold text-ebony mb-2">No Items Found in {categoryName}</h3>
            <p className="text-xs font-sans text-ebony/60 mb-4">Check back soon or explore our full shop catalog.</p>
            <Link
              to="/shop"
              className="inline-block bg-ebony text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full"
            >
              Go to Shop Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
