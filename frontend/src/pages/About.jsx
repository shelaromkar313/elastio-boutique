import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiShield, FiArrowRight } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

const About = () => {
  return (
    <div className="pb-16 sm:pb-24 pt-4 sm:pt-6 space-y-12 sm:space-y-20">
      
      {/* Banner */}
      <div className="relative bg-ebony text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ebony via-ebony/70 to-transparent z-10" />
        <img
          src="/hero-kurti-model.png"
          alt="Estilo Wear Heritage"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-sans font-bold text-blush uppercase tracking-[0.35em]">
            Estilo Wear Story
          </span>
          <h1 className="font-serif text-2xl sm:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Crafting Timeless Indian Couture for the Modern Connoisseur
          </h1>
          <p className="text-xs sm:text-sm font-sans text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Founded with a vision to preserve centuries of royal weaving traditions while designing chic silhouettes for contemporary celebrations.
          </p>
        </div>
      </div>

      {/* Brand Ethos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
              Our Heritage & Soul
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ebony leading-tight">
              Where Royal Tradition Meets Everyday Grace
            </h2>
            <p className="text-xs sm:text-sm font-sans text-ebony/80 leading-relaxed font-light">
              At <strong>Estilo Wear</strong>, we believe every piece of clothing is a canvas of living art. From the intricate shadow work of Lucknowi Chikankari to the grand gold brocades of Varanasi Kadwa looms, our boutique curates outfits that make women feel regal, confident, and effortlessly beautiful.
            </p>
            <p className="text-xs sm:text-sm font-sans text-ebony/80 leading-relaxed font-light">
              We collaborate directly with over 300 women weavers and master artisans across Uttar Pradesh, West Bengal, Rajasthan, and Tamil Nadu, ensuring fair trade practices and preserving authentic handloom legacies.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-floating aspect-[4/3] border border-bisque/60">
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
              alt="Handloom Weaving"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-champagne-light/50 py-10 sm:py-16 border-y border-bisque/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
              The Estilo Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ebony mt-1">
              Our Core Promises
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-bisque/60 space-y-3 sm:space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-rose-antique/10 flex items-center justify-center text-rose-antique text-2xl mx-auto">
                <FiAward />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ebony">100% Certified Pure Silk</h3>
              <p className="text-xs font-sans text-ebony/70 leading-relaxed">
                Every saree and silk outfit carries the Silk Mark of authenticity, woven with tested electro-plated zari threads.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-bisque/60 space-y-3 sm:space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-rose-antique/10 flex items-center justify-center text-rose-antique text-2xl mx-auto">
                <FiHeart />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ebony">Artisan Empowerment</h3>
              <p className="text-xs font-sans text-ebony/70 leading-relaxed">
                We directly empower female Chikankari artisans in Lucknow, providing sustainable livelihoods and education funds.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-bisque/60 space-y-3 sm:space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-rose-antique/10 flex items-center justify-center text-rose-antique text-2xl mx-auto">
                <FiShield />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ebony">Bespoke Fitting Service</h3>
              <p className="text-xs font-sans text-ebony/70 leading-relaxed">
                Our in-house boutique tailors offer custom adjustments and neck modifications to ensure your outfit fits like a dream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-ebony text-white p-8 sm:p-16 rounded-2xl sm:rounded-3xl shadow-floating space-y-4 sm:space-y-6">
          <span className="text-xs font-sans font-bold text-blush uppercase tracking-[0.3em]">
            Step Into Royalty
          </span>
          <h2 className="font-serif text-2xl sm:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Ready to Find Your Signature Look?
          </h2>
          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 sm:gap-3 bg-blush hover:bg-white text-ebony font-sans text-xs font-bold uppercase tracking-widest px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-all"
            >
              Explore Full Collection <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
