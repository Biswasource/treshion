import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Touch swipe handling for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentSlide]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden select-none group bg-[#111111]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Responsive Aspect Ratio Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[18/9] md:aspect-[21/9] lg:h-[48vw] min-h-[220px] sm:min-h-[380px] max-h-[720px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex items-center"
          >
            {/* Background Banner Image */}
            <motion.img
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5.5, ease: 'easeOut' }}
              src={slide.image}
              alt="Treshion Campaign Banner"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />

            {/* Optional Text Overlay if slide contains text */}
            {slide.title && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent flex items-center">
                <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-12 lg:px-20">
                  <div className="max-w-xl text-left">
                    {slide.subtitle && (
                      <span className="inline-block text-white/80 text-[10px] sm:text-xs tracking-[0.25em] font-medium mb-2 uppercase">
                        {slide.subtitle}
                      </span>
                    )}
                    <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-6xl text-white tracking-[0.06em] leading-[1.1] mb-4 whitespace-pre-line drop-shadow-md">
                      {slide.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Chevrons (Desktop on hover, compact on tablet) */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none items-center justify-center"
      >
        <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none items-center justify-center"
      >
        <ChevronRight className="w-8 h-8 stroke-[1.5]" />
      </motion.button>

      {/* Slider Indicator Dots (Optimized for mobile touch target) */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 p-1">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === i 
                ? 'w-6 sm:w-8 h-1 sm:h-1 bg-white' 
                : 'w-1.5 sm:w-2 h-1 sm:h-1 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
