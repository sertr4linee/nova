"use client"

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from "react"
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import type { ImageProps } from "next/image"
import { useOutsideClick } from "@/hooks/use-outside-click"
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
      const cardWidth = isMobile() ? 230 : 384 // (md:w-96)
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
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
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

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card
  index: number
  layout?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { onCardClose } = useContext(CarouselContext)
  const { setIsModalOpen } = useContext(ModalContext) // Use the modal context

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
  }, [open, setIsModalOpen, handleClose])

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop - solid background to hide content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={handleClose}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              ref={containerRef}
              className="relative z-[60] w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-neutral-900 border border-[#ffdab9]/20 shadow-2xl"
            >
              {/* Header with image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-[70] flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/20 backdrop-blur-sm hover:bg-black/80 transition-all duration-300"
                  onClick={handleClose}
                >
                  <IconX className="h-5 w-5 text-white" />
                </button>

                {/* Category badge */}
                <div className="absolute bottom-4 left-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffdab9]/20 border border-[#ffdab9]/40 text-sm font-medium text-[#ffdab9] backdrop-blur-sm">
                    {card.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-14rem)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {card.title}
                </h2>

                <div className="text-white/80 text-sm sm:text-base">
                  {card.content}
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={handleClose}
                    className="w-full py-3 px-6 rounded-xl bg-[#ffdab9] text-black font-semibold hover:bg-[#ffdab9]/90 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="group relative z-10 flex h-64 w-48 sm:h-80 sm:w-56 md:h-[40rem] md:w-96 flex-col items-start justify-start overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700 hover:border-[#ffdab9]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ffdab9]/30"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="relative z-40 p-3 sm:p-4 md:p-6 lg:p-8">
          <motion.div
            layoutId={layout ? `category-${card.category}` : undefined}
            className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-[#ffdab9]/15 border border-[#ffdab9]/30 mb-2 sm:mb-4"
          >
            <span className="text-xs sm:text-sm font-medium text-[#ffdab9]">{card.category}</span>
          </motion.div>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#ffcba4] group-hover:text-[#ffdab9] transition-colors duration-300 leading-tight"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage 
          src={card.src} 
          alt={card.title} 
          width={1000}
          height={1000}
          className="absolute inset-0 z-10 object-cover group-hover:scale-110 transition-transform duration-700" />
      </motion.button>
    </>
  )
}

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
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