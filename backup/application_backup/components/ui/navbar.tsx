"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ModalContext } from "@/contexts/ModalContext";
import { useLanguage, languages } from "@/contexts/LanguageContext";

export function NavbarDemo() {
  const { isModalOpen } = useContext(ModalContext);
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le dropdown langue si clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (isModalOpen) return null;
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navLinks = [
    { key: "nav_services" as const, href: "#services" },
    { key: "nav_projects" as const, href: "#realisations" },
    { key: "nav_contact" as const, href: "#contact" },
  ];

  const currentLang = languages.find((l) => l.code === lang)!;

  return (
    <>
      <motion.header
        animate={
          scrolled
            ? { backgroundColor: "rgba(8,8,8,0.94)" }
            : { backgroundColor: "rgba(8,8,8,0)" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[150]"
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(253,217,185,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0 flex items-center gap-2.5 group">
            <Image
              src="/shape.webp"
              alt="Klinkr"
              width={28}
              height={28}
              priority
              className="opacity-85 group-hover:opacity-60 transition-opacity duration-400 object-contain"
            />
            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-white/85 group-hover:text-[#fdd9b9] transition-colors duration-400 text-xl font-light tracking-wider italic"
            >
              Klinkr
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10">
            {navLinks.map((l) => (
              <button
                key={l.key}
                onClick={() => handleNav(l.href)}
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="text-white/35 hover:text-[#fdd9b9] transition-colors duration-300 text-[10px] tracking-[0.3em] uppercase cursor-pointer"
              >
                {t(l.key)}
              </button>
            ))}

            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="flex items-center gap-2 text-white/35 hover:text-[#fdd9b9] transition-colors duration-300 text-[10px] tracking-[0.2em] uppercase cursor-pointer select-none"
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span>{currentLang.short}</span>
                <motion.span
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[8px] opacity-60"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full right-0 mt-3 min-w-[148px] bg-[#0e0e0e] border border-[#fdd9b9]/15 shadow-2xl overflow-hidden"
                  >
                    {/* thin gold top line */}
                    <div className="h-px w-full bg-gradient-to-r from-[#fdd9b9]/40 to-transparent" />
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-200 cursor-pointer ${
                          lang === l.code
                            ? "text-[#fdd9b9] bg-[#fdd9b9]/6"
                            : "text-white/35 hover:text-white/70 hover:bg-white/4"
                        }`}
                      >
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.label}</span>
                        {lang === l.code && (
                          <span className="ml-auto text-[#fdd9b9]/60 text-[8px]">✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNav("#contact")}
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="border border-[#fdd9b9]/30 text-[#fdd9b9] hover:bg-[#fdd9b9] hover:text-[#080808] transition-all duration-400 text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 cursor-pointer"
            >
              {t("nav_contact")}
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
                {navLinks.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => handleNav(l.href)}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-white/40 hover:text-[#fdd9b9] transition-colors duration-300 text-xs tracking-[0.3em] uppercase text-left cursor-pointer"
                  >
                    {t(l.key)}
                  </button>
                ))}

                {/* Mobile lang switcher */}
                <div className="flex items-center gap-3 pt-2 border-t border-[#fdd9b9]/8">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer ${
                        lang === l.code ? "text-[#fdd9b9]" : "text-white/25"
                      }`}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.short}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleNav("#contact")}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="border border-[#fdd9b9]/30 text-[#fdd9b9] py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-[#080808] transition-all duration-400 cursor-pointer"
                >
                  {t("nav_contact")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
