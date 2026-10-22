import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const FloatingButtons = () => {
  const { setIsStoresOpen } = useShop();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none pointer-events-none">
      
      {/* Back to Top Button with Framer Motion Spring Pop */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 bg-[#d95338] text-white flex items-center justify-center shadow-lg hover:bg-[#b83f27] focus:outline-none pointer-events-auto"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Stores Button with Framer Motion hover float */}
      <motion.button
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => setIsStoresOpen(true)}
        aria-label="View stores"
        className="bg-white text-gray-800 border border-gray-200/90 shadow-xl px-3.5 py-2.5 rounded-md flex flex-col items-center justify-center hover:shadow-2xl hover:border-black group focus:outline-none pointer-events-auto"
      >
        <Store className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors stroke-[1.8]" />
        <span className="text-[10px] font-bold tracking-wider uppercase mt-1 text-gray-700 group-hover:text-black">
          Stores
        </span>
      </motion.button>

    </div>
  );
};

export default FloatingButtons;
