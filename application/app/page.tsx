"use client";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "../components/magicui/interactive-grid-pattern-fixed";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GlowText } from "@/components/ui/glow-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import AppleCardsCarouselDemo from "@/components/ui/apple-cards-carousel-demo-with-modal-context";
import { FeaturesSectionDemo } from "@/components/ui/features";
import Image from "next/image";
// import { ScrollProgress, ScrollToTop } from "@/components/ui/scroll-progress";
// import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ModalContext } from "@/contexts/ModalContext";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";


// Composant pour l'animation des mots alternants
const AnimatedWords = () => {
  const words = ["créateurs", "entrepreneurs", "freelances", "startups"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
      }, 400);
    }, 5000); // Change de mot toutes les 5 secondes

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {isTransitioning && (
          <motion.div
            className="absolute -inset-4 -z-10 bg-[#ffdab9]/10 blur-xl rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <PointerHighlight
          rectangleClassName="bg-black/10 dark:bg-neutral-800/30 border-[#ffdab9]/30 dark:border-[#ffdab9]/30"
          pointerClassName="text-[#ffdab9]"
        >                          <span className="relative z-10 px-1 sm:px-2 py-0.5 sm:py-1 text-[#ffdab9] font-montserrat text-lg sm:text-2xl md:text-4xl lg:text-6xl">
            {words[currentIndex]}
          </span>
        </PointerHighlight>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {/* Scroll Progress Bar */}
      {/* <ScrollProgress /> */}

      {/* Scroll to Top Button */}
      {/* <ScrollToTop /> */}

      <div
        className="relative flex min-h-screen w-full flex-col bg-black text-white overflow-x-hidden overflow-y-auto"
        style={{ touchAction: 'pan-y' }}
      >
        <Spotlight className="hidden sm:block" />
        {/* Fond interactif optimisé - TEST INTERACTIVE GRID */}
        <div className="absolute inset-0 z-0 overflow-hidden will-change-transform pointer-events-none">
          <InteractiveGridPattern
            className={cn(
              "absolute inset-0 max-h-screen w-full opacity-30 sm:opacity-50"
            )}
            width={280}
            height={160}
            squaresClassName="stroke-white/10 hover:stroke-white/30"
            squares={[6, 8, 10, 12]}
          />
        </div>

        {/* NavbarDemo (hidden when modal is open) */}
  <div className={`fixed top-0 left-0 w-full z-30 ${isModalOpen ? 'hidden' : ''}`}>
          <NavbarDemo />
        </div>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen relative z-10 pt-12 md:pt-0">
          <div className="container relative z-20 mx-auto flex flex-1 flex-col items-center justify-center p-4 sm:p-8 text-center">
            <div className="px-2 sm:px-4 py-8 sm:py-12 md:py-24">
              <Badge className="mb-8 sm:mb-10 inline-block rounded-full bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wider">
                Lancez votre site pro jusqu&apos;à 50% moins cher 🚀
              </Badge>
              <div className="relative mb-8 sm:mb-12">

                <h1 className="relative z-10 mx-auto max-w-6xl text-center text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold text-white dark:text-slate-300 font-montserrat whitespace-normal sm:whitespace-nowrap">
                  <div className="relative inline-block">

                    <motion.span
                      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.05,
                        ease: "easeInOut",
                      }}
                      className="mr-1 inline-block relative"
                    >
                      <GlowText
                        intensity="high"
                        glowColor="#ffdab9"
                        className="font-bold tracking-wide text-lg sm:text-2xl md:text-4xl lg:text-6xl"
                        animate={true}
                        textColor="#ffffff"
                      >
                        Development web
                      </GlowText>
                    </motion.span>
                  </div>
                  {" pour ".split(" ").map((word, index) => (
                    <motion.span
                      key={`static-${index}`}
                      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + index * 0.05, // Reduced delay
                        ease: "easeInOut",
                      }}
                      className="mr-1 inline-block text-lg sm:text-2xl md:text-4xl lg:text-6xl"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <motion.span
                    className="mr-1 inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AnimatedWords />
                  </motion.span>
                </h1>
              </div>
              <div className="relative mb-8 sm:mb-12">

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15, // Starting slightly lower
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2, // Reduced delay
                  }}
                  className="relative z-10 mx-auto mt-6 sm:mt-8 max-w-xl py-2 sm:py-4 text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white dark:text-white font-montserrat px-2 sm:px-0"
                >
                  Nous aidons les petites équipes à créer une présence digitale impactante. Des sites rapides, modernes et pensés pour la croissance.
                </motion.p>
              </div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.3, // Reduced delay
                }}
                className="relative z-10 mx-auto italic text-xs sm:text-sm md:text-base lg:text-lg font-montserrat font-light px-3 sm:px-0 mb-6 sm:mb-8"
              >
                <GlowText
                  intensity="medium"
                  glowColor="#ffdab9"
                  className="italic font-light tracking-wide"
                  animate={true}
                  textColor="#ffdab9"
                >
                  Conçu pour le web de demain, optimisé pour votre succès
                </GlowText>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.4, // Reduced delay
                }}
                className="relative z-10 mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-16"
              >
                <Badge className="mb-8 sm:mb-10 inline-block rounded-full bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wider">
                  Créer mon site maintenant 🎂
                </Badge>
                <a className="mb-8 sm:mb-10 inline-block rounded-full  px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wider">Discutons ensemble →</a>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 0,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.5, // Reduced delay
                }}
                className="relative z-10 mt-12 sm:mt-16"
              >
                <div className="h-[20rem] sm:h-[30rem] md:h-[40rem] lg:h-[52rem] w-full relative">
                  <ContainerScroll titleComponent={" "}>
                    <Image
                      src="/dashboard.png"
                      alt="hero"
                      height={720}
                      width={1400}
                      className="mx-auto rounded-lg sm:rounded-xl md:rounded-2xl object-cover h-full object-left-top shadow-xl"
                      draggable={false}
                    />
                  </ContainerScroll>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* Section des réalisations avec le carousel */}
        <section id="realisations" className="relative bg-black overflow-hidden pt-8">
            {/* Titre avec animations Magic UI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="container relative z-10 mx-auto text-center pt-4 pb-8"
            >
              <div className="mb-8">
                <Badge className="mb-6 inline-block rounded-full bg-white/5 px-4 py-2 text-sm font-montserrat font-medium text-white backdrop-blur-sm tracking-wider">
                  Nos Réalisations ✨
                </Badge>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-montserrat"
                >
                  <TextGenerateEffect
                    words="Découvrez nos réalisations"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat"
                    duration={0.8}
                    textColor="text-white"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-montserrat font-light px-4"
                >
                  <TextGenerateEffect
                    words="Des projets uniques conçus avec passion et expertise technique. Découvrez comment nous transformons les idées en expériences digitales exceptionnelles."
                    className="text-lg md:text-xl font-montserrat font-light text-white/80"
                    duration={0.6}
                    textColor="text-white/80"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Statistiques avec nombres animés */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="container relative z-10 mx-auto px-4 pb-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffdab9] mb-2 font-montserrat">
                    <GlowText
                      intensity="medium"
                      glowColor="#ffdab9"
                      className="font-bold tracking-wide"
                      animate={true}
                      textColor="#ffdab9"
                    >
                      7+
                    </GlowText>
                  </div>
                  <TextGenerateEffect
                    words="Projets réalisés"
                    className="text-white/70 text-sm md:text-base font-montserrat"
                    duration={0.4}
                    textColor="text-white/70"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffdab9] mb-2 font-montserrat">
                    <GlowText
                      intensity="medium"
                      glowColor="#ffdab9"
                      className="font-bold tracking-wide"
                      animate={true}
                      textColor="#ffdab9"
                    >
                      100%
                    </GlowText>
                  </div>
                  <TextGenerateEffect
                    words="Satisfaction client"
                    className="text-white/70 text-sm md:text-base font-montserrat"
                    duration={0.4}
                    textColor="text-white/70"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffdab9] mb-2 font-montserrat">
                    <GlowText
                      intensity="medium"
                      glowColor="#ffdab9"
                      className="font-bold tracking-wide"
                      animate={true}
                      textColor="#ffdab9"
                    >
                      6
                    </GlowText>
                  </div>
                  <TextGenerateEffect
                    words="Mois d&apos;expérience"
                    className="text-white/70 text-sm md:text-base font-montserrat"
                    duration={0.4}
                    textColor="text-white/70"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffdab9] mb-2 font-montserrat">
                    <GlowText
                      intensity="medium"
                      glowColor="#ffdab9"
                      className="font-bold tracking-wide"
                      animate={true}
                      textColor="#ffdab9"
                    >
                      24h
                    </GlowText>
                  </div>
                  <TextGenerateEffect
                    words="Support réactif"
                    className="text-white/70 text-sm md:text-base font-montserrat"
                    duration={0.4}
                    textColor="text-white/70"
                  />
                </div>
              </div>
            </motion.div>



            {/* Contenu principal avec carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="container relative z-10 mx-auto flex flex-col items-center justify-center pb-32"
            >
              <AppleCardsCarouselDemo />
            </motion.div>
          </section>

        {/* Section des fonctionnalités */}
        <section id="services" className="relative bg-black overflow-hidden py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <Badge className="mb-8 inline-block rounded-full bg-white/5 px-4 py-2 text-sm font-montserrat font-medium text-white backdrop-blur-sm tracking-wider">
                  Nos Services & Avantages 💎
                </Badge>
                <HeroHighlight containerClassName="h-auto py-12">
                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: [20, -5, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto font-montserrat"
                  >
                    Pourquoi nous choisir pour votre{" "}
                    <Highlight className="text-white">
                      projet digital ?
                    </Highlight>
                  </motion.h1>
                </HeroHighlight>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-white max-w-3xl mx-auto font-montserrat font-light mt-6"
                >
                  Découvrez tous nos services et avantages pour créer le site web parfait pour votre entreprise
                </motion.p>
              </div>
              <FeaturesSectionDemo />
            </div>
          </section>


        {/* Ici vous pourrez ajouter vos sections supplémentaires */}

      </div>
    </ModalContext.Provider>
  );
}
