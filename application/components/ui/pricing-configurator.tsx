"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Globe,
  ShoppingCart,
  Code,
  Shield,
  Database,
  Wrench,
  Zap,
  Palette,
  Search,
  Mail,
  BarChart3,
  Cloud,
  Check,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: "base" | "feature" | "extra";
  popular?: boolean;
}

const services: ServiceOption[] = [
  // Base options (only one can be selected)
  {
    id: "vitrine",
    name: "Site Vitrine",
    description: "Présentation professionnelle de votre activité",
    price: 490,
    icon: <Globe className="w-6 h-6" />,
    category: "base",
    popular: true
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Boutique en ligne complète avec paiements",
    price: 990,
    icon: <ShoppingCart className="w-6 h-6" />,
    category: "base"
  },
  {
    id: "webapp",
    name: "Application Web",
    description: "Solution sur mesure pour vos besoins",
    price: 1490,
    icon: <Code className="w-6 h-6" />,
    category: "base"
  },
  // Features (can select multiple)
  {
    id: "auth",
    name: "Authentification",
    description: "Connexion sécurisée, OAuth, 2FA",
    price: 190,
    icon: <Shield className="w-6 h-6" />,
    category: "feature"
  },
  {
    id: "api",
    name: "API REST",
    description: "Endpoints personnalisés et documentation",
    price: 290,
    icon: <Database className="w-6 h-6" />,
    category: "feature"
  },
  {
    id: "backend",
    name: "Backend Avancé",
    description: "Base de données, logique métier complexe",
    price: 390,
    icon: <Cloud className="w-6 h-6" />,
    category: "feature"
  },
  {
    id: "cms",
    name: "CMS Headless",
    description: "Gestion de contenu autonome",
    price: 290,
    icon: <Palette className="w-6 h-6" />,
    category: "feature",
    popular: true
  },
  {
    id: "seo",
    name: "SEO Avancé",
    description: "Optimisation moteurs de recherche",
    price: 150,
    icon: <Search className="w-6 h-6" />,
    category: "feature"
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Tableau de bord et métriques",
    price: 90,
    icon: <BarChart3 className="w-6 h-6" />,
    category: "feature"
  },
  // Extras
  {
    id: "performance",
    name: "Performance+",
    description: "Optimisation vitesse et Core Web Vitals",
    price: 150,
    icon: <Zap className="w-6 h-6" />,
    category: "extra"
  },
  {
    id: "emails",
    name: "Emails Transactionnels",
    description: "Templates et envoi automatisé",
    price: 120,
    icon: <Mail className="w-6 h-6" />,
    category: "extra"
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Support et mises à jour mensuelles",
    price: 49,
    icon: <Wrench className="w-6 h-6" />,
    category: "extra"
  }
];

const categoryLabels = {
  base: "Type de Projet",
  feature: "Fonctionnalités",
  extra: "Extras"
};

const categoryDescriptions = {
  base: "Choisissez la base de votre projet",
  feature: "Ajoutez les fonctionnalités dont vous avez besoin",
  extra: "Optimisez votre projet avec nos extras"
};

