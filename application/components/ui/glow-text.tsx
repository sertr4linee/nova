"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowTextProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
  animate?: boolean;
  textColor?: string;
}

export const GlowText = ({
  children,
  className = "",
  glowColor = "#ffdab9",
  intensity = "medium",
  animate = true,
  textColor,
}: GlowTextProps) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  
  // Map intensity to blur values
  const intensityMap = {
    low: {
      inner: "blur-[2px]",
      outer: "blur-[4px]",
      pulse: "blur-[1px]",
    },
    medium: {
      inner: "blur-md",
      outer: "blur-lg",
      pulse: "blur-sm",
    },
    high: {
      inner: "blur-lg",
      outer: "blur-xl",
      pulse: "blur-md",
    },
  };

  const { inner, outer, pulse } = intensityMap[intensity];

  // Animation variants
  const glowVariants = {
    idle: {
      opacity: 0.6,
      scale: 1,
    },
    hover: {
      opacity: 0.8,
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    idle: {
      opacity: [0.4, 0.6, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    hover: {
      opacity: [0.5, 0.7, 0.5],
      scale: [1, 1.08, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.span 
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      style={{ color: textColor || "inherit" }}
    >
      {children}
      
      {/* Inner glow */}
      <motion.span
        className={`absolute -inset-1 ${inner} rounded-lg z-[-1]`}
        style={{ backgroundColor: `${glowColor}20` }}
        variants={glowVariants}
        initial="idle"
        animate={mouseEnter ? "hover" : "idle"}
      ></motion.span>
      
      {/* Outer glow */}
      <motion.span
        className={`absolute -inset-2 ${outer} rounded-lg z-[-2]`}
        style={{ backgroundColor: `${glowColor}10` }}
        variants={glowVariants}
        initial="idle"
        animate={mouseEnter ? "hover" : "idle"}
      ></motion.span>
      
      {/* Animated pulse */}
      {animate && (
        <motion.span
          className={`absolute -inset-0.5 ${pulse} rounded-lg z-[-1]`}
          style={{ backgroundColor: `${glowColor}15` }}
          variants={pulseVariants}
          initial="idle"
          animate={mouseEnter ? "hover" : "idle"}
        ></motion.span>
      )}
    </motion.span>
  );
};
