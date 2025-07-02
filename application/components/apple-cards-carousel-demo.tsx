"use client"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />)

  return (
    <div className="w-full h-full py-10">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
        Découvrez nos <span className="text-[#ffdab9]">réalisations</span>
      </h2>
      <Carousel items={cards} />
    </div>
  )
}

const DummyContent = ({ title, description }: { title: string; description: string }) => {
  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => {
        return (
          <div key={"dummy-content" + index} className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">{title}</span> {description}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Technologies utilisées</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#ffdab9] text-black text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-[#ffdab9] text-black text-xs rounded">Next.js</span>
                  <span className="px-2 py-1 bg-[#ffdab9] text-black text-xs rounded">TypeScript</span>
                </div>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Résultats</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• +150% de conversions</li>
                  <li>• Temps de chargement optimisé</li>
                  <li>• Interface intuitive</li>
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </>
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
