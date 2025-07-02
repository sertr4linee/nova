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
}

export function DataFlowParticles({
  className,
  particleColor = "#ffdab9",
  particleCount = 25,
  columns = 10,
  rows = 12,
  gridWidth = 2800,
  gridHeight = 1920,
}: DataFlowParticlesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    path: { x: number; y: number }[];
    duration: number;
    delay: number;
    size: number;
    opacity: number;
  }>>([]);

  const cellWidth = gridWidth / columns;
  const cellHeight = gridHeight / rows;

  // Génère un chemin suivant les lignes de la grille
  const generateGridPath = () => {
    const path: { x: number; y: number }[] = [];
    
    // Point de départ aléatoire sur la grille
    let currentX = Math.floor(Math.random() * (columns + 1)) * cellWidth;
    let currentY = Math.floor(Math.random() * (rows + 1)) * cellHeight;
    
    path.push({ x: currentX, y: currentY });
    
    // Générer un chemin avec 3-7 segments
    const segments = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < segments; i++) {
      // Déterminer si on se déplace horizontalement ou verticalement
      const moveHorizontal = Math.random() > 0.5;
      
      if (moveHorizontal) {
        // Choisir une nouvelle colonne aléatoire
        const newX = Math.floor(Math.random() * (columns + 1)) * cellWidth;
        path.push({ x: newX, y: currentY });
        currentX = newX;
      } else {
        // Choisir une nouvelle ligne aléatoire
        const newY = Math.floor(Math.random() * (rows + 1)) * cellHeight;
        path.push({ x: currentX, y: newY });
        currentY = newY;
      }
    }
    
    return path;
  };

  // Initialiser les particules
  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }).map((_, idx) => {
      return {
        id: idx,
        path: generateGridPath(),
        duration: 10 + Math.random() * 15, // Durée plus longue pour un mouvement plus lent
        delay: Math.random() * 8, // Délai avant de commencer
        size: 2 + Math.random() * 4, // Taille variable
        opacity: 0.3 + Math.random() * 0.5 // Opacité variable
      };
    });
    
    setParticles(initialParticles);
    
    // Régénérer périodiquement certaines particules pour maintenir l'animation fraîche
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        // Régénérer ~15% des particules (réduit de 20%)
        const updatedParticles = [...prevParticles];
        const numToUpdate = Math.max(1, Math.floor(particleCount * 0.15));
        
        for (let i = 0; i < numToUpdate; i++) {
          const randomIdx = Math.floor(Math.random() * particleCount);
          updatedParticles[randomIdx] = {
            ...updatedParticles[randomIdx],
            path: generateGridPath(),
            delay: Math.random() * 4 // Délai plus long
          };
        }
        
        return updatedParticles;
      });
    }, 20000); // Toutes les 20 secondes (augmenté de 10 secondes)
    
    return () => clearInterval(interval);
  }, [particleCount, columns, rows, cellWidth, cellHeight]);

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
