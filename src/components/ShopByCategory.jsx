import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_PILLS, CATEGORY_CUTOUTS } from '../data/mockData';

const ShopByCategory = ({ onSelectCategory }) => {
  const [activePill, setActivePill] = useState('shirts');

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading font-light text-base sm:text-lg tracking-[0.14em] text-[#333333] uppercase"
            >
              SHOP BY
            </motion.span>
            <div className="relative inline-block w-fit">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-[#111111] uppercase">
                CATEGORY
              </h2>
              {/* Animated Terracotta Accent Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="h-[3px] w-full bg-[#d95338] mt-1.5 rounded-full"
              />
            </div>
          </div>

          {/* Category Quick Links / Pills */}
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar pt-6 pb-2 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-gray-700">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = activePill === pill.id;
              return (
                <motion.button
                  key={pill.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActivePill(pill.id);
                    if (onSelectCategory) onSelectCategory(pill.label);
                  }}
                  className={`flex-shrink-0 flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                    isActive 
                      ? 'border-[#121212] text-[#121212]' 
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  <span>{pill.label}</span>
                  {pill.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 border border-[#d95338] text-[#d95338] rounded-sm tracking-tighter">
                      {pill.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 5-Column Apparel Cutouts Row with Framer Motion Staggered Hover & Scroll Reveal */}
        <div className="flex overflow-x-auto no-scrollbar gap-4 sm:grid sm:grid-cols-5 sm:gap-8 pt-4 pb-2 snap-x">
          {CATEGORY_CUTOUTS.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(cat.name);
                const el = document.getElementById('trending');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-shrink-0 w-[130px] sm:w-auto flex flex-col items-center group cursor-pointer snap-start"
            >
              <h3 className="font-heading font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-center text-[#111111] mb-2 sm:mb-4 group-hover:text-[#d95338] transition-colors">
                {cat.name}
              </h3>

              {/* Floating cutout container with smooth hover lift & physics bounce */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="w-full aspect-square max-w-[200px] flex items-center justify-center p-2 rounded-lg"
              >
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-2xl transition-all duration-300"
                  loading="lazy"
                />
              </motion.div>

              <span className="text-[11px] text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {cat.itemCount}
              </span>
            </motion.div>
          ))}
        </div>

        {/* SHOP ALL Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:text-left"
        >
          <a
            href="#trending"
            className="inline-block font-sans font-medium text-xs sm:text-sm tracking-[0.18em] uppercase underline underline-offset-4 text-[#121212] hover:text-[#d95338] transition-colors"
          >
            SHOP ALL
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ShopByCategory;
