"use client"

import React, { useEffect, useState, createContext, useContext, useCallback } from "react"
import { createPortal } from "react-dom"
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

export type Card = {
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
  const { setIsModalOpen } = useContext(ModalContext)

  // Lifted modal state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const cards: Card[] = items.map((item) => (item.props as { card: Card }).card)

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
    setIsModalOpen(true)
  }, [setIsModalOpen])

  const closeModal = useCallback(() => {
    setSelectedIndex(null)
    document.body.style.overflow = ""
    setIsModalOpen(false)
  }, [setIsModalOpen])

  const goNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < cards.length - 1)
      setSelectedIndex(selectedIndex + 1)
  }, [selectedIndex, cards.length])

  const goPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0)
      setSelectedIndex(selectedIndex - 1)
  }, [selectedIndex])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [closeModal, goNext, goPrev])

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

  const activeCard = selectedIndex !== null ? cards[selectedIndex] : null

  const modal = activeCard && selectedIndex !== null && (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#080808", display: "flex", flexDirection: "column" }}
      >
        {/* Top bar */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={goPrev}
              disabled={selectedIndex === 0}
              aria-label="Projet précédent"
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <IconArrowNarrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              disabled={selectedIndex === cards.length - 1}
              aria-label="Projet suivant"
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <IconArrowNarrowRight className="h-4 w-4" />
            </button>
            <span style={{ fontFamily: "var(--font-dm-sans)", color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              {selectedIndex + 1} / {cards.length}
            </span>
          </div>
          <button
            onClick={closeModal}
            aria-label="Fermer"
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <div style={{ position: "relative", width: "100%", height: "clamp(200px, 40vw, 340px)", flexShrink: 0 }}>
            <Image
              src={activeCard.src}
              alt={activeCard.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), #080808)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 32px" }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", color: "rgba(253,217,185,0.55)", fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                {activeCard.category}
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(24px,5vw,48px)", fontWeight: 300, color: "white", lineHeight: 1.1 }}>
                {activeCard.title}
              </h2>
            </div>
          </div>

          <div style={{ padding: "24px 20px 64px", maxWidth: 768, margin: "0 auto" }}>
            {activeCard.content}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      {/* Portal renders modal directly into document.body, bypassing any CSS transform/contain on parents */}
      {typeof document !== "undefined" && modal ? createPortal(modal, document.body) : null}

      {/* ── Carousel ── */}
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-8 md:py-12"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
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
                <CardThumbnail card={(item.props as { card: Card }).card} onClick={() => openModal(index)} />
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

// ─── CardThumbnail ────────────────────────────────────────────────────────────

function CardThumbnail({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
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
  )
}

// ─── Card (kept for API compat — just passes data, thumbnail rendered by Carousel) ──

export const Card = ({
  card,
}: {
  card: Card
  index: number
  layout?: boolean
}) => {
  return <>{/* rendered by Carousel via CardThumbnail */}</>
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

