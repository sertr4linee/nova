"use client";

import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  // Use Framer Motion's scroll event instead of native addEventListener
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const scrollY = latest * document.documentElement.scrollHeight;
    const shouldBeVisible = scrollY > 100;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
    }
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffdab9] via-[#ffdab9] to-[#ffdab9] origin-left z-50"
      style={{ scaleX }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
};

// Composant pour le bouton "Retour en haut"
export const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Use Framer Motion's scroll event instead of native addEventListener
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const scrollY = latest * document.documentElement.scrollHeight;
    const shouldBeVisible = scrollY > 300;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-[#ffdab9] text-black rounded-full shadow-lg hover:bg-[#ffdab9]/80 transition-colors duration-200 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="18,15 12,9 6,15"></polyline>
      </svg>
    </motion.button>
  );
};
