"use client";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel-with-modal-context";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-2">
      <Carousel items={cards} />
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 border border-[#fdd9b9]/20 text-[#fdd9b9]/60 text-[9px] tracking-[0.25em] uppercase"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      {label}
    </span>
  );
}

function Result({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-white/45 text-sm font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <span className="text-[#fdd9b9]/50 mt-0.5 flex-shrink-0">→</span>
      {text}
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p
        className="text-[#fdd9b9]/40 text-[8px] tracking-[0.45em] uppercase mb-3"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-[#fdd9b9]/8 my-7" />;
}

/* ─── PROJET 1 — Beldy's Club ─────────────────────────────────────────────── */

const BeldysContent = () => (
  <div>
    {/* ── Photo gallery ── */}
    <div className="mb-8 space-y-3">
      {/* Hero shot */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src="/beldysweb/hero.png"
          alt="Beldy's — Hero"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
      <p className="text-[#fdd9b9]/35 text-[8px] tracking-[0.3em] uppercase font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Un hero plein-écran qui impose Beldy's comme une référence gastronomique à Monaco — identité forte, impact immédiat.
      </p>

      {/* 2-col grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-2">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
            <Image
              src="/beldysweb/shop.png"
              alt="Beldy's — Menu"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 350px"
            />
          </div>
          <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Menu filtré par catégories · 3 clics du choix au panier
          </p>
        </div>
        <div className="space-y-2">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
            <Image
              src="/beldysweb/order.png"
              alt="Beldy's — Commandes"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 350px"
            />
          </div>
          <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Espace client · Suivi de commande en temps réel · Factures accessibles
          </p>
        </div>
      </div>
    </div>

    <Divider />

    <Section title="Le défi">
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Beldy's Club — le réseau de restaurants premium de Monaco — n'avait aucune présence digitale unifiée. Quatre restaurants, zéro commande en ligne, et une clientèle habituée à l'excellence. Ils avaient besoin d'une plateforme qui reflète leur positionnement haut de gamme tout en étant simple et rapide à l'usage.
      </p>
    </Section>

    <Divider />

    <Section title="Notre solution">
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Nous avons conçu et développé une plateforme full-stack avec menu dynamique, panier en temps réel, paiement Stripe intégré et interface d'administration dédiée pour chaque restaurant. L'expérience utilisateur a été pensée pour mobile en priorité.
      </p>
    </Section>

    <Divider />

    <Section title="Stack technique">
      <div className="flex flex-wrap gap-2">
        {["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Framer Motion"].map(t => <Tag key={t} label={t} />)}
      </div>
    </Section>

    <Divider />

    <Section title="Résultats">
      <ul className="space-y-2.5">
        <Result text="+35% de commandes en ligne dès le 1er mois" />
        <Result text="Temps moyen de commande réduit à 2 minutes" />
        <Result text="98% de satisfaction client — noté 4.9/5" />
        <Result text="4 restaurants connectés, livraison estimée &lt;30 min" />
      </ul>
    </Section>

    <div className="pt-2">
      <a
        href="https://beldys.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[#fdd9b9]/30 text-[#fdd9b9] px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-300"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Voir le site →
      </a>
    </div>
  </div>
);

/* ─── PROJET 2 — Beldy's App iOS & Android ────────────────────────────────── */

const BeldysAppContent = () => (
  <div>
    {/* ── Mockup hero ── */}
    <div className="relative w-full h-[200px] sm:h-[240px] mb-3 overflow-hidden bg-[#0d0d0d] flex items-center justify-center">
      <Image
        src="/mockup.png"
        alt="Beldy's App mockup"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 600px"
      />
    </div>
    <p className="text-[#fdd9b9]/35 text-[8px] tracking-[0.3em] uppercase font-light mb-6" style={{ fontFamily: "var(--font-dm-sans)" }}>
      Vue d'ensemble de l'application — disponible sur iOS & Android.
    </p>

    {/* ── 2-col phone screens ── */}
    <div className="grid grid-cols-2 gap-3 mb-8">
      <div className="space-y-2">
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#0d0d0d]">
          <Image
            src="/app/home.png"
            alt="Beldy's App — Accueil"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 300px"
          />
        </div>
        <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Accueil · Livraison premium Monaco · Restaurants à proximité
        </p>
      </div>
      <div className="space-y-2">
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#0d0d0d]">
          <Image
            src="/app/cart.png"
            alt="Beldy's App — Panier"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 300px"
          />
        </div>
        <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Panier · Adresse & délai affichés avant paiement · Zéro friction
        </p>
      </div>
    </div>

    <Divider />

    <Section title="Le défi">
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Fort du succès de la plateforme web, Beldy's Club voulait aller plus loin : une application mobile native pour iOS et Android, avec notifications push pour les promotions quotidiennes et suivi de livraison en temps réel.
      </p>
    </Section>

    <Divider />

    <Section title="Notre solution">
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Application React Native cross-platform déployée simultanément sur l'App Store et le Google Play Store. Géolocalisation pour afficher le restaurant le plus proche, paiement Apple Pay et Google Pay intégré en 1 tap, et notifications Expo Push pour les offres exclusives du jour.
      </p>
    </Section>

    <Divider />

    <Section title="Stack technique">
      <div className="flex flex-wrap gap-2">
        {["React Native", "Expo", "TypeScript", "Stripe", "Firebase", "Apple Pay", "Google Pay"].map(t => <Tag key={t} label={t} />)}
      </div>
    </Section>

    <Divider />

    <Section title="Résultats">
      <ul className="space-y-2.5">
        <Result text="5 000+ téléchargements en 2 mois post-lancement" />
        <Result text="Note 4.8 / 5 sur l'App Store" />
        <Result text="60% des commandes passent désormais par l'app" />
        <Result text="Taux de rétention J30 : 71%" />
      </ul>
    </Section>

    <div className="flex flex-wrap gap-3 pt-2">
      <a
        href="https://beldys.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[#fdd9b9]/30 text-[#fdd9b9] px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-300"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        🍎 App Store
      </a>
      <a
        href="https://beldys.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-white/10 text-white/35 px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:border-[#fdd9b9]/30 hover:text-[#fdd9b9] transition-all duration-300"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        🤖 Google Play
      </a>
    </div>
  </div>
);

/* ─── PROJET 3 — WelkomHome ────────────────────────────────────────────────── */

const WelkomHomeContent = () => (
  <div>
    <Section title="Le défi">
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Yohan & Shirley, fondateurs de WelkomHome à Saint-Tropez, proposent une sélection exclusive de villas de prestige sur la Côte d'Azur. Leur ancien site ne reflétait pas l'exclusivité de leurs propriétés et ne généraient pas assez de leads qualifiés. Ils avaient besoin d'un site qui parle d'abord aux émotions.
      </p>
    </Section>

    <Divider />

    <Section title="Notre solution">
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Site vitrine haut de gamme avec animations immersives au scroll, galerie plein-écran des villas, formulaire de contact qualifié et intégration CMS Sanity pour une autonomie totale sur les contenus. Chaque ligne de code a été pensée pour inspirer confiance et désir.
      </p>
    </Section>

    <Divider />

    <Section title="Stack technique">
      <div className="flex flex-wrap gap-2">
        {["Next.js", "TypeScript", "Framer Motion", "Sanity CMS", "Vercel", "Tailwind CSS"].map(t => <Tag key={t} label={t} />)}
      </div>
    </Section>

    <Divider />

    <Section title="Résultats">
      <ul className="space-y-2.5">
        <Result text="+40% de demandes de réservation en 3 mois" />
        <Result text="Taux de rebond réduit de 65% → 28%" />
        <Result text="Temps moyen sur le site doublé (1:20 → 3:05)" />
        <Result text="Top 3 Google pour 'location villa luxe Saint-Tropez'" />
      </ul>
    </Section>

    <div className="pt-2">
      <a
        href="https://www-rust-iota.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[#fdd9b9]/30 text-[#fdd9b9] px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-300"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Voir le site →
      </a>
    </div>
  </div>
);

/* ─── DATA ──────────────────────────────────────────────────────────────────── */

const data = [
  {
    category: "Site Web · Food Tech · Monaco",
    title: "Beldy's Club",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop",
    content: <BeldysContent />,
  },
  {
    category: "Application Mobile · iOS & Android",
    title: "Beldy's App",
    src: "/mockup.png",
    content: <BeldysAppContent />,
  },
  {
    category: "Site Vitrine · Luxe · Côte d'Azur",
    title: "WelkomHome",
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop",
    content: <WelkomHomeContent />,
  },
];
