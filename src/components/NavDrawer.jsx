import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronDown, MapPin, Package, PhoneCall } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { NAV_LINKS } from '../data/mockData';

const NavDrawer = () => {
  const { isNavOpen, setIsNavOpen, setIsStoresOpen } = useShop();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (name) => {
    setExpandedItem((prev) => (prev === name ? null : name));
  };

  return (
    <AnimatePresence>
      {isNavOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsNavOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 max-w-full flex pr-10 pointer-events-none">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-sm bg-white shadow-2xl flex flex-col pointer-events-auto"
            >
              
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                <span className="font-heading font-black text-xl tracking-[0.24em] text-red-600">
                  TRESHION
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsNavOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-red-600 hover:text-red-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Links List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1">
                {NAV_LINKS.map((item, index) => {
                  const isExpanded = expandedItem === item.name;
                  return (
                    <motion.div 
                      key={item.name} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-gray-50 py-1"
                    >
                      <div
                        onClick={() => {
                          if (item.children) {
                            toggleExpand(item.name);
                          } else {
                            setIsNavOpen(false);
                          }
                        }}
                        className="flex items-center justify-between py-2.5 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-[#121212] hover:text-[#d95338] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#d95338] text-white rounded-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {item.children && (
                          <span>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Submenu Dropdown */}
                      {item.children && isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 pb-2 space-y-2 overflow-hidden"
                        >
                          {item.children.map((sub) => (
                            <a
                              key={sub}
                              href="#trending"
                              onClick={() => setIsNavOpen(false)}
                              className="block text-xs font-medium text-gray-600 hover:text-black py-1 tracking-wider"
                            >
                              {sub}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Quick Action links */}
                <div className="pt-6 space-y-3">
                  <button
                    onClick={() => {
                      setIsNavOpen(false);
                      setIsStoresOpen(true);
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold tracking-wider uppercase text-left"
                  >
                    <MapPin className="w-4 h-4 text-[#d95338]" />
                    <span>Find A Treshion Store</span>
                  </button>

                  <a
                    href="#trending"
                    onClick={() => setIsNavOpen(false)}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold tracking-wider uppercase text-left block"
                  >
                    <Package className="w-4 h-4 text-gray-600" />
                    <span>Track Your Order</span>
                  </a>
                </div>
              </div>

              {/* Footer info in menu */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 flex items-center justify-between">
                <span>Currency: <strong>INR (₹)</strong></span>
                <span>Support: +91 80 4965 2400</span>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavDrawer;
