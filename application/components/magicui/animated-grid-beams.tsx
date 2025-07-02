"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedGridBeamsProps {
  className?: string;
  beamColor?: string;
  beamCount?: number;
  gridWidth?: number;
  gridHeight?: number;
  columns?: number;
  rows?: number;
  beamDuration?: number;
  breakpoints?: {
    sm?: Partial<Omit<AnimatedGridBeamsProps, 'className' | 'breakpoints'>>;
    md?: Partial<Omit<AnimatedGridBeamsProps, 'className' | 'breakpoints'>>;
    lg?: Partial<Omit<AnimatedGridBeamsProps, 'className' | 'breakpoints'>>;
    xl?: Partial<Omit<AnimatedGridBeamsProps, 'className' | 'breakpoints'>>;
  };
}

export function AnimatedGridBeams({
  className,
  beamColor = "#ffdab9",
  beamCount = 5,
  gridWidth = 2800,
  gridHeight = 1920,
  columns = 10,
  rows = 12,
  beamDuration = 8,
}: AnimatedGridBeamsProps) {
  const [beams, setBeams] = useState<Array<{
    id: number;
    type: "horizontal" | "vertical";
    position: number;
    delay: number;
    speed: number;
    opacity: number;
    width: number;
  }>>([]);
  
  const cellWidth = gridWidth / columns;
  const cellHeight = gridHeight / rows;
  
  // Initialiser les beams
  useEffect(() => {
    const initialBeams = Array.from({ length: beamCount }).map((_, idx) => {
      // Décider aléatoirement si c'est un beam horizontal ou vertical
      const isHorizontal = Math.random() > 0.5;
      const beamType = isHorizontal ? "horizontal" as const : "vertical" as const;
      
      return {
        id: idx,
        type: beamType,
        position: isHorizontal 
          ? Math.floor(Math.random() * rows) * cellHeight 
          : Math.floor(Math.random() * columns) * cellWidth,
        delay: Math.random() * 6, // Augmenté de 3 à 6
        speed: 0.6 + Math.random() * 0.8, // Vitesse réduite
        opacity: 0.1 + Math.random() * 0.3, // Opacité légèrement réduite
        width: 2 + Math.random() * 4, // Largeur légèrement réduite
      };
    });
    
    setBeams(initialBeams);
  }, [beamCount, cellWidth, cellHeight, columns, rows]);
  
  // Animation pour le mouvement fluide
  const animation = {
    horizontal: {
      x: [0, gridWidth],
      transition: {
        repeat: Infinity,
        duration: beamDuration,
        ease: "linear",
      }
    },
    vertical: {
      y: [0, gridHeight],
      transition: {
        repeat: Infinity,
        duration: beamDuration,
        ease: "linear",
      }
    }
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          initial={{ 
            x: beam.type === "horizontal" ? -100 : beam.position, 
            y: beam.type === "vertical" ? -100 : beam.position,
            opacity: 0
          }}
          animate={beam.type === "horizontal" ? {
            x: [0, gridWidth],
            opacity: beam.opacity
          } : {
            y: [0, gridHeight],
            opacity: beam.opacity
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: beamDuration / beam.speed,
              ease: "linear",
              delay: beam.delay,
              repeatDelay: Math.random() * 4 // Ajouter un délai entre les répétitions
            },
            y: {
              repeat: Infinity,
              duration: beamDuration / beam.speed,
              ease: "linear",
              delay: beam.delay,
              repeatDelay: Math.random() * 4 // Ajouter un délai entre les répétitions
            },
            opacity: {
              duration: 1.2, // Plus lent pour les transitions d'opacité
              delay: beam.delay
            }
          }}
          className="absolute"
          style={{
            width: beam.type === "horizontal" ? "100%" : `${beam.width}px`,
            height: beam.type === "vertical" ? "100%" : `${beam.width}px`,
            top: beam.type === "horizontal" ? beam.position : 0,
            left: beam.type === "vertical" ? beam.position : 0,
            background: beam.type === "horizontal" 
              ? `linear-gradient(90deg, transparent, ${beamColor}, transparent)`
              : `linear-gradient(180deg, transparent, ${beamColor}, transparent)`,
            boxShadow: `0 0 10px ${beamColor}, 0 0 20px ${beamColor}`
          }}
        />
      ))}
    </div>
  );
}
