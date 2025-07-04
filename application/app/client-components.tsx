"use client";
import { SmoothCursor } from "@/components/magicui/smooth-cursor";
import { useState, useEffect } from "react";

// Composant pour curseur conditionnel
const ConditionalCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (isDesktop) {
    return <SmoothCursor />;
  }
  return null;
};

export default function ClientComponents() {
  return <ConditionalCursor />;
}
