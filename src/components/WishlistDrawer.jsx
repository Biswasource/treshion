import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const WishlistDrawer = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsWishlistOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto"
            >
              
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-red-600 text-red-600" />
                  <h3 className="font-heading font-black text-sm sm:text-base tracking-[0.14em] uppercase text-[#121212]">
                    MY WISHLIST ({wishlist.length})
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlistOpen(false)}
                  aria-label="Close wishlist"
                  className="p-1 text-gray-500 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-gray-800">
                      Your wishlist is empty
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                      Tap the heart icon on any product to save your favorite fits here.
                    </p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3.5 first:pt-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-24 object-cover object-top bg-gray-50 rounded-xs flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(item)}
                              aria-label="Remove item"
                              className="text-gray-400 hover:text-[#d95338] p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-semibold text-xs text-[#111111] mt-1 block">
                            ₹{item.price}
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            addToCart(item, item.sizes?.[0] || 'M');
                            toggleWishlist(item);
                          }}
                          className="mt-3 w-full py-2 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>MOVE TO BAG</span>
                        </motion.button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
