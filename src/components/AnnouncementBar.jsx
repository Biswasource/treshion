import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OFFERS = [
  "FLAT 10% OFF ON ORDERS ABOVE ₹2499 | USE CODE: FLAT10",
  "FREE EXPRESS SHIPPING ON ALL PREPAID ORDERS ACROSS INDIA",
  "EASY 7-DAY RETURNS & FREE SIZE EXCHANGES",
  "DOWNLOAD THE TRESHION APP & GET ₹250 CASHBACK",
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? OFFERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  };

  return (
    <div className="bg-[#121212] text-white text-[11px] sm:text-xs py-2 px-3 tracking-widest uppercase font-medium flex items-center justify-between relative overflow-hidden transition-all duration-300">
      <button 
        onClick={handlePrev} 
        aria-label="Previous announcement"
        className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      <div className="text-center truncate px-2 transition-all duration-500 font-sans tracking-[0.14em] transform">
        {OFFERS[currentIndex]}
      </div>

      <button 
        onClick={handleNext} 
        aria-label="Next announcement"
        className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
