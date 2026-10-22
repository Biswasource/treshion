import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Header = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsNavOpen,
    showToast
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-xs border-b border-gray-100 py-2.5 sm:py-3' : 'py-3 sm:py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">

          {/* Left: Mobile/Desktop Navigation Hamburger Menu */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setIsNavOpen(true)}
              aria-label="Open menu"
              className="p-1.5 -ml-1 text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9]" />
            </button>
          </div>

          {/* Center: TRESHION Brand Logo - perfectly centered and responsive */}
          <div className="absolute inset-x-0 mx-auto text-center pointer-events-none flex items-center justify-center">
            <a
              href="#"
              className="inline-block pointer-events-auto font-heading font-black text-xl sm:text-2xl lg:text-3xl tracking-[0.18em] sm:tracking-[0.24em] text-red-600 hover:text-red-700 transition-colors select-none py-0.5"
            >
              TRESHION
            </a>
          </div>

          {/* Right Action Icons: Search, Bag, Wishlist, User */}
          <div className="flex items-center gap-2 sm:gap-5 z-10">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-1.5 text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>

            {/* Shopping Bag Icon with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="p-1.5 relative text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-fade-in shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Heart / Wishlist Icon with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="p-1.5 relative text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-fade-in shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Profile Icon */}
            <button
              onClick={() => showToast('Login & Profile feature coming soon')}
              aria-label="Account"
              className="hidden sm:block p-1.5 text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
