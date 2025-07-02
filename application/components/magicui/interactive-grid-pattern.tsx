"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: number[]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 240,
  height = 120,
  squares = [12, 16],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  // Use the first two elements of the squares array or default to 12, 16
  const horizontal = squares[0] || 12;
  const vertical = squares[1] || 16;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [adjacentSquares, setAdjacentSquares] = useState<number[]>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredSquare(index);
    // Calculer les carrés adjacents
    const row = Math.floor(index / horizontal);
    const col = index % horizontal;
    
    // Définir les adjacents (haut, droite, bas, gauche, diagonales, et deux niveaux)
    const adjacent: number[] = [];
    
    // Niveau 1 (adjacents directs)
    // Carré au-dessus
    if (row > 0) adjacent.push(index - horizontal);
    // Carré à droite
    if (col < horizontal - 1) adjacent.push(index + 1);
    // Carré en-dessous
    if (row < vertical - 1) adjacent.push(index + horizontal);
    // Carré à gauche
    if (col > 0) adjacent.push(index - 1);
    
    // Diagonales
    if (row > 0 && col > 0) adjacent.push(index - horizontal - 1); // haut-gauche
    if (row > 0 && col < horizontal - 1) adjacent.push(index - horizontal + 1); // haut-droite
    if (row < vertical - 1 && col > 0) adjacent.push(index + horizontal - 1); // bas-gauche
    if (row < vertical - 1 && col < horizontal - 1) adjacent.push(index + horizontal + 1); // bas-droite
    
    // Niveau 2 (un carré plus loin)
    if (row > 1) adjacent.push(index - horizontal * 2); // deux cases au-dessus
    if (col < horizontal - 2) adjacent.push(index + 2); // deux cases à droite
    if (row < vertical - 2) adjacent.push(index + horizontal * 2); // deux cases en-dessous
    if (col > 1) adjacent.push(index - 2); // deux cases à gauche
    
    setAdjacentSquares(adjacent);
  };

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    >
      {/* Points d'intersection avec cercles plus visibles aux coins */}
      {Array.from({ length: (horizontal + 1) * (vertical + 1) }).map((_, idx) => {
        const col = idx % (horizontal + 1);
        const row = Math.floor(idx / (horizontal + 1));
        
        // Détermine si c'est un coin extérieur
        const isCorner = (
          (col === 0 || col === horizontal) && 
          (row === 0 || row === vertical)
        );
        
        // Détermine si c'est un point sur le bord
        const isEdge = (
          col === 0 || col === horizontal || 
          row === 0 || row === vertical
        );
        
        // Seulement afficher les coins et les bords, pas les points intérieurs
        if (isCorner || isEdge) {
          return (
            <circle
              key={`point-${idx}`}
              cx={col * width}
              cy={row * height}
              r={isCorner ? 4 : 2}
              className={cn(
                isCorner 
                  ? "fill-white/60" 
                  : "fill-white/30"
              )}
            />
          );
        }
        
        return null;
      })}
      
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        
        // Extraire les coordonnées de ligne et de colonne
        const col = index % horizontal;
        const row = Math.floor(index / horizontal);
        
        // Calculer la position pour déterminer l'effet de distance
        
        // Si un carré est survolé, calculons la distance pour un effet de propagation
        let distanceEffect = "fill-transparent";
        let strokeEffect = "stroke-white/5";
        
        if (hoveredSquare !== null) {
          const hoveredRow = Math.floor(hoveredSquare / horizontal);
          const hoveredCol = hoveredSquare % horizontal;
          
          // Calculer la distance Manhattan
          const distance = Math.abs(hoveredRow - row) + Math.abs(hoveredCol - col);
          
          if (distance === 0) {
            // Carré survolé
            distanceEffect = "fill-white/15";
            strokeEffect = "stroke-white/40";
          } else if (distance === 1) {
            // Carré adjacent direct
            distanceEffect = "fill-white/10";
            strokeEffect = "stroke-white/30";
          } else if (distance === 2) {
            // Deux carrés de distance
            distanceEffect = "fill-white/5";
            strokeEffect = "stroke-white/15";
          } else if (distance <= 3) {
            // Trois carrés de distance
            distanceEffect = "fill-white/2";
            strokeEffect = "stroke-white/8";
          }
        }
        
        // Calculer si le rectangle est sur un bord
        const isOnEdge = 
          row === 0 || row === vertical - 1 || 
          col === 0 || col === horizontal - 1;
        
        // Appliquer des styles différents pour les rectangles sur les bords
        const edgeStyles = isOnEdge ? "stroke-white/10" : "";
        
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "transition-all duration-300 ease-in-out [&:not(:hover)]:duration-1000",
              distanceEffect,
              strokeEffect,
              edgeStyles,
              squaresClassName,
            )}
            strokeWidth={1}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => {
              setHoveredSquare(null);
              setAdjacentSquares([]);
            }}
          />
        );
      })}
      
      {/* Cercles aux coins de chaque cellule */}
      {Array.from({ length: (horizontal + 1) * (vertical + 1) }).map((_, idx) => {
        const col = idx % (horizontal + 1);
        const row = Math.floor(idx / (horizontal + 1));
        
        // Position x,y
        const x = col * width;
        const y = row * height;
        
        // Détermine si c'est un coin intérieur (pas sur les bords extérieurs)
        const isInnerCorner = (
          col > 0 && col < horizontal && 
          row > 0 && row < vertical
        );
        
        // Ne dessiner que les coins intérieurs
        if (isInnerCorner) {
          // Déterminer si un carré adjacent est survolé
          let isActive = false;
          
          // Vérifier les 4 carrés adjacents au point
          const topLeftIdx = (row - 1) * horizontal + (col - 1);
          const topRightIdx = (row - 1) * horizontal + col;
          const bottomLeftIdx = row * horizontal + (col - 1);
          const bottomRightIdx = row * horizontal + col;
          
          if (
            hoveredSquare === topLeftIdx || 
            hoveredSquare === topRightIdx || 
            hoveredSquare === bottomLeftIdx || 
            hoveredSquare === bottomRightIdx ||
            adjacentSquares.includes(topLeftIdx) || 
            adjacentSquares.includes(topRightIdx) || 
            adjacentSquares.includes(bottomLeftIdx) || 
            adjacentSquares.includes(bottomRightIdx)
          ) {
            isActive = true;
          }
          
          return (
            <circle
              key={`corner-${idx}`}
              cx={x}
              cy={y}
              r={isActive ? 3 : 2}
              className={`fill-white/${isActive ? '40' : '15'} transition-all duration-300`}
            />
          );
        }
        
        return null;
      })}
    </svg>
  );
}
