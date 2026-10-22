import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const FREE_SHIPPING_THRESHOLD = 999;

const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    showToast,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'FLAT10' || code === 'TRESHION10' || code === 'SNITCH10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      showToast('Coupon applied! You saved 10%');
    } else if (code === 'TRESHION200' || code === 'SNITCH200') {
      setAppliedDiscount(200);
      showToast('₹200 discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try FLAT10');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const shippingPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
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
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="font-heading font-black text-sm sm:text-base tracking-[0.14em] uppercase text-[#121212]">
                    SHOPPING BAG ({cart.reduce((a, c) => a + c.quantity, 0)})
                  </h3>
                </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#fcf8f7] p-3 px-5 border-b border-orange-100">
            {amountNeededForFreeShipping === 0 ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-green-700">
                <Check className="w-4 h-4" />
                <span>You've unlocked FREE EXPRESS SHIPPING! 🎉</span>
              </div>
            ) : (
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-700 uppercase">
                  Add <span className="text-[#d95338] font-bold">₹{amountNeededForFreeShipping}</span> more to get <span className="font-bold text-black">FREE SHIPPING</span>
                </p>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#d95338] rounded-full transition-all duration-500"
                    style={{ width: `${shippingPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-gray-800">
                  Your bag is empty
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="py-4 flex gap-3.5 first:pt-0">
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
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          aria-label="Remove item"
                          className="text-gray-400 hover:text-[#d95338] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-2">
                        <span>Size: <strong className="text-black">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-black">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold text-xs text-[#111111]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="COUPON CODE (e.g. FLAT10)"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase tracking-wider bg-white border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800"
                >
                  APPLY
                </button>
              </form>
              {couponError && <p className="text-[10px] text-red-600 font-medium">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">₹{cartSubtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-black font-medium">
                    {amountNeededForFreeShipping === 0 ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-gray-200">
                  <span className="uppercase tracking-wider font-heading">TOTAL</span>
                  <span>₹{finalTotal + (amountNeededForFreeShipping === 0 ? 0 : 99)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => showToast('Proceeding to Secure Checkout...')}
                className="w-full bg-[#121212] text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  )}
</AnimatePresence>
  );
};

export default CartDrawer;
