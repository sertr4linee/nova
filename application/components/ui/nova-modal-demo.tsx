"use client"

import { NovaCarousel, NovaCard } from "@/components/ui/nova-modal"

const projects = [
  {
    src: "/dashboard.png",
    title: "E-commerce Luxe",
    category: "Développement Web",
    description: "Création d&#39;une plateforme e-commerce haut de gamme avec une expérience utilisateur exceptionnelle et des performances optimisées.",
    techStack: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Framer Motion"],
    projectUrl: "https://exemple-ecommerce.com",
    duration: "3 mois",
    location: "Paris, France",
    gallery: ["/dashboard.png", "/code.png", "/linear.webp"],
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Défis relevés</h3>
          <ul className="space-y-2 text-white/80">
            <li>• Optimisation des performances pour le mobile</li>
            <li>• Intégration de solutions de paiement sécurisées</li>
            <li>• Design responsive adaptatif</li>
            <li>• SEO technique avancé</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Résultats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold text-[#ffdab9]">+150%</p>
              <p className="text-sm text-white/60">Conversions</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold text-[#ffdab9]">98%</p>
              <p className="text-sm text-white/60">Score PageSpeed</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold text-[#ffdab9]">-40%</p>
              <p className="text-sm text-white/60">Temps de chargement</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    src: "/code.png",
    title: "Application SaaS",
    category: "Application Web",
    description: "Développement d&#39;une application SaaS complète avec tableau de bord analytique et gestion d&#39;équipe intégrée.",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    projectUrl: "https://exemple-saas.com",
    duration: "6 mois",
    location: "Remote",
    gallery: ["/code.png", "/dashboard.png"],
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Architecture</h3>
          <p className="text-white/80">
            Application construite avec une architecture microservices moderne, 
            garantissant scalabilité et maintienabilité. Déployée sur AWS avec 
            auto-scaling et monitoring 24/7.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Fonctionnalités</h3>
          <ul className="space-y-2 text-white/80">
            <li>• Dashboard analytics en temps réel</li>
            <li>• Gestion d&#39;équipes et permissions</li>
            <li>• API REST complète</li>
            <li>• Intégrations tierces</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    src: "/linear.webp",
    title: "Identité Visuelle",
    category: "Branding",
    description: "Création complète d&#39;une identité visuelle moderne pour une startup tech, incluant logo, charte graphique et supports.",
    techStack: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    duration: "2 mois",
    location: "Lyon, France",
    gallery: ["/linear.webp", "/nova.svg"],
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Concept créatif</h3>
          <p className="text-white/80">
            L&#39;identité visuelle s&#39;inspire des codes de l&#39;innovation technologique 
            tout en conservant une approche humaine et accessible. Les formes 
            géométriques épurées reflètent la précision et la modernité.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Livrables</h3>
          <ul className="space-y-2 text-white/80">
            <li>• Logo et déclinaisons</li>
            <li>• Charte graphique complète</li>
            <li>• Supports de communication</li>
            <li>• Guidelines d&#39;utilisation</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    src: "/dashboard.png",
    title: "Site Vitrine Premium",
    category: "Site Vitrine",
    description: "Site vitrine haut de gamme avec animations sur mesure et optimisation SEO avancée pour une agence d&#39;architecture.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Sanity CMS"],
    projectUrl: "https://exemple-vitrine.com",
    duration: "2 mois",
    location: "Marseille, France",
    gallery: ["/dashboard.png", "/linear.webp"],
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#ffdab9]">Approche design</h3>
          <p className="text-white/80">
            Design minimaliste mettant en valeur les projets architecturaux 
            avec des animations fluides et une navigation intuitive. 
            L&#39;expérience utilisateur a été pensée pour convertir les visiteurs en prospects.
          </p>
        </div>
      </div>
    ),
  },
]

export default function NovaModalDemo() {
  const cards = projects.map((project, index) => (
    <NovaCard key={project.title} card={project} index={index} layout={true} />
  ))

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nos Réalisations
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Découvrez nos projets les plus récents et plongez dans les détails 
            de nos créations digitales innovantes.
          </p>
        </div>
        
        <NovaCarousel items={cards} />
      </div>
    </div>
  )
}
