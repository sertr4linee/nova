"use client";
import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
  noiseTintColor,
  noiseScale = 1.2,
  cardScale = 1,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  noiseTintColor?: string;
  noiseScale?: number;
  cardScale?: number;
}) => {
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / 20;
    const y = (event.clientY - (rect.top + rect.height / 2)) / 20;
    if (outerRef.current) {
      outerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale3d(${cardScale}, ${cardScale}, 1)`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale3d(1.03, 1.03, 1)`;
    }
  }, [cardScale]);

  const handleMouseLeave = useCallback(() => {
    if (outerRef.current) {
      outerRef.current.style.transform = `translate3d(0px, 0px, 0) scale3d(${cardScale}, ${cardScale}, 1)`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = "translate3d(0px, 0px, 0) scale3d(1, 1, 1)";
    }
  }, [cardScale]);

  return (
    <section
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(0px, 0px, 0) scale3d(${cardScale}, ${cardScale}, 1)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
      className={cn(
        "mx-auto w-full relative rounded-xl sm:rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 4px 16px rgba(34, 42, 53, 0.08), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 2px 4px rgba(34, 42, 53, 0.06), 0 8px 32px rgba(47, 48, 55, 0.08)",
        }}
      >
        <div
          ref={innerRef}
          style={{
            transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
            willChange: "transform",
          }}
          className={cn("h-full px-3 py-12 sm:px-4 sm:py-16 lg:px-10 lg:py-20", className)}
        >
          <Noise tintColor={noiseTintColor} scale={noiseScale} />
          {children}
        </div>
      </div>
    </section>
  );
};

// Noise overlay with optional tint
type NoiseProps = { tintColor?: string; scale?: number };
const Noise = ({ tintColor, scale = 1.2 }: NoiseProps) => {
  return (
    <div
      className="absolute inset-0 w-full h-full transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        transform: `scale(${scale})`,
        backgroundImage: "url(/noise.jpg)",
        backgroundSize: "30%",
        backgroundColor: tintColor,
        mixBlendMode: tintColor ? "multiply" : undefined,
      }}
    />
  );
};
