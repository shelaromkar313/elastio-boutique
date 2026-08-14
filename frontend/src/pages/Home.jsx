import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiSearch, FiArrowRight, FiStar, FiInstagram,
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import ProductCard from '../components/ProductCard';
import { productsData, categoriesData, occasionsData, fabricsData, testimonialsData, instagramPosts } from '../data/products';
import { useShop } from '../context/ShopContext';

// ── Circular Category Data ──────────────────────────────────────────────────
const circleCategories = [
  {
    name: 'New Arrivals',
    path: '/shop?filter=new',
    image: '/hero-kurti-model.png',
  },
  {
    name: 'Kurtis',
    path: '/shop?category=Kurtis',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Cotton Kurtis',
    path: '/shop?category=Cotton Kurtis',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Designer Sarees',
    path: '/shop?category=Silk Sarees',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Anarkali',
    path: '/shop?category=Anarkali Suits',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Co-Ord Sets',
    path: '/shop?category=Co-Ord Sets',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Wedding Collection',
    path: '/shop?occasion=Wedding Collection',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Festive Wear',
    path: '/shop?occasion=Festive Wear',
    image: '/hero-kurti-model.png',
  },
  {
    name: 'Office Wear',
    path: '/shop?occasion=Office Wear',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Party Wear',
    path: '/shop?occasion=Party Wear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Ethnic Dresses',
    path: '/shop?category=Ethnic Dresses',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=350&h=350&q=85',
  },
  {
    name: 'Designer Collection',
    path: '/shop?category=Designer Kurtis',
    image: '/hero-kurti-model.png',
  },
];

