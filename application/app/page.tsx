"use client";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "../components/magicui/interactive-grid-pattern";
import { AnimatedGridBeams } from "../components/magicui/animated-grid-beams-responsive";
import { GridNodePulses } from "../components/magicui/grid-node-pulses-responsive";
import { DataFlowParticles } from "../components/magicui/data-flow-particles-responsive";
import { useState, useEffect, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GlowText } from "@/components/ui/glow-text";
import AppleCardsCarouselDemo from "@/components/apple-cards-carousel-demo-with-modal-context";

// Create a context for modal state
export const ModalContext = createContext({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => {}
});

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
  }, []);

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
        >
          <span className="relative z-10 px-1 sm:px-2 py-0.5 sm:py-1 text-[#ffdab9] font-montserrat text-sm sm:text-base md:text-xl lg:text-2xl">
            {words[currentIndex]}
          </span>
        </PointerHighlight>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Home() {
  const navItems = [
    {
      name: "Contact",
      link: "#contact",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Blog",
      link: "#blog",
    },
    {
      name: "Docs",
      link: "#docs",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <div className="relative flex min-h-screen w-full flex-col bg-black text-white overflow-x-hidden">
        <Spotlight className="hidden sm:block"/>
        {/* Fond interactif */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <InteractiveGridPattern
            className={cn(
              "absolute inset-0 max-h-screen w-full opacity-50 sm:opacity-100"
            )}
            width={280}
            height={160}
            squaresClassName="stroke-white/10 hover:stroke-white/30"
            squares={[6, 8, 10, 12]}
          />
          <div className="relative overflow-hidden" style={{maxHeight: '100vh'}}>
            <AnimatedGridBeams 
              className="z-[1] opacity-50 sm:opacity-80"
              beamColor="#ffdab9"
              beamCount={2}
              columns={6} 
              rows={6}
              gridWidth={1200}
              gridHeight={600}
              beamDuration={20}
              breakpoints={{
                sm: { beamCount: 3, columns: 8, rows: 8, gridWidth: 2000, gridHeight: 800 },
                md: { beamCount: 4, columns: 10, rows: 10, gridWidth: 3000, gridHeight: 1000 }
              }}
            />
            <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="relative overflow-hidden" style={{maxHeight: '95vh'}}>
            <GridNodePulses
              className="z-[1] opacity-50 sm:opacity-90"
              pulseColor="#ffdab9"
              pulseCount={8}
              columns={6}
              rows={6}
              gridWidth={1200}
              gridHeight={600}
              minSize={3}
              maxSize={8}
              connectionProbability={0.25}
              breakpoints={{
                sm: { pulseCount: 12, columns: 8, rows: 8, gridWidth: 1600, gridHeight: 800 },
                md: { pulseCount: 18, columns: 10, rows: 12, gridWidth: 1920, gridHeight: 1000, minSize: 4, maxSize: 12, connectionProbability: 0.35 }
              }}
            />
            <div className="absolute bottom-0 w-full h-[80px] bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="relative overflow-hidden" style={{maxHeight: '90vh'}}>
            <DataFlowParticles
              className="z-[1] opacity-40 sm:opacity-90"
              particleColor="#ffdab9"
              particleCount={4}
              columns={6}
              rows={6}
              gridWidth={1200}
              gridHeight={600}
              breakpoints={{
                sm: { particleCount: 6, columns: 8, rows: 8, gridWidth: 1600, gridHeight: 700 },
                md: { particleCount: 8, columns: 10, rows: 10, gridWidth: 1920, gridHeight: 900 }
              }}
            />        <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-black to-transparent"></div>
        </div>
        {/* Effet de transition pour la grille avec bordure de clôture */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffdab9]/30 to-transparent"></div>
        </div>
      </div>
      
      {/* NavbarDemo conditionnellement affiché */}
      {!isModalOpen && <NavbarDemo />}
      
      {/* Hero Section */}
        <section id="hero" className="min-h-screen relative z-10 pt-12 md:pt-0">
          <div className="container relative z-20 mx-auto flex flex-1 flex-col items-center justify-center p-4 sm:p-8 text-center">
            <div className="px-2 sm:px-4 py-6 sm:py-10 md:py-20">
              <Badge className="mb-4 sm:mb-6 inline-block rounded-full bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wider">
                Lancez votre site pro jusqu'à 50% moins cher 🚀
              </Badge>
              <div className="relative">
                
                <h1 className="relative z-10 mx-auto max-w-6xl text-center text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-white dark:text-slate-300 font-montserrat whitespace-normal sm:whitespace-nowrap">
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
                        className="font-bold tracking-wide text-sm sm:text-base md:text-xl lg:text-2xl"
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
                        delay: 0.3 + index * 0.1,
                        ease: "easeInOut",
                      }}
                      className="mr-1 inline-block text-sm sm:text-base md:text-xl lg:text-2xl"
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
              <div className="relative">
                
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
                    delay: 0.8,
                  }}
                  className="relative z-10 mx-auto mt-4 sm:mt-6 max-w-xl py-2 sm:py-4 text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white dark:text-white font-montserrat px-2 sm:px-0"
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
                  delay: 1,
                }}
                className="relative z-10 mx-auto italic text-xs sm:text-sm md:text-base lg:text-lg font-montserrat font-light px-3 sm:px-0"
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
                  delay: 1,
                }}
                className="relative z-10 mt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4"
              >
                <Badge variant="outline" className="rounded-full bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wide">
                  Créer mon site maintenant 🎂​
                </Badge>
                <a className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wide mt-2 sm:mt-0">Discutons ensemble →</a>
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
                delay: 1.1,
              }}
              className="relative z-10 mt-8"
            >
              <div className="h-[20rem] sm:h-[30rem] md:h-[40rem] lg:h-[52rem] w-full relative">
                <ContainerScroll titleComponent={" "}>
                  <img
                    src={`/dashboard.png`}
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
          {/* Contenu principal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container relative z-10 mx-auto flex flex-col items-center justify-center pt-4 pb-32"
          >
            <AppleCardsCarouselDemo />
          </motion.div>
        </section>

        {/* Ici vous pourrez ajouter vos sections supplémentaires */}

      </div>
    </ModalContext.Provider>
  );
}
