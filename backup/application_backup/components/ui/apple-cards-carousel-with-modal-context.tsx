"use client"

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from "react"
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import type { ImageProps } from "next/image"
import { ModalContext } from "@/contexts/ModalContext"
import Image from "next/image"

interface CarouselProps {
  items: React.ReactElement[]
  initialScroll?: number
}

type Card = {
  src: string
  title: string
  category: string
  content: React.ReactNode
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

// ─── Carousel ─────────────────────────────────────────────────────────────────

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
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
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -380, behavior: "smooth" })
  }
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 380, behavior: "smooth" })
  }

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = typeof window !== "undefined" && window.innerWidth < 768 ? 240 : 380
      const gap = 16
      carouselRef.current.scrollTo({ left: (cardWidth + gap) * (index + 1), behavior: "smooth" })
      setCurrentIndex(index)
    }
  }

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-8 md:py-12"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#060606] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#060606] to-transparent" />

          <div className="flex flex-row justify-start gap-4 pl-6 mx-auto max-w-7xl">
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                className="last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        <div className="flex justify-end gap-2 pr-6 mt-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="w-9 h-9 border border-[#fdd9b9]/20 flex items-center justify-center text-[#fdd9b9]/40 hover:border-[#fdd9b9]/50 hover:text-[#fdd9b9] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <IconArrowNarrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="w-9 h-9 border border-[#fdd9b9]/20 flex items-center justify-center text-[#fdd9b9]/40 hover:border-[#fdd9b9]/50 hover:text-[#fdd9b9] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <IconArrowNarrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = ({
  card,
  index,
}: {
  card: Card
  index: number
  layout?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const { onCardClose } = useContext(CarouselContext)
  const { setIsModalOpen } = useContext(ModalContext)

  const handleClose = useCallback(() => {
    setOpen(false)
    document.body.style.overflow = ""
    setIsModalOpen(false)
    onCardClose(index)
  }, [onCardClose, index, setIsModalOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    if (open) {
      document.body.style.overflow = "hidden"
      setIsModalOpen(true)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, setIsModalOpen, handleClose])

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
            {/* Backdrop — click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={handleClose}
            />

            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#080808] border border-[#fdd9b9]/12 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header — image + title */}
              <div className="relative w-full h-[180px] sm:h-[240px] flex-shrink-0">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#080808]" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <span
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-[#fdd9b9]/55 text-[8px] tracking-[0.45em] uppercase block mb-1.5"
                  >
                    {card.category}
                  </span>
                  <h2
                    style={{ fontFamily: "var(--font-cormorant)" }}
                    className="text-[clamp(22px,4vw,44px)] font-light text-white leading-tight tracking-[-0.01em]"
                  >
                    {card.title}
                  </h2>
                </div>

                {/* Close */}
                <button
                  onClick={handleClose}
                  aria-label="Fermer"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all bg-black/50 backdrop-blur-sm z-10"
                >
                  <IconX className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-5 sm:p-8">
                  {card.content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card thumbnail */}
      <button
        onClick={() => setOpen(true)}
        className="group relative flex flex-col overflow-hidden w-[220px] md:w-[340px] h-[320px] md:h-[480px] bg-[#0a0a0a] border border-white/6 hover:border-[#fdd9b9]/25 transition-all duration-500"
      >
        <div className="absolute inset-0">
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
        </div>

        <div className="relative z-10 mt-auto p-6 md:p-8 text-left">
          <span
            style={{ fontFamily: "var(--font-dm-sans)" }}
            className="text-[#fdd9b9]/50 text-[9px] tracking-[0.4em] uppercase block mb-3"
          >
            {card.category}
          </span>
          <h3
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[clamp(18px,2.5vw,28px)] font-light text-white/85 group-hover:text-white leading-tight tracking-tight transition-colors duration-300"
          >
            {card.title}
          </h3>
          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[#fdd9b9]/60 text-[9px] tracking-[0.3em] uppercase"
            >
              Voir le projet
            </span>
            <span className="text-[#fdd9b9]/50 text-xs group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </div>
        </div>
      </button>
    </>
  )
}

// ─── BlurImage ────────────────────────────────────────────────────────────────

export const BlurImage = ({ src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={cn("transition duration-500", isLoading ? "blur-sm scale-105" : "blur-0 scale-100", className)}
      onLoad={() => setLoading(false)}
      src={(src as string) || "/placeholder.svg"}
      loading="lazy"
      decoding="async"
      alt={alt ?? "Klinkr project"}
      {...rest}
    />
  )
}
