import React from 'react';
import { motion } from 'framer-motion';

export const PromoBanner1 = () => {
  return (
    <section className="w-full bg-[#f4f4f4] overflow-hidden my-4 sm:my-8 group cursor-pointer border-y border-gray-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 relative min-h-[220px] sm:min-h-[300px] lg:min-h-[360px] flex items-center justify-between">
        
        {/* Left Headline with scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 text-left max-w-[35%] py-6"
        >
          <h3 className="font-heading font-black text-xl sm:text-3xl lg:text-5xl text-[#121212] tracking-[0.04em] uppercase leading-[1.08]">
            LAST FEW<br />
            BESTSELLERS<br />
            LEFT
          </h3>
          <span className="inline-block mt-3 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-gray-700 underline underline-offset-4 group-hover:text-[#d95338] transition-colors">
            SHOP NOW
          </span>
        </motion.div>

        {/* Center Model in Blue Shirt */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop"
            alt="Male model in blue shirt"
            className="h-full object-cover object-top max-w-[280px] sm:max-w-[380px] lg:max-w-[450px] transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Right Offer Highlight with scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 text-right max-w-[40%] py-6"
        >
          <h3 className="font-heading font-black text-2xl sm:text-4xl lg:text-6xl text-[#121212] tracking-tight uppercase">
            UP TO 30% OFF
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 tracking-[0.15em] uppercase mt-2">
            LIMITED STOCK • SELLING FAST
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export const PromoBanner2 = () => {
  return (
    <section className="w-full bg-[#e8e9ea] overflow-hidden my-4 sm:my-8 group cursor-pointer border-y border-gray-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 relative min-h-[200px] sm:min-h-[260px] lg:min-h-[320px] flex items-center justify-between">
        
        {/* Model in Green Cap / Shirt */}
        <div className="absolute inset-y-0 left-1/4 -translate-x-1/2 h-full flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop"
            alt="Never before prices model"
            className="h-full object-cover object-top max-w-[240px] sm:max-w-[340px] transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Big Bold Headline with scroll animation */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 ml-auto text-right max-w-[65%] py-6"
        >
          <h3 className="font-heading font-black text-3xl sm:text-5xl lg:text-7xl text-[#121212] tracking-[0.02em] uppercase leading-none">
            NEVER<br />
            BEFORE<br />
            PRICES
          </h3>
          <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#d95338]">
            STARTING AT ₹799
          </p>
        </motion.div>

      </div>
    </section>
  );
};
