"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 60
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionOffsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  const initialOffset = directionOffsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...initialOffset
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        ...initialOffset
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant pour les animations de fade-in staggered
export const ScrollRevealStagger = ({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }}
          transition={{
            duration: 0.6,
            delay: initialDelay + (index * staggerDelay),
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// Composant pour les animations de parallax
export const ScrollParallax = ({
  children,
  className = "",
  speed = 0.5
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? `translateY(${speed * 50}px)` : "translateY(0px)"
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
