"use client";
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

function ProjectDetail({
  tags,
  desc,
  results,
}: {
  tags: string[];
  desc: string;
  results: string[];
}) {
  return (
    <div className="bg-[#0a0a0a] border border-[#fdd9b9]/15 p-8 md:p-12 rounded-2xl">
      <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-light">
        {desc}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 border border-[#fdd9b9]/25 text-[#fdd9b9]/70 text-[10px] tracking-[0.25em] uppercase rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="space-y-2">
        {results.map((r) => (
          <li key={r} className="flex items-start gap-3 text-white/35 text-sm font-light">
            <span className="text-[#fdd9b9]/50 mt-0.5 text-xs">→</span>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

const data = [
  {
    category: "E-commerce",
    title: "Maison Élise — Boutique luxe",
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    content: (
      <ProjectDetail
        tags={["Next.js 15", "Shopify", "TypeScript", "Framer Motion"]}
        desc="Refonte complète d'une boutique de mode haut de gamme. Expérience d'achat immersive, galerie plein-écran, paiement en 1 clic et performance Core Web Vitals au vert."
        results={[
          "+220% de conversions en 3 mois",
          "Score Lighthouse 98/100",
          "Panier moyen +45%",
        ]}
      />
    ),
  },
  {
    category: "Site Vitrine",
    title: "Arcane Studio — Portfolio créatif",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    content: (
      <ProjectDetail
        tags={["Next.js", "GSAP", "Three.js", "Sanity CMS"]}
        desc="Site vitrine pour un studio de design 3D parisien. Animations WebGL, navigation expérimentale et CMS headless pour une autonomie totale sur le contenu."
        results={[
          "Primé aux Awwwards 2024",
          "+400% de demandes entrantes",
          "Temps de chargement < 1.2s",
        ]}
      />
    ),
  },
  {
    category: "SaaS Dashboard",
    title: "FlowMetrics — Analytics B2B",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    content: (
      <ProjectDetail
        tags={["Next.js", "Payload CMS", "Recharts", "Prisma", "PostgreSQL"]}
        desc="Interface de pilotage pour une startup analytics. Graphiques temps réel, exports PDF automatisés, gestion multi-workspace et onboarding guidé."
        results={[
          "Churn réduit de 60% post-lancement",
          "NPS utilisateur : 72",
          "Rétention J30 : 84%",
        ]}
      />
    ),
  },
  {
    category: "Landing Page",
    title: "Vault — App fintech",
    src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    content: (
      <ProjectDetail
        tags={["Next.js", "Stripe", "Framer Motion", "TypeScript"]}
        desc="Landing page conversion-first pour une app d'épargne automatisée. Micro-animations, social proof dynamique et tunnel d'inscription optimisé pour mobile."
        results={[
          "Taux de conversion : 11.4%",
          "12 000 inscrits en 2 semaines",
          "CPA réduit de 38%",
        ]}
      />
    ),
  },
  {
    category: "Identité Digitale",
    title: "Nōma — Restaurant étoilé",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    content: (
      <ProjectDetail
        tags={["Next.js", "Sanity", "Framer Motion", "i18n"]}
        desc="Présence digitale complète pour un restaurant gastronomique : site bilingue, réservation en ligne intégrée, galerie photographique immersive et newsletter."
        results={[
          "Réservations en ligne +180%",
          "Trafic organique ×3 en 6 mois",
          "Prix Web Excellence 2024",
        ]}
      />
    ),
  },
];
