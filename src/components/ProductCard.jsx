import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (size) => {
    addToCart(product, size, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setShowSizePicker(false);
    }, 400);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] bg-[#f7f7f7] overflow-hidden select-none">
        
        {/* Main & Hover Images */}
        <img
          src={product.image}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
            isHovered && product.hoverImage ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.title} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ease-in-out transform ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Tag Badge (e.g. BESTSELLER, NEW, HOT) */}
        {product.tag && (
          <div className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-sm text-[#121212] text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 shadow-xs">
            {product.tag}
          </div>
        )}

        {/* Heart / Wishlist Button (top-right corner with tap bounce animation) */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-black transition-colors focus:outline-none shadow-xs"
        >
          <Heart 
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited 
                ? 'fill-red-600 text-red-600 scale-110' 
                : 'stroke-[1.6] group-hover:scale-105'
            }`} 
          />
        </motion.button>

        {/* Quick Size Selector Flyout with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {showSizePicker && (
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-3 z-30 border-t border-gray-100 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
                  Select Size:
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSizePicker(false);
                  }}
                  className="text-[10px] text-gray-400 hover:text-black font-semibold p-1"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05, backgroundColor: '#000000', color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(size);
                    }}
                    className="py-1.5 text-[11px] font-semibold border border-gray-300 transition-colors rounded-sm text-center"
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Product Details matching Screenshot 4 */}
      <div className="pt-2.5 pb-1 flex flex-col flex-1">
        
        {/* Title */}
        <h4 className="text-[12px] sm:text-[13px] text-[#222222] font-normal leading-snug line-clamp-1 hover:text-black transition-colors cursor-pointer">
          {product.title}
        </h4>

        {/* Price Line + Quick Add '+' button */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs sm:text-[13px] text-[#111111]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick Add '+' Button with Framer Motion hover & tap */}
          <motion.button
            whileHover={{ scale: 1.3, rotate: 90 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowSizePicker((prev) => !prev);
            }}
            aria-label="Quick add size"
            className="text-gray-700 hover:text-black p-1 focus:outline-none transition-colors"
          >
            {addedAnimation ? (
              <Check className="w-3.5 h-3.5 text-green-600 stroke-[2.5]" />
            ) : (
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            )}
          </motion.button>
        </div>

        {/* Color Swatches below Price line (from Screenshot 4) */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            {product.colors.map((c) => (
              <motion.button
                key={c.name}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c.name);
                }}
                title={c.name}
                aria-label={`Color ${c.name}`}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-none transition-all ${
                  selectedColor === c.name 
                    ? 'ring-1 ring-black ring-offset-1 scale-110' 
                    : 'border border-gray-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.badgeExtra && (
              <span className="text-[9px] text-gray-500 font-medium ml-0.5">
                {product.badgeExtra}
              </span>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ProductCard;
