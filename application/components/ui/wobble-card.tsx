"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
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
  /** optional tint color for noise overlay */
  noiseTintColor?: string;
  /** optional scale factor for noise overlay */
  noiseScale?: number;
  /** optional scale factor for the entire card */
  cardScale?: number;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(${cardScale}, ${cardScale}, 1)`
          : `translate3d(0px, 0px, 0) scale3d(${cardScale}, ${cardScale}, 1)`,
        transition: "transform 0.1s ease-out",
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
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10", className)}
        >
          <Noise tintColor={noiseTintColor} scale={noiseScale} />
          {children}
        </motion.div>
      </div>
    </motion.section>
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
        mixBlendMode: tintColor ? 'multiply' : undefined,
      }}
    />
  );
};
