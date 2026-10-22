import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

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
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: '480px', maxHeight: '720px' }}
    >
      <div className="relative h-[52vw] min-h-[460px] max-h-[720px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex items-center"
          >
            {/* Background Image with slow cinematic zoom animation */}
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center "
              loading="eager"
            />


            {/* Content Container with Framer Motion Staggered Text */}
            <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 sm:px-12 lg:px-20">
              <div className="max-w-xl text-left">
                {/* Subtitle */}


                {/* Animated Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.06em] leading-[1.08] mb-6 whitespace-pre-line drop-shadow-md"
                >
                  {slide.title}
                </motion.h1>

                {/* Button CTA */}

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Chevrons */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
      >
        <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
      >
        <ChevronRight className="w-8 h-8 stroke-[1.5]" />
      </motion.button>

      {/* Slider Indicator Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 h-1 rounded-full ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
