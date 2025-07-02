"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DataFlowParticlesProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
  columns?: number;
  rows?: number;
  gridWidth?: number;
  gridHeight?: number;
  breakpoints?: {
    sm?: Partial<Omit<DataFlowParticlesProps, 'className' | 'breakpoints'>>;
    md?: Partial<Omit<DataFlowParticlesProps, 'className' | 'breakpoints'>>;
    lg?: Partial<Omit<DataFlowParticlesProps, 'className' | 'breakpoints'>>;
    xl?: Partial<Omit<DataFlowParticlesProps, 'className' | 'breakpoints'>>;
  };
}

export function DataFlowParticles({
  className,
  particleColor = "#ffdab9",
  particleCount = 25,
  columns = 10,
  rows = 12,
  gridWidth = 2800,
  gridHeight = 1920,
  breakpoints,
}: DataFlowParticlesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    path: { x: number; y: number }[];
    duration: number;
    delay: number;
    size: number;
    opacity: number;
  }>>([]);

  const [currentProps, setCurrentProps] = useState({
    particleCount,
    columns,
    rows,
    gridWidth,
    gridHeight,
  });

  // Handle responsive breakpoints
  useEffect(() => {
    if (!breakpoints) return;
    
    const handleResize = () => {
      const width = window.innerWidth;
      let newProps = {
        particleCount,
        columns,
        rows,
        gridWidth,
        gridHeight,
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
  }, [breakpoints, particleCount, columns, rows, gridWidth, gridHeight]);

  const cellWidth = currentProps.gridWidth / currentProps.columns;
  const cellHeight = currentProps.gridHeight / currentProps.rows;

  // Generate a path following grid lines
  const generateGridPath = () => {
    const path: { x: number; y: number }[] = [];
    
    // Random starting point on the grid
    let currentX = Math.floor(Math.random() * (currentProps.columns + 1)) * cellWidth;
    let currentY = Math.floor(Math.random() * (currentProps.rows + 1)) * cellHeight;
    
    path.push({ x: currentX, y: currentY });
    
    // Generate a path with 3-7 segments
    const segments = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < segments; i++) {
      // Determine whether to move horizontally or vertically
      const moveHorizontal = Math.random() > 0.5;
      
      if (moveHorizontal) {
        // Choose a new random column
        const newX = Math.floor(Math.random() * (currentProps.columns + 1)) * cellWidth;
        path.push({ x: newX, y: currentY });
        currentX = newX;
      } else {
        // Choose a new random row
        const newY = Math.floor(Math.random() * (currentProps.rows + 1)) * cellHeight;
        path.push({ x: currentX, y: newY });
        currentY = newY;
      }
    }
    
    return path;
  };

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: currentProps.particleCount }).map((_, idx) => {
      return {
        id: idx,
        path: generateGridPath(),
        duration: 10 + Math.random() * 15, // Longer duration for slower movement
        delay: Math.random() * 8, // Delay before starting
        size: 2 + Math.random() * 4, // Variable size
        opacity: 0.3 + Math.random() * 0.5 // Variable opacity
      };
    });
    
    setParticles(initialParticles);
    
    // Periodically regenerate some particles to keep the animation fresh
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        // Regenerate ~15% of particles
        const updatedParticles = [...prevParticles];
        const numToUpdate = Math.max(1, Math.floor(currentProps.particleCount * 0.15));
        
        for (let i = 0; i < numToUpdate; i++) {
          const randomIdx = Math.floor(Math.random() * currentProps.particleCount);
          updatedParticles[randomIdx] = {
            ...updatedParticles[randomIdx],
            path: generateGridPath(),
            delay: Math.random() * 4 // Longer delay
          };
        }
        
        return updatedParticles;
      });
    }, 20000); // Every 20 seconds
    
    return () => clearInterval(interval);
  }, [currentProps, cellWidth, cellHeight]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particleColor,
            boxShadow: `0 0 5px ${particleColor}`,
            opacity: particle.opacity
          }}
          initial={{ 
            x: particle.path[0].x - particle.size / 2,
            y: particle.path[0].y - particle.size / 2,
            scale: 0
          }}
          animate={{
            x: particle.path.map(point => point.x - particle.size / 2),
            y: particle.path.map(point => point.y - particle.size / 2),
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            times: particle.path.map((_, i) => i / (particle.path.length - 1)),
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
