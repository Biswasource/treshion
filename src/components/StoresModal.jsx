import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORES } from '../data/mockData';

const StoresModal = () => {
  const { isStoresOpen, setIsStoresOpen } = useShop();

  return (
    <AnimatePresence>
      {isStoresOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsStoresOpen(false)}
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#d95338]" />
                <h3 className="font-heading font-black text-sm sm:text-base tracking-[0.14em] uppercase text-[#121212]">
                  FIND A TRESHION STORE ({STORES.length} LOCATIONS)
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsStoresOpen(false)}
                aria-label="Close modal"
                className="p-1 text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Stores list */}
            <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto divide-y divide-gray-100">
              {STORES.map((store, index) => (
                <motion.div 
                  key={store.city} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-heading font-bold text-sm tracking-wide text-black uppercase">
                      {store.city} Flagship Store
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 max-w-md">
                      {store.address}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {store.timing}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {store.phone}
                      </span>
                    </div>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://maps.google.com/?q=${encodeURIComponent('Treshion Store ' + store.city)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-black text-[11px] font-bold tracking-wider uppercase hover:bg-black hover:text-white transition-colors self-start sm:self-center"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>DIRECTIONS</span>
                  </motion.a>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StoresModal;
