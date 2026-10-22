import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRENDING_TABS, PRODUCTS } from '../data/mockData';
import ProductCard from './ProductCard';

const TrendingSection = ({ selectedCategoryFromBanner }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  React.useEffect(() => {
    if (selectedCategoryFromBanner) {
      const match = TRENDING_TABS.find(
        (t) => t.toLowerCase() === selectedCategoryFromBanner.toLowerCase()
      );
      if (match) setActiveTab(match);
    }
  }, [selectedCategoryFromBanner]);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'ALL') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab]);

  return (
    <section id="trending" className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-[0.05em] uppercase text-[#111111]">
            TRENDING
          </h2>

          {/* Filter Tabs Bar with Framer Motion Gliding Active Underline */}
          <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 mt-4 pb-2">
            {TRENDING_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase transition-colors pb-2 relative ${
                    isActive ? 'text-[#121212]' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabUnderline"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#121212]" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 5-Column Grid with Framer Motion Layout Transitions */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2.5 sm:gap-x-3.5 gap-y-7 sm:gap-y-9"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Load More / Explore Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: '#121212', color: '#ffffff' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('ALL')}
            className="inline-flex items-center justify-center font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-3.5 border border-[#121212] bg-white text-[#121212] transition-colors shadow-sm"
          >
            VIEW ALL PRODUCTS ({PRODUCTS.length})
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default TrendingSection;
