import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('treshion_cart') || localStorage.getItem('snitch_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('treshion_wishlist') || localStorage.getItem('snitch_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('treshion_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('treshion_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, size = 'M', color = null) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === (color || product.colors?.[0]?.name)
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === (color || product.colors?.[0]?.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          size,
          color: color || (product.colors?.[0]?.name ?? 'Default'),
          quantity: 1,
        },
      ];
    });
    showToast(`Added ${product.title} (${size}) to Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)));
  };

  const updateQuantity = (id, size, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isNavOpen,
        setIsNavOpen,
        isStoresOpen,
        setIsStoresOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        showToast,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white px-5 py-2.5 rounded-full text-xs font-medium tracking-wide shadow-2xl flex items-center gap-2 animate-slide-up border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#d95338]"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
