import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';

const TRENDING_KEYWORDS = [
  'Baggy Jeans',
  'Linen Shirts',
  'Korean Trousers',
  'Cargo Pants',
  'Oversized T-Shirts',
  'Half-Zip Sweaters',
];

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-8 sm:pt-16 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-white w-full max-w-3xl rounded-none shadow-2xl overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for shirts, baggy jeans, cargos, trousers..."
                className="w-full text-base sm:text-lg outline-none font-medium placeholder:text-gray-400 text-black tracking-wide"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-black ml-2 px-2 py-1"
              >
                ESC
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
              {!query.trim() ? (
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
                    POPULAR SEARCHES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_KEYWORDS.map((tag) => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 border border-gray-200 text-xs font-medium text-gray-700 hover:border-black hover:text-black transition-colors rounded-none"
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                      {searchResults.length} PRODUCTS FOUND
                    </span>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-gray-500">
                        No products matching "<strong className="text-black">{query}</strong>"
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {searchResults.map((product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{ y: -4 }}
                          onClick={() => setIsSearchOpen(false)}
                          className="group cursor-pointer flex flex-col"
                        >
                          <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative mb-2">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="text-xs font-medium text-gray-800 line-clamp-1 group-hover:text-[#d95338]">
                            {product.title}
                          </h4>
                          <span className="text-xs font-bold text-black mt-1">
                            ₹{product.price}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
