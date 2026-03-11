"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { NavbarDemo } from "@/components/ui/navbar";
import { ModalContext } from "@/contexts/ModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

// Lazy load des sections lourdes — chargées seulement quand nécessaire
const AppleCardsCarouselDemo = dynamic(
  () => import("@/components/ui/apple-cards-carousel-demo-with-modal-context"),
  { ssr: false }
);
const WobbleCardDemo = dynamic(
  () => import("@/components/ui/wobble-card-demo").then(m => ({ default: m.WobbleCardDemo })),
  { ssr: false }
);

// ─── Reveal — CSS pur, zéro framer-motion, zéro React re-render ───────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}s`;
          el.classList.add("reveal-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-hidden ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span
        style={{ fontFamily: "var(--font-cormorant)" }}
        className="text-[#fdd9b9] text-sm italic"
      >
        {number}
      </span>
      <div className="w-10 h-px bg-[#fdd9b9]/40" />
      <span
        style={{ fontFamily: "var(--font-dm-sans)" }}
        className="text-white/30 text-[10px] tracking-[0.4em] uppercase"
      >
        {label}
      </span>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useLanguage();
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-[#080808] overflow-hidden"
    >
      {/* Ambient gold glow — masqué sur mobile via .blur-orb */}
      <div className="blur-orb absolute top-1/3 right-0 w-[700px] h-[700px] bg-[#fdd9b9]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="blur-orb absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-[#fdd9b9]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Top ruled line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[72px] left-0 w-full h-px bg-[#fdd9b9]/10 origin-left"
      />

      <div className="relative z-10 px-6 sm:px-12 lg:px-24 pt-36 pb-24">
        {/* Groupe 1 : ligne + eyebrow — apparition immédiate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p
            style={{ fontFamily: "var(--font-dm-sans)" }}
            className="text-[#fdd9b9] text-[10px] tracking-[0.55em] uppercase mb-12"
          >
            {t("hero_eyebrow")}
          </p>
        </motion.div>

        {/* Groupe 2 : headlines — slide up rapide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(50px,10vw,160px)] leading-[0.87] tracking-[-0.03em] font-light text-white mb-1"
          >
            {t("hero_line1")}
          </h1>
          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(50px,10vw,160px)] leading-[0.87] tracking-[-0.03em] font-light italic text-[#fdd9b9] mb-14"
          >
            {t("hero_line2")}
          </h1>
          <div className="w-48 h-px bg-gradient-to-r from-[#fdd9b9] to-transparent mb-14" />
        </motion.div>

        {/* Groupe 3 : subtitle + CTAs + dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-28 mb-20">
            <p
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-white/45 text-base sm:text-lg leading-relaxed max-w-[380px] font-light"
            >
              {t("hero_sub")}{" "}
              <span className="text-[#fdd9b9]/75">{t("hero_cheaper")}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#realisations"
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="group inline-flex items-center gap-3 border border-[#fdd9b9]/55 text-[#fdd9b9] px-8 py-4 text-[10px] tracking-[0.35em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-500"
              >
                {t("hero_cta_projects")}
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
              </a>
              <a
                href="#contact"
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors duration-300 text-[10px] tracking-[0.35em] uppercase px-6 py-4"
              >
                {t("hero_cta_talk")}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdd9b9] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fdd9b9]" />
            </span>
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-white/25 text-[10px] tracking-[0.3em]"
            >
              {t("hero_available")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue — CSS, pas d'animation infinie JS */}
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3 opacity-0 hero-scroll-cue" style={{ writingMode: "vertical-rl" }}>
        <span
          style={{ fontFamily: "var(--font-dm-sans)" }}
          className="text-white/15 text-[9px] tracking-[0.4em] uppercase"
        >
          Défiler
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#fdd9b9]/40 to-transparent" />
      </div>
    </section>
  );
}

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────

const marqueeItems = [
  "Design", "Développement", "Performance", "Élégance",
  "Next.js", "React", "TypeScript", "Innovation",
];

function MarqueeStrip() {
  return (
    <div className="border-y border-[#fdd9b9]/12 bg-[#080808] overflow-hidden py-5 relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
      {/* Pure CSS animation — no JS RAF loop */}
      <div className="animate-marquee flex gap-0 whitespace-nowrap w-max">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-sm sm:text-base tracking-[0.35em] uppercase text-[#fdd9b9]/30 hover:text-[#fdd9b9]/70 transition-colors duration-500 cursor-default px-8"
          >
            {item}
            <span className="ml-8 text-[#fdd9b9]/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    title: "Design sur mesure",
    desc: "Identités visuelles qui captivent. Chaque pixel pensé pour votre marque et vos utilisateurs.",
  },
  {
    num: "02",
    title: "Développement Next.js",
    desc: "Sites ultra-performants avec les dernières technologies React, TypeScript et Tailwind.",
  },
  {
    num: "03",
    title: "Performance & SEO",
    desc: "Optimisation technique pour un référencement naturel de premier rang sur Google.",
  },
  {
    num: "04",
    title: "Support & Maintenance",
    desc: "Accompagnement continu, mises à jour de sécurité et support réactif sous 24h.",
  },
];

function ServicesSection() {
  return (
    <section className="cv-section bg-[#080808] py-36 lg:py-48 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 lg:gap-40">
          {/* Left */}
          <Reveal>
            <div>
              <SectionLabel number="01" label="Services" />
              <h2
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[clamp(44px,6.5vw,100px)] leading-[0.88] tracking-[-0.02em] font-light text-white mb-10"
              >
                CE QUE
                <br />
                <span className="italic text-[#fdd9b9]">NOUS</span>
                <br />
                FAISONS
              </h2>
              <p
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="text-white/35 text-sm leading-relaxed max-w-[260px] font-light"
              >
                De la conception à la mise en ligne, nous gérons l&apos;intégralité
                de votre projet digital.
              </p>

              {/* Decorative wordmark */}
              <div className="mt-12 flex items-center gap-2 hidden lg:flex opacity-20">
                <Image src="/shape.webp" alt="Klinkr" width={22} height={22} className="object-contain" />
                <span style={{ fontFamily: "var(--font-cormorant)" }} className="text-white text-lg italic tracking-wider font-light">Klinkr</span>
              </div>
            </div>
          </Reveal>

          {/* Right: numbered service list */}
          <div className="flex flex-col divide-y divide-[#fdd9b9]/10">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                <div className="group py-9 flex gap-8 items-start cursor-default">
                <span
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[#fdd9b9]/30 text-lg italic pt-1 group-hover:text-[#fdd9b9] transition-colors duration-400 min-w-[2.5rem]"
                >
                  {s.num}
                </span>
                <div className="flex-1">
                  <h3
                    style={{ fontFamily: "var(--font-cormorant)" }}
                    className="text-2xl sm:text-3xl font-light text-white/80 group-hover:text-white transition-colors duration-400 mb-2"
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-white/30 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-400 font-light max-w-md"
                  >
                    {s.desc}
                  </p>
                </div>
                <span className="text-[#fdd9b9]/0 group-hover:text-[#fdd9b9]/50 transition-all duration-400 text-xl self-center">
                  →
                </span>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJETS ──────────────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="realisations" className="cv-section bg-[#060606] py-36 lg:py-48">
      <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto mb-16">
        <Reveal>
          <SectionLabel number="02" label="Réalisations" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(42px,7vw,110px)] leading-[0.88] tracking-[-0.02em] font-light text-white"
          >
            NOS PROJETS
            <br />
            <span className="italic text-[#fdd9b9]">RÉCENTS</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{ fontFamily: "var(--font-dm-sans)" }}
            className="text-white/35 text-sm mt-8 max-w-md font-light leading-relaxed"
          >
            Des expériences digitales uniques, conçues avec passion et expertise
            technique. Chaque projet, une nouvelle vision.
          </p>
        </Reveal>

        {/* Thin gold rule */}
        <Reveal delay={0.3}>
          <div className="mt-12 w-full h-px bg-[#fdd9b9]/10" />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <AppleCardsCarouselDemo />
      </Reveal>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

const stats = [
  { num: "7+", label: "Projets livrés", desc: "Confiés par des entrepreneurs et créateurs exigeants." },
  { num: "100%", label: "Satisfaction client", desc: "Taux maintenu sur l'ensemble de nos réalisations." },
  { num: "6", label: "Mois d'expérience", desc: "Ciblée en création de sites web sur-mesure et performants." },
  { num: "24h", label: "Support réactif", desc: "Délai de réponse garanti de notre équipe technique." },
];

function StatsSection() {
  return (
    <section className="bg-[#080808] py-28 lg:py-40 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="w-full h-px bg-[#fdd9b9]/10 mb-20" />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#fdd9b9]/8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="bg-[#080808] p-10 lg:p-14 flex gap-8 lg:gap-12 items-start group hover:bg-[#fdd9b9]/[0.02] transition-colors duration-700">
                <div
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[clamp(56px,5.5vw,90px)] leading-none font-light text-[#fdd9b9]/60 group-hover:text-[#fdd9b9]/90 transition-colors duration-500 shrink-0"
                >
                  {s.num}
                </div>
                <div className="pt-2 lg:pt-3">
                  <div
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3 group-hover:text-white/60 transition-colors duration-400"
                  >
                    {s.label}
                  </div>
                  <p
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-white/18 text-sm font-light leading-relaxed group-hover:text-white/35 transition-colors duration-400"
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div className="w-full h-px bg-[#fdd9b9]/10 mt-0" />
        </Reveal>
      </div>
    </section>
  );
}

// ─── FEATURES / WHY US ────────────────────────────────────────────────────────

const features = [
  { title: "Design moderne", desc: "Sites responsifs qui s'adaptent à tous les écrans." },
  { title: "Performance optimisée", desc: "Vitesse ultrarapide et SEO naturel renforcé." },
  { title: "Tarifs transparents", desc: "Prix justes, sans frais cachés. Devis gratuit." },
  { title: "Hébergement fiable", desc: "99.9% de disponibilité garantie." },
  { title: "Technologies modernes", desc: "React, Next.js, TypeScript — le meilleur de l'écosystème." },
  { title: "Support dédié", desc: "Accompagnement personnalisé pour chaque projet." },
  { title: "Maintenance incluse", desc: "Sécurité et mises à jour incluses 6 mois." },
  { title: "Satisfaction garantie", desc: "Révisions illimitées jusqu'à votre satisfaction." },
];

function FeaturesSection() {
  return (
    <section className="cv-section bg-[#080808] py-36 lg:py-48 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel number="03" label="Avantages" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(42px,6.5vw,100px)] leading-[0.88] tracking-[-0.02em] font-light text-white mb-20"
          >
            POURQUOI
            <br />
            <span className="italic text-[#fdd9b9]">NOUS CHOISIR</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#fdd9b9]/8">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="bg-[#080808] p-8 hover:bg-[#fdd9b9]/4 transition-colors duration-600 group cursor-default">
                <div
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[#fdd9b9]/25 text-lg italic mb-5 group-hover:text-[#fdd9b9]/55 transition-colors duration-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-xl font-light text-white/70 mb-3 group-hover:text-[#fef3e8] transition-colors duration-400"
                >
                  {f.title}
                </h3>
                <p
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="text-white/28 text-sm leading-relaxed group-hover:text-white/50 transition-colors duration-400 font-light"
                >
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TECH / WOBBLE ────────────────────────────────────────────────────────────

function TechSection() {
  return (
    <section className="cv-section bg-[#060606] py-20 lg:py-28 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="px-2 sm:px-6 lg:px-12 mb-16">
          <Reveal>
            <SectionLabel number="04" label="Technologies" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[clamp(36px,5.5vw,80px)] leading-[0.9] tracking-[-0.02em] font-light text-white"
            >
              L&apos;ÉCOSYSTÈME
              <br />
              <span className="italic text-[#fdd9b9]">QUE NOUS MAÎTRISONS</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <WobbleCardDemo />
        </Reveal>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      id="contact"
      className="bg-[#080808] py-44 px-6 sm:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Gold ambient center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ willChange: "transform" }}>
        <div className="w-[700px] h-[700px] bg-[#fdd9b9]/6 rounded-full blur-[160px]" />
      </div>

      {/* Thin border frame */}
      <div className="absolute inset-10 border border-[#fdd9b9]/8 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <p
            style={{ fontFamily: "var(--font-dm-sans)" }}
            className="text-[#fdd9b9] text-[10px] tracking-[0.55em] uppercase mb-14"
          >
            Commençons
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(44px,8.5vw,130px)] leading-[0.87] tracking-[-0.03em] font-light text-white mb-18"
          >
            PRÊT À
            <br />
            <span className="italic text-[#fdd9b9]">TRANSFORMER</span>
            <br />
            VOTRE PRÉSENCE
            <br />
            DIGITALE ?
          </h2>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="mailto:hello@klinkr.app"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="group inline-flex items-center gap-4 bg-[#fdd9b9] text-black px-10 py-4 text-[10px] tracking-[0.35em] uppercase hover:bg-[#fef3e8] transition-all duration-400"
            >
              Démarrer mon projet
              <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">
                →
              </span>
            </a>
            <a
              href="#realisations"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="inline-flex items-center gap-2 border border-white/15 text-white/40 hover:text-white/70 hover:border-white/35 transition-all duration-400 px-10 py-4 text-[10px] tracking-[0.35em] uppercase"
            >
              Voir les projets
            </a>
          </div>
        </Reveal>

        {/* Bottom rule + meta */}
        <Reveal delay={0.35}>
          <div className="mt-24 pt-8 border-t border-[#fdd9b9]/12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-white/15 text-[10px] tracking-[0.3em]"
            >
              © 2026 klinkr
            </span>
            <div className="w-12 h-px bg-[#fdd9b9]/25" />
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-white/15 text-[10px] tracking-[0.3em]"
            >
              Paris, France
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {/* Grain overlay — no mix-blend for perf, très subtil */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03]"
        style={{
          backgroundImage: "url('/noise.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      <div className="relative bg-[#080808] text-white overflow-x-hidden">
        {/* Navbar */}
        <div
          className={`fixed top-0 left-0 w-full z-30 ${isModalOpen ? "hidden" : ""}`}
        >
          <NavbarDemo />
        </div>

        <HeroSection />
        <MarqueeStrip />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <FeaturesSection />
        <TechSection />
        <CTASection />
      </div>
    </ModalContext.Provider>
  );
}
