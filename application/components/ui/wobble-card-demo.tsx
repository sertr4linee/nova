"use client";

import { WobbleCard } from "./wobble-card";
import { Globe } from "./globe";
import Image from "next/image";
import React from "react";


export function WobbleCardDemo() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 min-h-[500px] bg-black/35 bg-[url('/noise.webp')] bg-cover"
          noiseTintColor="#ffdab9"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-xl md:text-2xl lg:text-4xl font-serif italic font-semibold text-[#ffdab9]">
              On ne crée pas juste des sites. On conçoit des expériences.
            </h2>
            <p className="mt-4 text-left text-base text-neutral-200">
              Optimisation, fluidité, performance – dans chaque détail.
            </p>
          </div>
          <Image
            src="/code.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-3 lg:-right-[7%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 min-h-[500px] bg-[url('/noise.webp')] bg-cover"
        >
          <div className="max-w-xs">
            <h2 className="text-left text-xl md:text-2xl lg:text-4xl font-serif italic font-semibold text-[#ffdab9]">
              Conformité RGPD simplifiée
            </h2>
            <p className="mt-4 text-left text-base text-white">
              Protégez les données de vos utilisateurs sans vous perdre dans la
              réglementation.
            </p>
            <p className="mt-2 text-left text-base text-white">
              Notre expertise RGPD vous accompagne, où que vous soyez en Europe.
            </p>
          </div>
          <Globe className="absolute" />
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 min-h-[280px] bg-[#ffdab9] bg-[url('/noise.webp')] bg-cover"
          noiseTintColor="#ffdab9"
          noiseScale={1}
        >
          <div className="flex items-center justify-between h-full w-full p-8">
            <div className="flex flex-1 flex-col md:flex-row items-center justify-between w-full">
              <div className="max-w-md w-full md:w-auto mb-8 md:mb-0">
                <h2 className="text-left text-xl md:text-2xl lg:text-3xl font-serif italic font-semibold text-black/90 mb-4">
                  Technologies de pointe pour votre succès digital
                </h2>
                <p className="mt-4 text-left text-base text-neutral-800">
                  Nous maîtrisons les outils les plus performants du marché pour créer des solutions sur mesure et évolutives.
                </p>
                <p className="mt-2 text-left text-base text-neutral-800">
                  De l&apos;e-commerce aux CMS headless, chaque projet bénéficie du meilleur écosystème technologique.
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-8 justify-center items-center opacity-80">
                <Image
                  src="/nextjs.png"
                  alt="Next.js"
                  width={80}
                  height={80}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300"
                />
                <Image
                  src="/stripe.png"
                  alt="Stripe"
                  width={80}
                  height={80}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300"
                />
                <Image
                  src="/payload.png"
                  alt="Payload CMS"
                  width={80}
                  height={80}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300"
                />
                <Image
                  src="/sanity.png"
                  alt="Sanity"
                  width={80}
                  height={80}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300"
                />
                <Image
                  src="/shopify.png"
                  alt="Shopify"
                  width={80}
                  height={80}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300"
                />
                <Image
                  src="/nova.svg"
                  alt="Nova"
                  width={80}
                  height={80}
                  className="filter brightness-0 hover:brightness-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </WobbleCard>
      </div>
    </>
  );
}
