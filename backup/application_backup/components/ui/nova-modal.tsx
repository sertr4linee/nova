"use client"

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from "react"
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX, IconExternalLink, IconCalendar, IconMapPin } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import type { ImageProps } from "next/image"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { ModalContext } from "@/contexts/ModalContext"
import { RetroGrid } from "./retro-grid"
import Image from "next/image"

interface CarouselProps {
  items: React.ReactElement[]
  initialScroll?: number
}

type ProjectCard = {
  src: string
  title: string
  category: string
  description: string
  techStack: string[]
  projectUrl?: string
  duration?: string
  location?: string
  gallery?: string[]
  content: React.ReactNode
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

export const NovaCarousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
      checkScrollability()
    }
  }, [initialScroll])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384
      const gap = isMobile() ? 4 : 8
      const scrollPosition = (cardWidth + gap) * (index + 1)
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const isMobile = () => {
    return window && window.innerWidth < 768
  }

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffdab9]/20 border border-[#ffdab9]/30 backdrop-blur-sm hover:bg-[#ffdab9]/30 transition-all duration-300 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-[#ffdab9]" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffdab9]/20 border border-[#ffdab9]/30 backdrop-blur-sm hover:bg-[#ffdab9]/30 transition-all duration-300 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-[#ffdab9]" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export const NovaCard = ({
  card,
  index,
  layout = false,
}: {
  card: ProjectCard
  index: number
  layout?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { onCardClose } = useContext(CarouselContext)
  const { setIsModalOpen } = useContext(ModalContext)

  const handleClose = useCallback(() => {
    setOpen(false)
    document.body.style.overflow = 'auto'
    setIsModalOpen(false)
    onCardClose(index)
  }, [onCardClose, index, setIsModalOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose()
      }
      if (event.key === "ArrowLeft" && card.gallery && currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1)
      }
      if (event.key === "ArrowRight" && card.gallery && currentImageIndex < card.gallery.length - 1) {
        setCurrentImageIndex(prev => prev + 1)
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden'
      setIsModalOpen(true)
      window.addEventListener("keydown", onKeyDown)
      return () => {
        window.removeEventListener("keydown", onKeyDown)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, setIsModalOpen, handleClose, card.gallery, currentImageIndex])

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true)
  }

  const nextImage = () => {
    if (card.gallery && currentImageIndex < card.gallery.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            {/* Background with Nova styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-gradient-to-br from-black via-black to-neutral-900"
            >
              {/* Retro Grid Background */}
              <RetroGrid 
                angle={75}
                cellSize={60}
                opacity={0.05}
                darkLineColor="#ffdab9"
                className="absolute inset-0"
              />
              
              {/* Noise texture */}
              <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-5 mix-blend-overlay"></div>
              
              {/* Background blur */}
              <div className="absolute inset-0 backdrop-blur-sm"></div>
            </motion.div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-4 sm:mx-auto my-6 md:my-10 h-fit max-w-6xl rounded-2xl bg-gradient-to-br from-black/80 via-neutral-900/90 to-black/80 backdrop-blur-xl border border-[#ffdab9]/20 shadow-2xl shadow-[#ffdab9]/10"
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-[70] flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-[#ffdab9]/30 backdrop-blur-sm hover:bg-[#ffdab9]/20 transition-all duration-300 group"
                onClick={handleClose}
              >
                <IconX className="h-5 w-5 text-white group-hover:text-[#ffdab9] transition-colors" />
              </button>

              {/* Modal Content */}
              <div className="p-6 md:p-8 lg:p-10">
                {/* Header */}
                <div className="mb-6">
                  <motion.div
                    layoutId={layout ? `category-${card.title}` : undefined}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffdab9]/10 border border-[#ffdab9]/20 mb-4"
                  >
                    <span className="text-sm font-medium text-[#ffdab9]">{card.category}</span>
                  </motion.div>
                  
                  <motion.h1
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3"
                  >
                    {card.title}
                  </motion.h1>
                  
                  <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                    {card.description}
                  </p>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {card.duration && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <IconCalendar className="h-5 w-5 text-[#ffdab9]" />
                      <div>
                        <p className="text-sm text-white/60">Durée</p>
                        <p className="text-white font-medium">{card.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {card.location && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <IconMapPin className="h-5 w-5 text-[#ffdab9]" />
                      <div>
                        <p className="text-sm text-white/60">Localisation</p>
                        <p className="text-white font-medium">{card.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {card.projectUrl && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <IconExternalLink className="h-5 w-5 text-[#ffdab9]" />
                      <div>
                        <p className="text-sm text-white/60">Projet</p>
                        <a 
                          href={card.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#ffdab9] font-medium hover:text-[#ffb366] transition-colors"
                        >
                          Voir le site
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                {card.techStack && card.techStack.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Technologies utilisées</h3>
                    <div className="flex flex-wrap gap-2">
                      {card.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm rounded-full bg-[#ffdab9]/10 border border-[#ffdab9]/20 text-[#ffdab9]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                {card.gallery && card.gallery.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Galerie</h3>
                    <div className="relative">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/20 border border-white/10">
                        <Image
                          src={card.gallery[currentImageIndex]}
                          alt={`${card.title} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Gallery Navigation */}
                        {card.gallery.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              disabled={currentImageIndex === 0}
                              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 border border-[#ffdab9]/30 backdrop-blur-sm hover:bg-[#ffdab9]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <IconArrowNarrowLeft className="h-5 w-5 text-white mx-auto" />
                            </button>
                            <button
                              onClick={nextImage}
                              disabled={currentImageIndex === card.gallery.length - 1}
                              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 border border-[#ffdab9]/30 backdrop-blur-sm hover:bg-[#ffdab9]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <IconArrowNarrowRight className="h-5 w-5 text-white mx-auto" />
                            </button>
                          </>
                        )}
                      </div>
                      
                      {/* Gallery Dots */}
                      {card.gallery.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                          {card.gallery.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={cn(
                                "h-2 w-2 rounded-full transition-all duration-300",
                                index === currentImageIndex 
                                  ? "bg-[#ffdab9] w-6" 
                                  : "bg-white/30 hover:bg-white/50"
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Custom Content */}
                <div className="text-white/90">
                  {card.content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Trigger */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="group relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 hover:border-[#ffdab9]/30 transition-all duration-500 md:h-[40rem] md:w-96 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ffdab9]/20"
      >
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        
        {/* Content */}
        <div className="relative z-40 p-6 md:p-8">
          <motion.div
            layoutId={layout ? `category-${card.category}` : undefined}
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffdab9]/10 border border-[#ffdab9]/20 mb-4"
          >
            <span className="text-sm font-medium text-[#ffdab9]">{card.category}</span>
          </motion.div>
          
          <motion.h3
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-[#ffdab9] transition-colors duration-300"
          >
            {card.title}
          </motion.h3>
          
          <p className="mt-3 text-sm md:text-base text-white/70 line-clamp-3">
            {card.description}
          </p>
        </div>

        {/* Background Image */}
        <NovaBlurImage 
          src={card.src} 
          alt={card.title} 
          width={1000}
          height={1000}
          className="absolute inset-0 z-10 object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </motion.button>
    </>
  )
}

export const NovaBlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={cn("h-full w-full transition duration-500", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={(src as string) || "/placeholder.svg"}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Nova project preview"}
      {...rest}
    />
  )
}
