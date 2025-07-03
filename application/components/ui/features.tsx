import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Design moderne et responsive",
      description:
        "Des sites web qui s'adaptent parfaitement à tous les écrans et appareils pour une expérience utilisateur optimale.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Performance optimisée",
      description:
        "Vitesse de chargement ultrarapide et optimisation SEO pour un meilleur référencement sur Google.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Tarifs transparents",
      description:
        "Des prix justes et compétitifs sans frais cachés. Devis gratuit et sans engagement.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Hébergement fiable",
      description: "Hébergement sécurisé avec 99.9% de disponibilité garantie.",
      icon: <IconCloud />,
    },
    {
      title: "Technologies modernes",
      description: "Développement avec les dernières technologies : React, Next.js, et plus encore.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Support dédié",
      description:
        "Accompagnement personnalisé et support technique réactif pour tous vos projets.",
      icon: <IconHelp />,
    },
    {
      title: "Maintenance incluse",
      description:
        "Mises à jour de sécurité et maintenance technique incluses pendant 6 mois.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Satisfaction garantie",
      description: "Révisions illimitées jusqu'à votre entière satisfaction du projet final.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-white/10",
        (index === 0 || index === 4) && "lg:border-l border-white/10",
        index < 4 && "lg:border-b border-white/10"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-[#ffdab9]/5 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-[#ffdab9]/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#ffdab9] group-hover/feature:text-[#ffdab9] transition-colors duration-300">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-[#ffdab9] transition-all duration-300 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-white group-hover/feature:text-[#ffdab9] font-montserrat">
          {title}
        </span>
      </div>
      <p className="text-sm text-white/70 group-hover/feature:text-white/90 max-w-xs relative z-10 px-10 transition-colors duration-300 font-montserrat">
        {description}
      </p>
    </div>
  );
};
