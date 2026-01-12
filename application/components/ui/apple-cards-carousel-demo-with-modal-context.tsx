"use client"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel-with-modal-context"
import { GlowText } from "@/components/ui/glow-text"

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />)

  return (
    <div className="w-full h-full py-5 sm:py-10">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        <GlowText 
          intensity="high" 
          glowColor="#ffdab9" 
          className="font-bold tracking-wide"
          animate={true}
          textColor="#ffdab9"
        >
          Nos projets 
        </GlowText>
      </h2>
      <Carousel items={cards} />
    </div>
  )
}

const DummyContent = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="space-y-4">
      <p className="text-white/80 leading-relaxed">
        <span className="font-semibold text-[#ffdab9]">{title}</span> {description}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <h4 className="font-medium text-white text-sm mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 bg-[#ffdab9] text-black text-xs rounded font-medium">React</span>
            <span className="px-2 py-0.5 bg-[#ffdab9] text-black text-xs rounded font-medium">Next.js</span>
            <span className="px-2 py-0.5 bg-[#ffdab9] text-black text-xs rounded font-medium">TypeScript</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <h4 className="font-medium text-white text-sm mb-2">Résultats</h4>
          <ul className="text-xs text-white/70 space-y-1">
            <li>+150% conversions</li>
            <li>Chargement optimisé</li>
            <li>UX intuitive</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const data = [
  {
    category: "E-commerce",
    title: "Boutique en ligne premium",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=3540&auto=format&fit=crop",
    content: (
      <DummyContent
        title="Une expérience d'achat exceptionnelle."
        description="Développement d'une plateforme e-commerce moderne avec gestion des stocks, paiements sécurisés et interface administrateur complète."
      />
    ),
  },
  {
    category: "Site Vitrine",
    title: "Identité digitale sur mesure",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3415&auto=format&fit=crop",
    content: (
      <DummyContent
        title="Une présence web qui marque les esprits."
        description="Création d'un site vitrine élégant avec animations fluides, optimisation SEO et design responsive pour une entreprise de luxe."
      />
    ),
  },
  {
    category: "Application Web",
    title: "Logiciel de gestion CRM",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop",
    content: (
      <DummyContent
        title="Optimisez votre gestion client."
        description="Développement d'une solution CRM complète avec tableau de bord analytique, gestion des leads et automatisation des processus."
      />
    ),
  },
  {
    category: "Identité Graphique",
    title: "Refonte complète de marque",
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=3464&auto=format&fit=crop",
    content: (
      <DummyContent
        title="Une identité visuelle forte et cohérente."
        description="Création d'un logo, charte graphique complète et déclinaison sur tous supports pour une startup tech innovante."
      />
    ),
  },
  {
    category: "Mobile App",
    title: "Application mobile native",
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=3540&auto=format&fit=crop",
    content: (
      <DummyContent
        title="L'expérience mobile parfaite."
        description="Développement d'une application mobile cross-platform avec notifications push, géolocalisation et synchronisation cloud."
      />
    ),
  },
  {
    category: "Dashboard",
    title: "Tableau de bord analytique",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop",
    content: (
      <DummyContent
        title="Visualisez vos données en temps réel."
        description="Interface de gestion avancée avec graphiques interactifs, rapports automatisés et alertes personnalisées pour le pilotage d'entreprise."
      />
    ),
  },
]