// ── Component ────────────────────────────────────────────────────────────────
const Home = () => {
  const { setIsSearchOpen } = useShop();

  const trendingProducts = productsData.filter((p) => p.isTrending);
  const newArrivals = productsData.filter((p) => p.isNewArrival);
  const sareeSpotlight = productsData.filter((p) => p.mainCategory === 'Sarees');

  return (
    <div className="pb-16 bg-offwhite">

      {/* ══════════════════════════════════════════════════════
          3. LARGE SEARCH BAR — Immediately below navigation
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white/90 backdrop-blur-sm border-b border-bisque/30 py-3 sm:py-5 px-3 sm:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative cursor-pointer group"
            onClick={() => setIsSearchOpen(true)}
            role="search"
            aria-label="Open search"
          >
            {/* Search Icon */}
            <FiSearch className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-ebony/40 group-hover:text-rose-antique transition-colors duration-300 pointer-events-none" />

            {/* Input field wrapper */}
            <div className="w-full pl-10 sm:pl-14 pr-4 sm:pr-24 py-3 sm:py-4 rounded-full border border-bisque/70 bg-white shadow-soft text-xs sm:text-sm font-sans text-ebony/50 tracking-wide select-none group-hover:border-rose-antique group-hover:shadow-luxury transition-all duration-300 flex items-center">
              Search kurtis, sarees, festive wear...
            </div>

            {/* Right Search Button */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-ebony text-white group-hover:bg-rose-antique px-4 sm:px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-colors duration-300 hidden sm:flex items-center gap-1.5">
              <span>Search</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. CIRCULAR CATEGORY SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-bisque/30 py-5 sm:py-9">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Horizontal scrollable row */}
          <div
            className="flex gap-3 sm:gap-7 overflow-x-auto pb-3 pt-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {circleCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="flex-none"
              >
                <Link to={cat.path} className="flex flex-col items-center gap-2 group">
                  {/* Circle Image */}
                  <div className="w-[60px] h-[60px] sm:w-[86px] sm:h-[86px] lg:w-[98px] lg:h-[98px] rounded-full overflow-hidden border-2 border-bisque/60 p-[3px] sm:p-1 group-hover:border-rose-antique group-hover:shadow-floating transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Category Title */}
                  <span className="text-[10px] sm:text-xs font-sans font-semibold text-ebony/80 text-center tracking-wide group-hover:text-rose-antique transition-colors duration-300 max-w-[68px] sm:max-w-[100px] leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. HERO BANNER — One elegant woman, luxury Indian fashion
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-ebony"
        style={{ height: 'clamp(480px, 80vh, 900px)' }}
        aria-label="Hero Banner — New Collection"
      >
        {/* Editorial photograph — Indian Model Girl wearing Royal Embroidered Kurti */}
        <img
          src="/hero-kurti-model.png"
          alt="Estilo Wear — Model Girl wearing Luxury Royal Kurti"
          className="absolute inset-0 w-full h-full object-cover object-[70%_20%] sm:object-[center_15%]"
          fetchpriority="high"
        />

        {/* Dark luxury editorial overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent lg:to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 w-full">
            <div className="max-w-[580px] space-y-4 sm:space-y-6 text-white">

              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <span className="block w-7 sm:w-10 h-px bg-champagne flex-none" />
                <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.25em] sm:tracking-[0.35em] text-champagne uppercase">
                  NEW COLLECTION — 2025
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease: 'easeOut' }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Timeless<br />
                <em className="not-italic text-blush">Indian</em><br />
                Elegance
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.28, ease: 'easeOut' }}
                className="text-xs sm:text-base font-sans text-white/80 leading-relaxed font-light max-w-[340px] sm:max-w-[440px]"
              >
                Handcrafted Indian fashion for the modern woman — curated from artisan weavers across India.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.42, ease: 'easeOut' }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-3"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-white text-ebony hover:bg-blush font-sans text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-[1.03] group"
                >
                  Shop Now
                  <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/shop?filter=new"
                  className="text-xs font-sans font-semibold text-white/85 hover:text-white uppercase tracking-[0.15em] sm:tracking-[0.2em] border-b border-white/40 hover:border-white pb-1 transition-all duration-200"
                >
                  View New Arrivals
                </Link>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Soft bottom edge transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-offwhite/30 to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════════
          EXISTING SECTIONS — Fully preserved, unchanged
          ══════════════════════════════════════════════════════ */}
      <div className="space-y-12 sm:space-y-20 pt-10 sm:pt-20">

        {/* ── Featured Categories Grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ebony">
              Explore Boutique Categories
            </h2>
            <div className="w-12 h-0.5 bg-rose-antique mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            {categoriesData.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={`/shop?category=${encodeURIComponent(category.name.split(' ')[0])}`}
                  className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-floating transition-all duration-500 aspect-[3/4] border border-bisque/40"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ebony/90 via-ebony/30 to-transparent flex flex-col justify-end p-3 sm:p-5">
                    <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-blush">
                      {category.tagline}
                    </span>
                    <h3 className="font-serif text-base sm:text-xl font-bold text-white group-hover:text-champagne transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs font-sans text-white/80 flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Discover Now <FiArrowRight />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Trending Collection Showcase ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-champagne-light/30 py-10 sm:py-16 rounded-2xl sm:rounded-3xl border border-bisque/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
                Handpicked Styles
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ebony mt-1">
                Trending This Season
              </h2>
            </div>
            <Link
              to="/shop?filter=trending"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-ebony hover:text-rose-antique transition-colors border-b border-ebony pb-1"
            >
              View All Trending <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── High Fashion Editorial Banner: Lucknowi Chikankari Spotlight ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-ebony text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] sm:min-h-[480px]">
              {/* Left Image */}
              <div className="relative h-52 sm:h-72 lg:h-full">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=90"
                  alt="Lucknowi Chikankari Artistry"
                  className="w-full h-full object-cover object-top filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ebony hidden lg:block" />
              </div>

              {/* Right Text Box */}
              <div className="p-6 sm:p-12 lg:p-16 flex flex-col justify-center space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 text-blush text-xs font-sans font-bold uppercase tracking-widest">
                  <BsStars /> Royal Heritage Craftsmanship
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  The Lucknowi Chikankari &amp; Mukaish Symphony
                </h2>
                <p className="text-xs sm:text-sm font-sans text-white/80 leading-relaxed font-light">
                  Each stitch tells a century-old story. Hand-embroidered by women artisans in Lucknow, our Chikankari collection blends airy cotton mulmul with delicate silver Mukaish sequins for effortless festive regalness.
                </p>
                <div className="pt-2">
                  <Link
                    to="/shop?category=Chikankari Kurtis"
                    className="inline-flex items-center gap-3 bg-blush hover:bg-white text-ebony font-sans text-xs font-bold uppercase tracking-widest px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-all"
                  >
                    Explore Chikankari Kurtis <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Luxury Sarees Spotlight ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
              Six Yards of Royalty
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ebony">
              Luxury Banarasi &amp; Silk Sarees
            </h2>
            <p className="text-xs text-ebony/60 font-sans">
              Pure silk mark certified sarees featuring gold zari brocade Kadwa weaving.
            </p>
            <div className="w-12 h-0.5 bg-rose-antique mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {sareeSpotlight.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── Shop By Heritage Fabric ── */}
        <section className="bg-bisque/20 py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-7 sm:mb-10">
              <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
                Tactile Luxury
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ebony mt-1">
                Shop By Heritage Fabric
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {fabricsData.map((fabric, i) => (
                <Link
                  key={i}
                  to={`/shop?fabric=${encodeURIComponent(fabric.name)}`}
                  className="bg-white hover:bg-rose-antique hover:text-white p-3 sm:p-5 rounded-2xl border border-bisque/60 text-center shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <h4 className="font-serif text-sm sm:text-base font-bold text-ebony group-hover:text-white transition-colors">
                    {fabric.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-sans text-ebony/60 group-hover:text-white/80 transition-colors block mt-1">
                    {fabric.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Shop By Occasion ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
              Style For Every Event
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ebony">
              Shop By Occasion
            </h2>
            <div className="w-12 h-0.5 bg-rose-antique mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {occasionsData.map((occ) => (
              <Link
                key={occ.slug}
                to={`/shop?occasion=${encodeURIComponent(occ.name)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-floating transition-all duration-500"
              >
                <img
                  src={occ.image}
                  alt={occ.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ebony/90 via-ebony/20 to-transparent flex flex-col justify-end p-3 sm:p-4 text-center">
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-white group-hover:text-blush transition-colors">
                    {occ.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── New Arrivals Collection ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
                Fresh Off The Looms
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ebony mt-1">
                New Arrivals Collection
              </h2>
            </div>
            <Link
              to="/shop?filter=new"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-ebony hover:text-rose-antique transition-colors border-b border-ebony pb-1"
            >
              Explore All New Arrivals <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── Client Testimonials ── */}
        <section className="bg-champagne-light/50 py-10 sm:py-16 border-y border-bisque/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
              <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
                Real Estilo Women
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ebony mt-1">
                Words From Our Boutique Patrons
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
              {testimonialsData.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-bisque/60 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex text-amber-500 gap-1 text-sm">
                      {[...Array(t.rating)].map((_, i) => (
                        <FiStar key={i} className="fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs font-sans text-ebony/80 leading-relaxed italic">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-bisque/30">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-rose-antique"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-ebony">{t.name}</h4>
                      <span className="text-[11px] font-sans text-ebony/50">{t.role} • {t.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Instagram Lookbook Grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-7 sm:mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-rose-antique uppercase tracking-widest">
              <FiInstagram /> #SlayEveryLook
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ebony">
              Follow Us On Instagram @EstiloWear
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {instagramPosts.map((post) => (
              <div key={post.id} className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square">
                <img
                  src={post.image}
                  alt="Instagram Look"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ebony/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1 sm:space-y-2">
                  <FiInstagram className="text-xl sm:text-2xl text-blush" />
                  <span className="text-[10px] sm:text-xs font-sans font-bold">{post.tag}</span>
                  <span className="text-[9px] sm:text-[10px] font-sans text-white/80">{post.likes} Likes</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
