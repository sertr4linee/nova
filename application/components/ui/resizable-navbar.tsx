"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { scrollY } = useScroll();
  
  // Using framer motion's scrollY value and event to get smoother transitions
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !visible) {
      setVisible(true);
    } else if (latest <= 50 && visible) {
      setVisible(false);
    }
  });

  return (
    <div
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={{ backdropFilter: "none", boxShadow: "none", y: 0, borderRadius: "9999px" }}
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(0, 0, 0, 0.15)" : "none",
        y: visible ? 16 : 0,
        borderRadius: visible ? "1rem" : "9999px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
        borderRadius: { 
          type: "spring", 
          stiffness: 100, 
          damping: 30 
        },
        backgroundColor: { duration: 0.3 }
      }}        className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start px-6 py-4 lg:flex transition-colors duration-500",
        visible 
          ? "bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-neutral-800/40"
          : "bg-transparent",
        className,
      )}
      style={{
        backgroundImage: visible 
          ? "linear-gradient(to right, rgb(23, 23, 23), rgb(10, 10, 10), rgb(23, 23, 23))"
          : "none"
      }}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-row items-center justify-center space-x-4 text-sm font-medium",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-2 py-1 text-[#ffdab9] hover:text-[#ffdab9]/80"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ffdab9]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      initial={{ backdropFilter: "none", boxShadow: "none", y: 0, borderRadius: "0px" }}
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(0, 0, 0, 0.15)" : "none",
        y: visible ? 16 : 0,
        borderRadius: visible ? "0.75rem" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
        borderRadius: { 
          type: "spring", 
          stiffness: 100, 
          damping: 30 
        },
        backgroundColor: { duration: 0.3 }
      }}        className={cn(
        "relative z-50 flex w-full flex-col items-center justify-between px-4 py-3 lg:hidden transition-colors duration-500",
        visible 
          ? "bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-neutral-800/40 mx-2" 
          : "bg-transparent",
        className,
      )}
      style={{
        backgroundImage: visible 
          ? "linear-gradient(to right, rgb(23, 23, 23), rgb(10, 10, 10), rgb(23, 23, 23))"
          : "none"
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 50);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-b-xl mx-2 px-4 py-6 shadow-lg",
            visible ? "border border-neutral-800/40" : "bg-black/90",
            className,
          )}
          style={{
            backgroundImage: visible 
              ? "linear-gradient(to right, rgb(23, 23, 23), rgb(10, 10, 10), rgb(23, 23, 23))" 
              : "none",
            backdropFilter: visible ? "blur(16px)" : "blur(10px)"
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className="text-[#ffdab9] transition-colors duration-200"
      >
        <path 
          d="M12 2L22 7L12 12L2 7L12 2Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
        />
      </svg>
      <span className="font-medium text-white">NØVA</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "rounded-full px-6 py-1.5 text-sm font-medium transition-all";

  const variantStyles = {
    primary:
      "border border-white/20 bg-white/10 text-white hover:bg-white/20",
    secondary: "bg-transparent border border-white/10 text-white hover:bg-white/5",
    dark: "bg-black text-white border border-white/20",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
