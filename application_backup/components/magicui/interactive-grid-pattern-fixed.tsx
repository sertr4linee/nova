"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with static squares.
 * Optimized to not interfere with scroll functionality.
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

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full pointer-events-none",
        className,
      )}
      style={{ pointerEvents: 'none' }}
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
              style={{ pointerEvents: 'none' }}
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
        
        // Effet de grille statique sans interaction
        const distanceEffect = "fill-transparent";
        const strokeEffect = "stroke-white/5";
        
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
              "transition-all duration-300 ease-in-out",
              distanceEffect,
              strokeEffect,
              edgeStyles,
              squaresClassName,
            )}
            strokeWidth={1}
            style={{ pointerEvents: 'none' }}
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
          return (
            <circle
              key={`corner-${idx}`}
              cx={x}
              cy={y}
              r={2}
              className="fill-white/15 transition-all duration-300"
              style={{ pointerEvents: 'none' }}
            />
          );
        }
        
        return null;
      })}
    </svg>
  );
}
