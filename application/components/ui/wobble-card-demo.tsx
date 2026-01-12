"use client";

import { WobbleCard } from "./wobble-card";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="w-[600px] h-[600px]" />,
});


export function WobbleCardDemo() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto w-full px-3 sm:px-4 lg:px-8">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 min-h-[280px] sm:min-h-[320px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
          noiseTintColor="#ffdab9"
          className=""
        >
          <div className="max-w-[85%] sm:max-w-xs relative z-10">
            <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic font-semibold text-[#ffdab9]">
              On ne crée pas juste des sites. On conçoit des expériences.
            </h2>
            <p className="mt-2 sm:mt-3 text-left text-xs sm:text-sm text-neutral-300">
              Optimisation, fluidité, performance – dans chaque détail.
            </p>
          </div>
          <Image
            src="/code.png"
            width={350}
            height={350}
            alt="linear demo image"
            className="absolute -right-10 sm:-right-4 lg:-right-[5%] grayscale filter -bottom-12 sm:-bottom-8 object-contain rounded-2xl w-[180px] sm:w-[280px] lg:w-[350px] opacity-60 sm:opacity-100"
          />
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 min-h-[280px] sm:min-h-[320px] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black overflow-hidden"
        >
          <div className="max-w-xs relative z-10">
            <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic font-semibold text-[#ffdab9]">
              Conformité RGPD simplifiée
            </h2>
            <p className="mt-2 sm:mt-3 text-left text-xs sm:text-sm text-neutral-300">
              Protégez les données de vos utilisateurs sans vous perdre dans la réglementation.
            </p>
          </div>
          <Globe className="absolute -right-16 sm:-right-20 -bottom-16 sm:-bottom-20 opacity-40 sm:opacity-60 scale-75 sm:scale-100" />
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 min-h-[180px] sm:min-h-[200px] bg-gradient-to-r from-[#ffdab9] via-[#ffe4c4] to-[#ffdab9]"
          noiseTintColor="#ffdab9"
          noiseScale={1}
        >
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex flex-1 flex-col md:flex-row items-center justify-between w-full gap-4 sm:gap-6">
              <div className="max-w-sm w-full md:w-auto text-center md:text-left">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic font-semibold text-black/90 mb-1 sm:mb-2">
                  Technologies de pointe
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700">
                  Nous maîtrisons les outils les plus performants pour créer des solutions sur mesure.
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                <Image
                  src="/nextjs.png"
                  alt="Next.js"
                  width={50}
                  height={50}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src="/stripe.png"
                  alt="Stripe"
                  width={50}
                  height={50}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src="/payload.png"
                  alt="Payload CMS"
                  width={50}
                  height={50}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src="/sanity.png"
                  alt="Sanity"
                  width={50}
                  height={50}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
                />
                <Image
                  src="/shopify.png"
                  alt="Shopify"
                  width={50}
                  height={50}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
                />
              </div>
            </div>
          </div>
        </WobbleCard>
      </div>
    </>
  );
}
