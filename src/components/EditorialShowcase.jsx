import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EDITORIAL_CARDS } from '../data/mockData';

const EditorialShowcase = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-white relative overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative group/nav">
        
        {/* Navigation Chevrons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('left')}
          aria-label="Previous editorial"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover/nav:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
          aria-label="Next editorial"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover/nav:opacity-100"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </motion.button>

        {/* 3-Card Grid / Scrollable Container */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {EDITORIAL_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden group cursor-pointer bg-neutral-900 shadow-sm hover:shadow-xl transition-shadow"
            >
              {/* Image with slow zoom on hover */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9]"
                loading="lazy"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text Overlay matching Screenshot 3: Left title, Right subtitle */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10 pointer-events-none">
                <div className="max-w-[55%]">
                  <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl tracking-[0.05em] uppercase leading-tight drop-shadow-md">
                    {card.title}
                  </h3>
                </div>
                <div className="max-w-[45%] text-right">
                  <p className="text-[10px] sm:text-xs font-medium tracking-[0.12em] uppercase text-white/90 whitespace-pre-line leading-relaxed drop-shadow-md">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Subtle border outline on hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EditorialShowcase;
