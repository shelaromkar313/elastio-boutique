import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSlides = [
  {
    id: 1,
    title: 'Nawabi Chikankari Grace',
    subtitle: 'THE ROYAL LUCKNOW COLLECTION',
    description: 'Handcrafted mulmul kurtis & ethereal Anarkali suits woven with shadow embroidery and delicate mukaish sequins.',
    image: '/hero-kurti-model.png',
    link: '/shop?category=Chikankari Kurtis',
    badge: 'Artisanal Heritage'
  },
  {
    id: 2,
    title: 'Heritage Banarasi Silk',
    subtitle: 'CRAFTED IN THE HOLY CITY',
    description: 'Immortal six yards of pure Katan silk embellished with Kadwa zari weaving and royal peacock motifs.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=2000&q=90',
    link: '/shop?category=Silk Sarees',
    badge: 'Pure Silk Mark Certified'
  },
  {
    id: 3,
    title: 'Modern Ethnic Co-Ords',
    subtitle: 'BOUTIQUE ELEGANCE REDEFINED',
    description: 'Structured peplum silhouettes and silk flared trousers designed for contemporary celebrations.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90',
    link: '/shop?category=Co-Ord Sets',
    badge: 'New Season Arrival'
  }
];

const HeroSlider = () => {
  return (
    <section className="relative w-full overflow-hidden bg-ebony">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-[82vh] min-h-[580px] max-h-[850px] w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-top filter brightness-[0.88] contrast-[1.05]"
              />
              {/* Gradient Overlays for Editorial Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-ebony/90 via-ebony/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-ebony/80 via-transparent to-transparent" />
            </div>

            {/* Slide Text Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-10">
              <div className="max-w-xl text-white space-y-6 pt-12">
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-blush/30 text-blush text-[11px] font-sans font-bold uppercase tracking-widest"
                >
                  <BsStars className="text-xs text-champagne" />
                  {slide.badge}
                </motion.div>

                {/* Subtitle */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.35em] text-champagne uppercase"
                >
                  {slide.subtitle}
                </motion.span>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
                >
                  {slide.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base font-sans text-white/80 leading-relaxed font-light"
                >
                  {slide.description}
                </motion.p>

                {/* Call to Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="pt-2"
                >
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-3 bg-blush text-ebony hover:bg-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-floating transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                  >
                    Explore Collection
                    <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
