import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ShopProvider, useShop } from './context/ShopContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ShopByCategory from './components/ShopByCategory';
import { PromoBanner1, PromoBanner2 } from './components/PromoBanner';
import EditorialShowcase from './components/EditorialShowcase';
import TrendingSection from './components/TrendingSection';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import NavDrawer from './components/NavDrawer';
import StoresModal from './components/StoresModal';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';

function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isCartOpen, isWishlistOpen, isNavOpen, isSearchOpen, isStoresOpen } = useShop();
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animFrameId);
      lenis.destroy();
    };
  }, []);

  // Pause background smooth scroll when any overlay or drawer is open
  useEffect(() => {
    const isAnyModalOpen = isCartOpen || isWishlistOpen || isNavOpen || isSearchOpen || isStoresOpen;
    if (lenisRef.current) {
      if (isAnyModalOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isCartOpen, isWishlistOpen, isNavOpen, isSearchOpen, isStoresOpen]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Top Offer Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Header */}
      <Header />

      {/* 3. Hero Carousel Banner ("CELEBRATION STARTS WITH YOU") */}
      <HeroSlider />

      {/* 4. "SHOP BY CATEGORY" Section with cutout icons & terracotta underline */}
      <ShopByCategory onSelectCategory={handleCategorySelect} />

      {/* 5. "LAST FEW BESTSELLERS LEFT" | "UP TO 30% OFF" Banner */}
      <PromoBanner1 />

      {/* 6. Editorial 3-Column Split ("LINEN SHIRTS", "FORMAL SHIRTS", "HAND EMBROIDERED") */}
      <EditorialShowcase />

      {/* 7. "NEVER BEFORE PRICES" Promo Banner */}
      <PromoBanner2 />

      {/* 8. "TRENDING" Product Grid (5 columns on desktop, tabs, quick add size picker, swatches) */}
      <TrendingSection selectedCategoryFromBanner={selectedCategory} />

      {/* 9. Brand Footer */}
      <Footer />

      {/* Interactive Modals and Flyouts */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <NavDrawer />
      <StoresModal />

      {/* Floating Store & Back to Top Buttons */}
      <FloatingButtons />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

export default App;
