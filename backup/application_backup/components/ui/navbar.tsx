"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { ModalContext } from "@/contexts/ModalContext";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#realisations" },
  { label: "Contact", href: "#contact" },
];

export function NavbarDemo() {
  const { isModalOpen } = useContext(ModalContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listener natif passif — n'entre pas dans la boucle RAF de framer-motion
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isModalOpen) return null;

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        animate={
          scrolled
            ? { backgroundColor: "rgba(8,8,8,0.94)" }
            : { backgroundColor: "rgba(8,8,8,0)" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-40"
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(253,217,185,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="relative z-10 flex-shrink-0 flex items-center gap-2.5 group">
            <Image
              src="/shape.png"
              alt="Klinkr"
              width={28}
              height={28}
              className="opacity-85 group-hover:opacity-60 transition-opacity duration-400 object-contain"
            />
            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-white/85 group-hover:text-[#fdd9b9] transition-colors duration-400 text-xl font-light tracking-wider italic"
            >
              Klinkr
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="text-white/35 hover:text-[#fdd9b9] transition-colors duration-300 text-[10px] tracking-[0.3em] uppercase cursor-pointer"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="border border-[#fdd9b9]/30 text-[#fdd9b9] hover:bg-[#fdd9b9] hover:text-[#080808] transition-all duration-400 text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 cursor-pointer"
            >
              Commencer
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/50 hover:text-[#fdd9b9] transition-colors duration-300 relative z-10 p-1"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-px w-5 bg-current origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-3 bg-current"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-px w-5 bg-current origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-[#080808]/98 border-t border-[#fdd9b9]/8"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {links.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => handleNav(l.href)}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-white/40 hover:text-[#fdd9b9] transition-colors duration-300 text-xs tracking-[0.3em] uppercase text-left cursor-pointer"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNav("#contact")}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="border border-[#fdd9b9]/30 text-[#fdd9b9] py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-[#080808] transition-all duration-400 cursor-pointer"
                >
                  Commencer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
