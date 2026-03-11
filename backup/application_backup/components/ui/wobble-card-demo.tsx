"use client";

import { WobbleCard } from "./wobble-card";
import { Globe } from "./globe";
import Image from "next/image";
import React from "react";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

      {/* Card 1 — large dark, dégradé blanc visible sur fond sombre */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 min-h-[500px]"
        className=""
        style={{ background: "linear-gradient(135deg, #111 0%, #1a1208 60%, #0d0d0d 100%)" }}
      >
        <div className="max-w-xs relative z-10">
          <p className="text-[#fdd9b9]/50 text-[10px] tracking-[0.4em] uppercase mb-4">
            Notre philosophie
          </p>
          <h2
            className="text-left text-xl md:text-2xl lg:text-4xl font-serif italic font-light text-white leading-tight"
          >
            On ne crée pas juste des sites.{" "}
            <span className="text-[#fdd9b9]">On conçoit des expériences.</span>
          </h2>
          <p className="mt-6 text-left text-sm text-white/40 font-light leading-relaxed">
            Performance, fluidité, esthétique — dans chaque pixel, chaque interaction.
          </p>
        </div>
        <Image
          src="/code.png"
          width={500}
          height={500}
          alt="code"
          className="absolute -right-4 lg:-right-[6%] grayscale -bottom-10 object-contain rounded-2xl opacity-60"
        />
      </WobbleCard>

      {/* Card 2 — foncé avec Globe */}
      <WobbleCard
        containerClassName="col-span-1 min-h-[500px]"
        style={{ background: "linear-gradient(160deg, #0e0e0e 0%, #161008 100%)" }}
      >
        <div className="max-w-xs relative z-10">
          <p className="text-[#fdd9b9]/50 text-[10px] tracking-[0.4em] uppercase mb-4">
            Portée internationale
          </p>
          <h2
            className="text-left text-xl md:text-2xl lg:text-3xl font-serif italic font-light text-white leading-tight"
          >
            Des projets qui traversent{" "}
            <span className="text-[#fdd9b9]">les frontières.</span>
          </h2>
          <p className="mt-4 text-sm text-white/35 font-light leading-relaxed">
            Clients en France, Europe et au-delà.
          </p>
        </div>
        <Globe className="absolute -bottom-8 -right-8 opacity-70" />
      </WobbleCard>

      {/* Card 3 — pêche clair, texte sombre */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 min-h-[240px]"
        style={{ background: "linear-gradient(100deg, #fdd9b9 0%, #f5c9a0 50%, #fde8d0 100%)" }}
        noiseTintColor="#c4956a"
        noiseScale={1}
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-10">
          <div className="max-w-lg">
            <p className="text-black/40 text-[10px] tracking-[0.4em] uppercase mb-4">
              Stack technologique
            </p>
            <h2
              className="text-left text-xl md:text-2xl lg:text-3xl font-serif italic font-semibold text-black/85 mb-3 leading-tight"
            >
              Les meilleures technologies, au service de votre vision.
            </h2>
            <p className="text-sm text-black/50 font-light leading-relaxed">
              Next.js, React, TypeScript, Sanity, Payload, Stripe, Shopify — chaque projet
              bénéficie de l&apos;écosystème le plus performant du moment.
            </p>
          </div>

          {/* Tech logos — grid propre avec nom sous chaque logo */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-8 gap-y-6 shrink-0 items-center">
            {[
              { src: "/nextjs.png", alt: "Next.js" },
              { src: "/stripe.png", alt: "Stripe" },
              { src: "/payload.png", alt: "Payload" },
              { src: "/sanity.png", alt: "Sanity" },
              { src: "/shopify.png", alt: "Shopify" },
            ].map((img) => (
              <div key={img.alt} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center bg-black/8 rounded-lg group-hover:bg-black/15 transition-colors duration-300">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={36}
                    height={36}
                    className="object-contain opacity-55 group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
                <span className="text-black/40 text-[9px] tracking-[0.2em] uppercase group-hover:text-black/65 transition-colors duration-300">
                  {img.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </WobbleCard>

    </div>
  );
}
