"use client";

import React from "react";
import { WobbleCard } from "./wobble-card";
import { Globe } from "./globe";
import Image from "next/image";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
  <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 min-h-[500px] bg-black/35 bg-[url('/noise.webp')] bg-cover"
        noiseTintColor="#ffdab9"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-xl md:text-2xl lg:text-4xl font-semibold text-white">
            Nos dernières réalisations
          </h2>
          <p className="mt-4 text-left text-base text-neutral-200">
            Découvrez nos projets réussis par notre équipe.
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
        <h2 className="text-left text-xl md:text-2xl lg:text-4xl font-semibold text-white">
          Nos services
        </h2>
        <p className="mt-4 text-left text-base text-neutral-200">
          Des solutions sur-mesure pour votre entreprise.
        </p>
        <Globe className="absolute -right-3 lg:-right-[7%] -bottom-10" />
      </WobbleCard>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 min-h-[600px] bg-[#ffdab9] bg-[url('/noise.webp')] bg-cover"
        noiseTintColor="#ffdab9"
      >
        <div className="max-w-sm">
          <h2 className="text-left text-xl md:text-2xl lg:text-4xl font-semibold text-black">
            Prêt à collaborer ?
          </h2>
          <p className="mt-4 text-left text-base text-black">
            Contactez-nous pour donner vie à vos idées.
          </p>
        </div>
        <Image
          src="/linear.webp"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
