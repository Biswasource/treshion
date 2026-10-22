import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, Heart, User, X } from 'lucide-react';
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
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${isScrolled ? 'shadow-sm border-b border-gray-100 py-3' : 'py-3.5 sm:py-4 border-b border-gray-100'
        }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Left: Mobile/Desktop Navigation Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsNavOpen(true)}
              aria-label="Open menu"
              className="p-1 -ml-1 text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>
          </div>

          {/* Center: TRESHION Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <a
              href="#"
              className="inline-block font-heading font-black text-2xl sm:text-3xl tracking-[0.24em] text-red-600 hover:text-red-700 transition-colors select-none"
            >
              TRESHION
            </a>
          </div>

          {/* Right Action Icons: Search, Bag, Wishlist, User */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Search className="w-5 h-5 sm:w-5 sm:h-5 stroke-[1.7]" />
            </button>

            {/* Shopping Bag Icon with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="relative text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5 stroke-[1.7]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Heart / Wishlist Icon with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Heart className="w-5 h-5 sm:w-5 sm:h-5 stroke-[1.7]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Profile Icon */}
            <button
              onClick={() => showToast('Login & Profile feature coming soon')}
              aria-label="Account"
              className="hidden sm:block text-red-600 hover:text-red-700 transition-colors focus:outline-none"
            >
              <User className="w-5 h-5 sm:w-5 sm:h-5 stroke-[1.7]" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
