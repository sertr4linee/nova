"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GridNodePulsesProps {
  className?: string;
  pulseColor?: string;
  pulseCount?: number;
  columns?: number;
  rows?: number;
  gridWidth?: number;
  gridHeight?: number;
  minSize?: number;
  maxSize?: number;
  connectionProbability?: number;
  breakpoints?: {
    sm?: Partial<Omit<GridNodePulsesProps, 'className' | 'breakpoints'>>;
    md?: Partial<Omit<GridNodePulsesProps, 'className' | 'breakpoints'>>;
    lg?: Partial<Omit<GridNodePulsesProps, 'className' | 'breakpoints'>>;
    xl?: Partial<Omit<GridNodePulsesProps, 'className' | 'breakpoints'>>;
  };
}

interface Pulse {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  intensity: number;
  connections: number[];
}

export function GridNodePulses({
  className,
  pulseColor = "#ffdab9",
  pulseCount = 15,
  columns = 10,
  rows = 12,
  gridWidth = 2800,
  gridHeight = 1920,
  minSize = 4,
  maxSize = 12,
  connectionProbability = 0.3,
  breakpoints,
}: GridNodePulsesProps) {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [connections, setConnections] = useState<{from: number, to: number, opacity: number}[]>([]);
  const [activePulses, setActivePulses] = useState<Set<number>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  
  const [currentProps, setCurrentProps] = useState({
    pulseCount,
    columns,
    rows,
    gridWidth,
    gridHeight,
    minSize,
    maxSize,
    connectionProbability,
  });

  // Handle responsive breakpoints
  useEffect(() => {
    if (!breakpoints) return;
    
    const handleResize = () => {
      const width = window.innerWidth;
      let newProps = {
        pulseCount,
        columns,
        rows,
        gridWidth,
        gridHeight,
        minSize,
        maxSize,
        connectionProbability,
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
  }, [breakpoints, pulseCount, columns, rows, gridWidth, gridHeight, minSize, maxSize, connectionProbability]);
  
  // Calculate grid cells but avoid rigid horizontal lines
  const cellWidth = currentProps.gridWidth / currentProps.columns;
  const cellHeight = currentProps.gridHeight / currentProps.rows;

  // Generate dynamic nodes with potential connections
  useEffect(() => {
    // Create a more organic grid by adding randomness to positions
    const getOrganic3DGridPosition = () => {
      // Base grid position with slight randomness
      const gridX = Math.floor(Math.random() * (currentProps.columns));
      // Avoid rigid horizontal alignment by adding randomness
      const gridY = Math.floor(Math.random() * currentProps.rows) + (Math.random() * 0.6 - 0.3);
      
      return {
        x: (gridX + 0.3 + Math.random() * 0.4) * cellWidth,
        y: (gridY + 0.3 + Math.random() * 0.4) * cellHeight
      };
    };

    // Create initial pulse nodes with varied properties
    const initialPulses: Pulse[] = Array.from({ length: currentProps.pulseCount }).map((_, idx) => {
      const position = getOrganic3DGridPosition();
      const intensity = 0.3 + Math.random() * 0.7; // Varying brightness
      
      return {
        id: idx,
        x: position.x,
        y: position.y,
        delay: Math.random() * 8, // More varied delays
        size: currentProps.minSize + Math.random() * (currentProps.maxSize - currentProps.minSize),
        intensity,
        connections: [] // Will store IDs of connected pulses
      };
    });

    // Create connections between nearby nodes
    const newConnections: {from: number, to: number, opacity: number}[] = [];
    
    // Establish connections between nearby nodes based on proximity
    for (let i = 0; i < initialPulses.length; i++) {
      const pulse = initialPulses[i];
      
      for (let j = i + 1; j < initialPulses.length; j++) {
        const otherPulse = initialPulses[j];
        
        // Calculate distance between nodes
        const dx = pulse.x - otherPulse.x;
        const dy = pulse.y - otherPulse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect nodes if they're close enough and probability check passes
        const maxDistance = Math.min(cellWidth, cellHeight) * 3.5;
        if (distance < maxDistance && Math.random() < currentProps.connectionProbability) {
          pulse.connections.push(j);
          otherPulse.connections.push(i);
          
          // Add connection with variable opacity based on distance
          const opacity = 0.1 + (1 - distance / maxDistance) * 0.5;
          newConnections.push({ from: i, to: j, opacity });
        }
      }
    }
    
    setPulses(initialPulses);
    setConnections(newConnections);
  }, [currentProps, cellWidth, cellHeight]);

  // Animation for drawing connections
  useEffect(() => {
    if (!canvasRef.current || pulses.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = currentProps.gridWidth;
    canvas.height = currentProps.gridHeight;
    
    // Animation function to draw connections
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get active pulses for this frame
      const currentActive = new Set<number>();
      
      connections.forEach(({ from, to, opacity }) => {
        const pulseFrom = pulses[from];
        const pulseTo = pulses[to];
        
        // Skip if pulses aren't defined
        if (!pulseFrom || !pulseTo) return;
        
        // Check if this connection should be active based on pulse animation state
        const fromActive = activePulses.has(from);
        const toActive = activePulses.has(to);
        
        if (fromActive || toActive) {
          // Add connected nodes to active set
          currentActive.add(from);
          currentActive.add(to);
          
          // Calculate dynamic opacity based on pulse states
          let dynamicOpacity = opacity;
          if (fromActive && toActive) {
            dynamicOpacity = Math.min(opacity * 1.5, 0.8);
          }
          
          // Draw connection line with glow effect
          ctx.beginPath();
          ctx.moveTo(pulseFrom.x, pulseFrom.y);
          ctx.lineTo(pulseTo.x, pulseTo.y);
          ctx.strokeStyle = `rgba(${parseInt(pulseColor.slice(1, 3), 16)}, ${parseInt(pulseColor.slice(3, 5), 16)}, ${parseInt(pulseColor.slice(5, 7), 16)}, ${dynamicOpacity})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });
      
      // Update active pulses state if changed
      if (JSON.stringify([...currentActive].sort()) !== JSON.stringify([...activePulses].sort())) {
        setActivePulses(currentActive);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pulses, connections, pulseColor, activePulses, currentProps.gridWidth, currentProps.gridHeight]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Canvas for drawing connections */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Animated nodes */}
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className="absolute rounded-full"
          style={{
            left: pulse.x,
            top: pulse.y,
            width: 3,
            height: 3,
            backgroundColor: pulseColor,
            boxShadow: `0 0 ${6 * pulse.intensity}px ${pulseColor}, 0 0 ${12 * pulse.intensity}px ${pulseColor}`,
            marginLeft: -1.5,
            marginTop: -1.5,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, pulse.intensity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            ease: "easeInOut",
            delay: pulse.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 3,
          }}
          onAnimationStart={() => {
            setActivePulses(prev => new Set([...prev, pulse.id]));
          }}
          onAnimationComplete={() => {
            setActivePulses(prev => {
              const newSet = new Set([...prev]);
              newSet.delete(pulse.id);
              return newSet;
            });
          }}
        />
      ))}
    </div>
  );
}