export function PricingConfigurator() {
  const router = useRouter();
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const handleRequestQuote = () => {
    if (!selectedBase) return;

    const selectedServices = [
      selectedBase,
      ...Array.from(selectedFeatures),
      ...Array.from(selectedExtras)
    ].map(id => services.find(s => s.id === id)?.name).filter(Boolean);

    const pricingData = {
      base: services.find(s => s.id === selectedBase)?.name || "",
      features: Array.from(selectedFeatures).map(id => services.find(s => s.id === id)?.name).filter(Boolean),
      extras: Array.from(selectedExtras).map(id => services.find(s => s.id === id)?.name).filter(Boolean),
      total: totalPrice,
      services: selectedServices
    };

    localStorage.setItem("pricingSelection", JSON.stringify(pricingData));
    router.push("/contact");
  };

  const toggleFeature = (id: string) => {
    const newFeatures = new Set(selectedFeatures);
    if (newFeatures.has(id)) {
      newFeatures.delete(id);
    } else {
      newFeatures.add(id);
    }
    setSelectedFeatures(newFeatures);
  };

  const toggleExtra = (id: string) => {
    const newExtras = new Set(selectedExtras);
    if (newExtras.has(id)) {
      newExtras.delete(id);
    } else {
      newExtras.add(id);
    }
    setSelectedExtras(newExtras);
  };

  const totalPrice = useMemo(() => {
    let total = 0;

    // Add base price
    const baseService = services.find(s => s.id === selectedBase);
    if (baseService) total += baseService.price;

    // Add features
    selectedFeatures.forEach(id => {
      const feature = services.find(s => s.id === id);
      if (feature) total += feature.price;
    });

    // Add extras
    selectedExtras.forEach(id => {
      const extra = services.find(s => s.id === id);
      if (extra) total += extra.price;
    });

    return total;
  }, [selectedBase, selectedFeatures, selectedExtras]);

  const selectedCount = (selectedBase ? 1 : 0) + selectedFeatures.size + selectedExtras.size;

  const isSelected = (id: string, category: string) => {
    if (category === "base") return selectedBase === id;
    if (category === "feature") return selectedFeatures.has(id);
    if (category === "extra") return selectedExtras.has(id);
    return false;
  };

  const handleSelect = (id: string, category: string) => {
    if (category === "base") {
      setSelectedBase(selectedBase === id ? null : id);
    } else if (category === "feature") {
      toggleFeature(id);
    } else if (category === "extra") {
      toggleExtra(id);
    }
  };

  const renderCategory = (category: "base" | "feature" | "extra") => {
    const categoryServices = services.filter(s => s.category === category);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: category === "base" ? 0 : category === "feature" ? 0.1 : 0.2 }}
        className="mb-8 sm:mb-10 md:mb-12"
      >
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-montserrat mb-1.5 sm:mb-2">
            {categoryLabels[category]}
          </h3>
          <p className="text-sm sm:text-base text-white/60 font-montserrat">
            {categoryDescriptions[category]}
          </p>
        </div>

        <div className={cn(
          "grid gap-3 sm:gap-4",
          category === "base" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {categoryServices.map((service) => {
            const selected = isSelected(service.id, category);

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => handleSelect(service.id, category)}
                className={cn(
                  "relative cursor-pointer rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300",
                  "border-2",
                  selected
                    ? "border-[#ffdab9] bg-[#ffdab9]/10"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10",
                  category === "base" && "min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {service.popular && (
                  <div className="absolute -top-2.5 sm:-top-3 left-3 sm:left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ffdab9] px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-black">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Populaire
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={cn(
                    "p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors duration-300",
                    selected ? "bg-[#ffdab9]/20 text-[#ffdab9]" : "bg-white/10 text-white/70"
                  )}>
                    {service.icon}
                  </div>

                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="p-1.5 sm:p-2 rounded-full bg-[#ffdab9]"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <h4 className={cn(
                  "text-base sm:text-lg font-semibold font-montserrat mb-1.5 sm:mb-2 transition-colors duration-300",
                  selected ? "text-[#ffdab9]" : "text-white"
                )}>
                  {service.name}
                </h4>

                <p className="text-xs sm:text-sm text-white/60 font-montserrat mb-3 sm:mb-4">
                  {service.description}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className={cn(
                    "text-xl sm:text-2xl font-bold font-montserrat transition-colors duration-300",
                    selected ? "text-[#ffdab9]" : "text-white"
                  )}>
                    {service.price}€
                  </span>
                  {service.id === "maintenance" && (
                    <span className="text-xs sm:text-sm text-white/50">/mois</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-1 sm:px-0">
      {/* Categories */}
      {renderCategory("base")}
      {renderCategory("feature")}
      {renderCategory("extra")}

      {/* Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="sticky bottom-2 sm:bottom-4 mt-8 sm:mt-10 md:mt-12"
      >
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#ffdab9]/30 bg-black/90 backdrop-blur-xl p-4 sm:p-5 md:p-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffdab9]/5 via-transparent to-[#ffdab9]/5" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-xs sm:text-sm text-white/60 font-montserrat mb-1">
                  {selectedCount} élément{selectedCount > 1 ? "s" : ""} sélectionné{selectedCount > 1 ? "s" : ""}
                </p>
                <div className="flex items-baseline justify-center sm:justify-start gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-white/60 font-montserrat">Total estimé:</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffdab9] font-montserrat"
                  >
                    {totalPrice.toLocaleString()}€
                  </motion.span>
                </div>
              </div>

              {selectedBase && (
                <div className="hidden md:block h-12 w-px bg-white/20" />
              )}

              {selectedBase && (
                <div className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start max-w-full overflow-hidden">
                  {[selectedBase, ...Array.from(selectedFeatures), ...Array.from(selectedExtras)].slice(0, 4).map(id => {
                    const service = services.find(s => s.id === id);
                    if (!service) return null;
                    return (
                      <motion.span
                        key={id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-xs sm:text-sm text-white/80 font-montserrat"
                      >
                        {service.name}
                      </motion.span>
                    );
                  })}
                  {selectedCount > 4 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 text-xs text-white/60 font-montserrat">
                      +{selectedCount - 4}
                    </span>
                  )}
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!selectedBase}
              onClick={handleRequestQuote}
              className={cn(
                "flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl font-montserrat font-semibold text-sm sm:text-base transition-all duration-300",
                selectedBase
                  ? "bg-[#ffdab9] text-black hover:bg-[#ffdab9]/90"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              )}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
