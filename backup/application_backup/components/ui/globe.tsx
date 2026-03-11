"use client";

import React, { useRef, useEffect } from "react";
import createGlobe from "cobe";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const globeRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 1, // réduit de 2 → 1 pour diviser la charge GPU par 4
      width: 400,
      height: 400,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 8000, // réduit de 13000
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.99, 0.85, 0.73],
      glowColor: [0.99, 0.85, 0.73],
      markers: [
        { location: [48.8566, 2.3522], size: 0.08 }, // Paris
        { location: [51.5074, -0.1278], size: 0.05 }, // London
      ],
      onRender: (state: Record<string, number>) => {
        state.phi = phiRef.current;
        phiRef.current += 0.004; // rotation plus lente
      },
    });
    globeRef.current = globe;

    // Pause rotation when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Pause: override onRender to be a no-op
          phiRef.current = phiRef.current; // freeze phi
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
