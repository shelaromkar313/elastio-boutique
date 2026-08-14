import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiGrid, FiList, FiChevronDown, FiRotateCcw } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Params State
  const initialCategory = searchParams.get('category') || '';
  const initialFabric = searchParams.get('fabric') || '';
  const initialOccasion = searchParams.get('occasion') || '';
  const initialFilter = searchParams.get('filter') || '';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState(initialFabric);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(25000);
  const [sortBy, setSortBy] = useState(initialFilter === 'new' ? 'newest' : 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState(4); // 3 or 4

  // Sync state if URL changes
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialFabric) setSelectedFabric(initialFabric);
    if (initialOccasion) setSelectedOccasion(initialOccasion);
  }, [initialCategory, initialFabric, initialOccasion]);

  const categories = [
    'Designer Kurtis',
    'Cotton Kurtis',
    'Chikankari Kurtis',
    'Straight Kurtis',
    'Anarkali Suits',
    'Banarasi Sarees',
    'Silk Sarees',
    'Organza Sarees',
    'Linen Sarees',
    'Cotton Sarees',
    'Co-Ord Sets',
    'Boutique Dresses',
    'Ethnic Dresses'
  ];

  const fabrics = ['Pure Silk', 'Chikankari Cotton', 'Mulmul Cotton', 'Organza', 'Banarasi Brocade', 'Organic Linen'];
  const occasions = ['Wedding Collection', 'Festive Wear', 'Office Wear', 'Casual Wear', 'Party Wear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedFabric('');
    setSelectedOccasion('');
    setSelectedSizes([]);
    setPriceRange(25000);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        // Category Filter
        if (selectedCategory) {
          const matchCategory = p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                                p.mainCategory?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                                p.subCategory?.toLowerCase().includes(selectedCategory.toLowerCase());
          if (!matchCategory) return false;
        }

        // Fabric Filter
        if (selectedFabric && p.fabric !== selectedFabric) return false;

        // Occasion Filter
        if (selectedOccasion && p.occasion !== selectedOccasion) return false;

        // Size Filter
        if (selectedSizes.length > 0) {
          const hasSize = p.sizes?.some((s) => selectedSizes.includes(s));
          if (!hasSize) return false;
        }

        // Price Filter
        if (p.price > priceRange) return false;

        // Search Filter
        if (initialSearch) {
          const query = initialSearch.toLowerCase();
          const matchSearch = p.name.toLowerCase().includes(query) ||
                              p.category.toLowerCase().includes(query) ||
                              p.fabric.toLowerCase().includes(query);
          if (!matchSearch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured
      });
  }, [selectedCategory, selectedFabric, selectedOccasion, selectedSizes, priceRange, sortBy, initialSearch]);

  return (
    <div className="pb-16 sm:pb-20 pt-4 sm:pt-6">
      
      {/* Banner */}
      <div className="bg-champagne-light/50 py-8 sm:py-12 mb-6 sm:mb-10 border-y border-bisque/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
            The Complete Atelier
          </span>
          <h1 className="font-serif text-2xl sm:text-5xl font-bold text-ebony mt-2">
            Women's Boutique Collection
          </h1>
          <p className="text-[11px] sm:text-sm font-sans text-ebony/70 mt-2 max-w-xl mx-auto">
            Discover handcrafted kurtis, silk sarees, anarkali suits, and modern ethnic co-ord sets tailored for the modern connoisseur.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-bisque/60">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 bg-white border border-bisque px-4 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-ebony shadow-sm"
          >
            <FiFilter className="text-rose-antique" /> Filters
          </button>

          {/* Results Count & Active Tags */}
          <div className="flex items-center gap-3 text-xs font-sans text-ebony/70">
            <span>Showing <strong className="text-ebony">{filteredProducts.length}</strong> Products</span>
            {(selectedCategory || selectedFabric || selectedOccasion || selectedSizes.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-rose-antique hover:underline font-bold flex items-center gap-1 ml-2"
              >
                <FiRotateCcw className="text-[10px]" /> Reset Filters
              </button>
            )}
          </div>

          {/* Controls: Grid layout toggles & Sorting */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Grid Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-1 border border-bisque rounded-full p-1 bg-white">
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 rounded-full transition-colors ${gridColumns === 3 ? 'bg-ebony text-white' : 'text-ebony/60 hover:text-ebony'}`}
                title="3 Columns"
              >
                <FiGrid className="text-sm" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 rounded-full transition-colors ${gridColumns === 4 ? 'bg-ebony text-white' : 'text-ebony/60 hover:text-ebony'}`}
                title="4 Columns"
              >
                <FiList className="text-sm" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-bisque rounded-full px-4 py-2.5 text-xs font-sans font-bold text-ebony uppercase tracking-wider focus:outline-none focus:border-rose-antique shadow-sm cursor-pointer pr-8 appearance-none"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="newest">Sort by: New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-ebony pointer-events-none text-xs" />
            </div>
          </div>

        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            
            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-ebony border-b border-bisque pb-2 uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                <label className="flex items-center gap-2.5 text-xs font-sans text-ebony cursor-pointer hover:text-rose-antique">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="accent-rose-antique"
                  />
                  <span>All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 text-xs font-sans text-ebony/80 cursor-pointer hover:text-rose-antique">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-rose-antique"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-ebony border-b border-bisque pb-2 uppercase tracking-wider">
                Fabric
              </h3>
              <div className="space-y-2">
                {fabrics.map((fab) => (
                  <label key={fab} className="flex items-center gap-2.5 text-xs font-sans text-ebony/80 cursor-pointer hover:text-rose-antique">
                    <input
                      type="checkbox"
                      checked={selectedFabric === fab}
                      onChange={() => setSelectedFabric(selectedFabric === fab ? '' : fab)}
                      className="accent-rose-antique rounded"
                    />
                    <span>{fab}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-ebony border-b border-bisque pb-2 uppercase tracking-wider">
                Occasion
              </h3>
              <div className="space-y-2">
                {occasions.map((occ) => (
                  <label key={occ} className="flex items-center gap-2.5 text-xs font-sans text-ebony/80 cursor-pointer hover:text-rose-antique">
                    <input
                      type="checkbox"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(selectedOccasion === occ ? '' : occ)}
                      className="accent-rose-antique rounded"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-ebony border-b border-bisque pb-2 uppercase tracking-wider">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold border transition-all ${
                      selectedSizes.includes(sz)
                        ? 'bg-ebony text-white border-ebony'
                        : 'bg-white text-ebony border-bisque hover:border-rose-antique'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-sans font-bold text-ebony">
                <span>Max Price:</span>
                <span className="text-rose-antique">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-rose-antique cursor-pointer"
              />
            </div>

          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 sm:grid-cols-2 ${
                  gridColumns === 4 ? 'lg:grid-cols-3 xl:grid-cols-3' : 'lg:grid-cols-2'
                } gap-3 sm:gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-bisque/50 p-8 space-y-4">
                <h3 className="font-serif text-2xl font-bold text-ebony">No Matching Outfits Found</h3>
                <p className="text-xs font-sans text-ebony/60 max-w-md mx-auto">
                  Try adjusting your filter options or clear all filters to explore our full boutique collection.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-ebony text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-rose-deep transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default Shop;
