"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Hero images from public directory
const heroImages = [
  '/images/hero/hero1.png',
  '/images/hero/hero2.png',
  '/images/hero/hero3.png',
  '/images/hero/hero4.png',
  '/images/hero/hero5.png',
  '/images/hero/hero6.png',
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {/* Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentImageIndex]}
            alt="مركز منال الجمال"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl text-center px-4"
        >
          <motion.h1 
            className="hero-heading hero-text-gradient"
            initial={{ backgroundPosition: "0% center" }}
            animate={{ 
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "linear" 
            }}
          >
            مركز منال الجمال
          </motion.h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 elegant-text">
            نقدم أفضل خدمات العناية بالبشرة وإزالة الشعر بأحدث التقنيات العالمية
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/services" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium transition-colors min-w-40 text-center font-ibm"
            >
              خدماتنا
            </Link>
            <Link 
              href="/booking" 
              className="bg-white hover:bg-gray-100 text-pink-600 px-6 py-3 rounded-full font-medium transition-colors min-w-40 text-center font-ibm"
            >
              احجزي موعدك الآن
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 space-x-reverse">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? 'bg-pink-500' : 'bg-white/50'
            } transition-colors`}
            aria-label={`إعرض صورة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 