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
  breakpoints,
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
  
  const [currentProps, setCurrentProps] = useState({
    beamCount,
    gridWidth,
    gridHeight,
    columns,
    rows,
  });
  
  // Handle responsive breakpoints
  useEffect(() => {
    if (!breakpoints) return;
    
    const handleResize = () => {
      const width = window.innerWidth;
      let newProps = {
        beamCount,
        gridWidth,
        gridHeight,
        columns,
        rows,
      };
      
      if (width >= 1280 && breakpoints.xl) {
        newProps = { ...newProps, ...breakpoints.xl };
      } else if (width >= 1024 && breakpoints.lg) {
        newProps = { ...newProps, ...breakpoints.lg };
      } else if (width >= 768 && breakpoints.md) {
        newProps = { ...newProps, ...breakpoints.md };
      } else if (width >= 640 && breakpoints.sm) {
        newProps = { ...newProps, ...breakpoints.sm };
      }
      
      setCurrentProps(newProps);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints, beamCount, gridWidth, gridHeight, columns, rows]);
  
  const cellWidth = currentProps.gridWidth / currentProps.columns;
  const cellHeight = currentProps.gridHeight / currentProps.rows;
  
  // Initialize the beams
  useEffect(() => {
    const initialBeams = Array.from({ length: currentProps.beamCount }).map((_, idx) => {
      // Randomly decide if it's a horizontal or vertical beam
      const isHorizontal = Math.random() > 0.5;
      const beamType = isHorizontal ? "horizontal" as const : "vertical" as const;
      
      return {
        id: idx,
        type: beamType,
        position: isHorizontal 
          ? Math.floor(Math.random() * currentProps.rows) * cellHeight 
          : Math.floor(Math.random() * currentProps.columns) * cellWidth,
        delay: Math.random() * 6,
        speed: 0.6 + Math.random() * 0.8,
        opacity: 0.1 + Math.random() * 0.3,
        width: 2 + Math.random() * 4,
      };
    });
    
    setBeams(initialBeams);
  }, [currentProps, cellWidth, cellHeight]);

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
            x: [0, currentProps.gridWidth],
            opacity: beam.opacity
          } : {
            y: [0, currentProps.gridHeight],
            opacity: beam.opacity
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: beamDuration / beam.speed,
              ease: "linear",
              delay: beam.delay,
              repeatDelay: Math.random() * 4
            },
            y: {
              repeat: Infinity,
              duration: beamDuration / beam.speed,
              ease: "linear",
              delay: beam.delay,
              repeatDelay: Math.random() * 4
            },
            opacity: {
              duration: 1.2,
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
