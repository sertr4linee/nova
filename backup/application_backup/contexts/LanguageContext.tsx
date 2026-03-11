"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "en" | "nl";

export const languages = [
  { code: "fr" as Lang, label: "Français", flag: "🇫🇷", short: "FR" },
  { code: "en" as Lang, label: "English",  flag: "🇬🇧", short: "EN" },
  { code: "nl" as Lang, label: "Nederlands", flag: "🇳🇱", short: "NL" },
];

const translations = {
  fr: {
    // Navbar
    nav_services: "Services",
    nav_projects: "Projets",
    nav_contact: "Contact",

    // Hero
    hero_eyebrow: "klinkr · Est. 2026 · Amsterdam",
    hero_line1: "VOTRE VISION.",
    hero_line2: "NOTRE CODE.",
    hero_sub: "Sites web sur-mesure pour créateurs indépendants, dirigeants et startups ambitieuses.",
    hero_cheaper: "Jusqu'à 50% moins cher.",
    hero_cta_projects: "Voir nos projets",
    hero_cta_talk: "Discutons →",
    hero_available: "Disponible pour de nouveaux projets",

    // Section labels
    label_services: "Services",
    label_projects: "Réalisations",
    label_advantages: "Avantages",
    label_technologies: "Technologies",

    // Services section
    services_title_1: "CE QUE",
    services_title_2: "NOUS",
    services_title_3: "FAISONS",
    services_sub: "De la conception à la mise en ligne, nous gérons l'intégralité de votre projet digital.",
    s1_title: "Design sur mesure",
    s1_desc: "Identités visuelles qui captivent. Chaque pixel pensé pour votre marque et vos utilisateurs.",
    s2_title: "Développement Next.js",
    s2_desc: "Sites ultra-performants avec les dernières technologies React, TypeScript et Tailwind.",
    s3_title: "Performance & SEO",
    s3_desc: "Optimisation technique pour un référencement naturel de premier rang sur Google.",
    s4_title: "Support & Maintenance",
    s4_desc: "Accompagnement continu, mises à jour de sécurité et support réactif sous 24h.",

    // Projects section
    projects_title_1: "NOS PROJETS",
    projects_title_2: "RÉCENTS",
    projects_sub: "Des expériences digitales uniques, conçues avec passion et expertise technique. Chaque projet, une nouvelle vision.",

    // Stats
    stat1_label: "Projets livrés",
    stat1_desc: "Confiés par des entrepreneurs et créateurs exigeants.",
    stat2_label: "Satisfaction client",
    stat2_desc: "Taux maintenu sur l'ensemble de nos réalisations.",
    stat3_label: "Mois d'expérience",
    stat3_desc: "Ciblée en création de sites web sur-mesure et performants.",
    stat4_label: "Support réactif",
    stat4_desc: "Délai de réponse garanti de notre équipe technique.",

    // Features section
    why_title_1: "POURQUOI",
    why_title_2: "NOUS CHOISIR",
    feat1_title: "Design moderne",
    feat1_desc: "Sites responsifs qui s'adaptent à tous les écrans.",
    feat2_title: "Performance optimisée",
    feat2_desc: "Vitesse ultrarapide et SEO naturel renforcé.",
    feat3_title: "Tarifs transparents",
    feat3_desc: "Prix justes, sans frais cachés. Devis gratuit.",
    feat4_title: "Hébergement fiable",
    feat4_desc: "99.9% de disponibilité garantie.",
    feat5_title: "Technologies modernes",
    feat5_desc: "React, Next.js, TypeScript — le meilleur de l'écosystème.",
    feat6_title: "Support dédié",
    feat6_desc: "Accompagnement personnalisé pour chaque projet.",
    feat7_title: "Maintenance incluse",
    feat7_desc: "Sécurité et mises à jour incluses 6 mois.",
    feat8_title: "Satisfaction garantie",
    feat8_desc: "Révisions illimitées jusqu'à votre satisfaction.",

    // Tech / Wobble section
    tech_title_1: "L'ÉCOSYSTÈME",
    tech_title_2: "QUE NOUS MAÎTRISONS",
    wobble1_eyebrow: "Notre philosophie",
    wobble1_h1: "On ne crée pas juste des sites.",
    wobble1_h2: "On conçoit des expériences.",
    wobble1_p: "Performance, fluidité, esthétique — dans chaque pixel, chaque interaction.",
    wobble2_eyebrow: "Portée internationale",
    wobble2_h1: "Des projets qui traversent",
    wobble2_h2: "les frontières.",
    wobble2_p: "Clients en France, Europe et au-delà.",
    wobble3_eyebrow: "Stack technologique",
    wobble3_h: "Les meilleures technologies, au service de votre vision.",
    wobble3_p: "Next.js, React, TypeScript, Sanity, Payload, Stripe, Shopify — chaque projet bénéficie de l'écosystème le plus performant du moment.",

    // CTA section
    cta_eyebrow: "Commençons",
    cta_line1: "PRÊT À",
    cta_line2: "TRANSFORMER",
    cta_line3: "VOTRE PRÉSENCE",
    cta_line4: "DIGITALE ?",
    cta_btn_main: "Démarrer mon projet",
    cta_btn_projects: "Voir les projets",

    // Marquee
    mq_design: "Design",
    mq_dev: "Développement",
    mq_perf: "Performance",
    mq_eleg: "Élégance",
    mq_innov: "Innovation",

    // Footer
    footer_desc: "Agence digitale spécialisée en développement web sur-mesure pour entrepreneurs, créateurs et startups ambitieuses.",
    footer_available: "Disponible pour de nouveaux projets",
    footer_tagline: "L'agence digitale qui transforme vos idées en expériences mémorables.",
    footer_nav_label: "Navigation",
    footer_contact_label: "Contact",
    footer_nav_services: "Services",
    footer_nav_projects: "Réalisations",
    footer_nav_contact: "Contact",
    footer_legal_mentions: "Mentions légales",
    footer_legal_privacy: "Confidentialité",
    footer_legal_cgu: "CGU",
    footer_copyright: "Tous droits réservés.",
  },
  en: {
    nav_services: "Services",
    nav_projects: "Projects",
    nav_contact: "Contact",

    hero_eyebrow: "klinkr · Est. 2026 · Amsterdam",
    hero_line1: "YOUR VISION.",
    hero_line2: "OUR CODE.",
    hero_sub: "Tailor-made websites for independent creators, executives and ambitious startups.",
    hero_cheaper: "Up to 50% cheaper.",
    hero_cta_projects: "View our work",
    hero_cta_talk: "Let's talk →",
    hero_available: "Available for new projects",

    label_services: "Services",
    label_projects: "Projects",
    label_advantages: "Benefits",
    label_technologies: "Technologies",

    services_title_1: "WHAT",
    services_title_2: "WE",
    services_title_3: "DO",
    services_sub: "From design to launch, we handle every aspect of your digital project.",
    s1_title: "Custom Design",
    s1_desc: "Captivating visual identities. Every pixel crafted for your brand and your users.",
    s2_title: "Next.js Development",
    s2_desc: "Ultra-performant websites built with the latest React, TypeScript and Tailwind technologies.",
    s3_title: "Performance & SEO",
    s3_desc: "Technical optimization for top-tier organic ranking on Google.",
    s4_title: "Support & Maintenance",
    s4_desc: "Continuous support, security updates and reactive assistance within 24h.",

    projects_title_1: "OUR RECENT",
    projects_title_2: "PROJECTS",
    projects_sub: "Unique digital experiences, crafted with passion and technical expertise. Each project, a new vision.",

    stat1_label: "Projects delivered",
    stat1_desc: "Trusted by demanding entrepreneurs and creators.",
    stat2_label: "Client satisfaction",
    stat2_desc: "Rate maintained across all our projects.",
    stat3_label: "Months of experience",
    stat3_desc: "Focused on building custom, high-performance websites.",
    stat4_label: "Responsive support",
    stat4_desc: "Guaranteed response time from our technical team.",

    why_title_1: "WHY",
    why_title_2: "CHOOSE US",
    feat1_title: "Modern Design",
    feat1_desc: "Responsive sites that adapt to every screen.",
    feat2_title: "Optimized Performance",
    feat2_desc: "Ultra-fast speed and enhanced organic SEO.",
    feat3_title: "Transparent Pricing",
    feat3_desc: "Fair prices, no hidden fees. Free quote.",
    feat4_title: "Reliable Hosting",
    feat4_desc: "99.9% uptime guaranteed.",
    feat5_title: "Modern Technologies",
    feat5_desc: "React, Next.js, TypeScript — the best of the ecosystem.",
    feat6_title: "Dedicated Support",
    feat6_desc: "Personalized support for every project.",
    feat7_title: "Maintenance included",
    feat7_desc: "Security and updates included for 6 months.",
    feat8_title: "Satisfaction guaranteed",
    feat8_desc: "Unlimited revisions until you're satisfied.",

    tech_title_1: "THE ECOSYSTEM",
    tech_title_2: "WE MASTER",
    wobble1_eyebrow: "Our philosophy",
    wobble1_h1: "We don't just build websites.",
    wobble1_h2: "We craft experiences.",
    wobble1_p: "Performance, fluidity, aesthetics — in every pixel, every interaction.",
    wobble2_eyebrow: "International reach",
    wobble2_h1: "Projects that cross",
    wobble2_h2: "borders.",
    wobble2_p: "Clients in France, Europe and beyond.",
    wobble3_eyebrow: "Technology stack",
    wobble3_h: "The best technologies, serving your vision.",
    wobble3_p: "Next.js, React, TypeScript, Sanity, Payload, Stripe, Shopify — every project benefits from the most powerful ecosystem available.",

    cta_eyebrow: "Let's begin",
    cta_line1: "READY TO",
    cta_line2: "TRANSFORM",
    cta_line3: "YOUR DIGITAL",
    cta_line4: "PRESENCE?",
    cta_btn_main: "Start my project",
    cta_btn_projects: "View projects",

    mq_design: "Design",
    mq_dev: "Development",
    mq_perf: "Performance",
    mq_eleg: "Elegance",
    mq_innov: "Innovation",

    footer_desc: "Digital agency specialized in custom web development for entrepreneurs, creators and ambitious startups.",
    footer_available: "Available for new projects",
    footer_tagline: "The digital agency that transforms your ideas into memorable experiences.",
    footer_nav_label: "Navigation",
    footer_contact_label: "Contact",
    footer_nav_services: "Services",
    footer_nav_projects: "Projects",
    footer_nav_contact: "Contact",
    footer_legal_mentions: "Legal Notice",
    footer_legal_privacy: "Privacy",
    footer_legal_cgu: "Terms",
    footer_copyright: "All rights reserved.",
  },
  nl: {
    nav_services: "Diensten",
    nav_projects: "Projecten",
    nav_contact: "Contact",

    hero_eyebrow: "klinkr · Opgericht 2026 · Parijs",
    hero_line1: "UW VISIE.",
    hero_line2: "ONZE CODE.",
    hero_sub: "Maatwerk websites voor onafhankelijke makers, leidinggevenden en ambitieuze startups.",
    hero_cheaper: "Tot 50% goedkoper.",
    hero_cta_projects: "Onze projecten",
    hero_cta_talk: "Neem contact op →",
    hero_available: "Beschikbaar voor nieuwe projecten",

    label_services: "Diensten",
    label_projects: "Realisaties",
    label_advantages: "Voordelen",
    label_technologies: "Technologieën",

    services_title_1: "WAT",
    services_title_2: "WIJ",
    services_title_3: "DOEN",
    services_sub: "Van ontwerp tot lancering, wij beheren elk aspect van uw digitaal project.",
    s1_title: "Maatwerk Design",
    s1_desc: "Visuele identiteiten die boeien. Elke pixel bedacht voor uw merk en uw gebruikers.",
    s2_title: "Next.js Ontwikkeling",
    s2_desc: "Ultrasnelle websites met de nieuwste React, TypeScript en Tailwind technologieën.",
    s3_title: "Prestaties & SEO",
    s3_desc: "Technische optimalisatie voor een topklassering in Google.",
    s4_title: "Support & Onderhoud",
    s4_desc: "Doorlopende begeleiding, beveiligingsupdates en reactieve ondersteuning binnen 24u.",

    projects_title_1: "ONZE RECENTE",
    projects_title_2: "PROJECTEN",
    projects_sub: "Unieke digitale ervaringen, gemaakt met passie en technische expertise. Elk project, een nieuwe visie.",

    stat1_label: "Afgeronde projecten",
    stat1_desc: "Toevertrouwd door veeleisende ondernemers en makers.",
    stat2_label: "Klanttevredenheid",
    stat2_desc: "Score gehandhaafd over al onze realisaties.",
    stat3_label: "Maanden ervaring",
    stat3_desc: "Gericht op het bouwen van maatwerk, hoogwaardige websites.",
    stat4_label: "Responsieve support",
    stat4_desc: "Gegarandeerde reactietijd van ons technisch team.",

    why_title_1: "WAAROM",
    why_title_2: "ONS KIEZEN",
    feat1_title: "Modern Design",
    feat1_desc: "Responsieve sites die zich aanpassen aan elk scherm.",
    feat2_title: "Geoptimaliseerde Prestaties",
    feat2_desc: "Ultrasnelle laadtijd en verbeterde organische SEO.",
    feat3_title: "Transparante Prijzen",
    feat3_desc: "Eerlijke prijzen, geen verborgen kosten. Gratis offerte.",
    feat4_title: "Betrouwbare Hosting",
    feat4_desc: "99,9% uptime gegarandeerd.",
    feat5_title: "Moderne Technologieën",
    feat5_desc: "React, Next.js, TypeScript — het beste van het ecosysteem.",
    feat6_title: "Toegewijde Support",
    feat6_desc: "Persoonlijke begeleiding voor elk project.",
    feat7_title: "Onderhoud inbegrepen",
    feat7_desc: "Beveiliging en updates inbegrepen voor 6 maanden.",
    feat8_title: "Tevredenheid gegarandeerd",
    feat8_desc: "Onbeperkte revisies totdat u tevreden bent.",

    tech_title_1: "HET ECOSYSTEEM",
    tech_title_2: "DAT WIJ BEHEERSEN",
    wobble1_eyebrow: "Onze filosofie",
    wobble1_h1: "We bouwen niet alleen websites.",
    wobble1_h2: "We creëren ervaringen.",
    wobble1_p: "Prestaties, vloeiendheid, esthetiek — in elke pixel, elke interactie.",
    wobble2_eyebrow: "Internationaal bereik",
    wobble2_h1: "Projecten die grenzen",
    wobble2_h2: "overschrijden.",
    wobble2_p: "Klanten in Frankrijk, Europa en daarbuiten.",
    wobble3_eyebrow: "Technologiestack",
    wobble3_h: "De beste technologieën, ten dienste van uw visie.",
    wobble3_p: "Next.js, React, TypeScript, Sanity, Payload, Stripe, Shopify — elk project profiteert van het krachtigste ecosysteem beschikbaar.",

    cta_eyebrow: "Laten we beginnen",
    cta_line1: "KLAAR OM",
    cta_line2: "UW DIGITALE",
    cta_line3: "AANWEZIGHEID",
    cta_line4: "TE TRANSFORMEREN?",
    cta_btn_main: "Mijn project starten",
    cta_btn_projects: "Projecten bekijken",

    mq_design: "Design",
    mq_dev: "Ontwikkeling",
    mq_perf: "Prestaties",
    mq_eleg: "Elegantie",
    mq_innov: "Innovatie",

    footer_desc: "Digitaal bureau gespecialiseerd in maatwerk webontwikkeling voor ondernemers, makers en ambitieuze startups.",
    footer_available: "Beschikbaar voor nieuwe projecten",
    footer_tagline: "Het digitale bureau dat uw ideeën omzet in gedenkwaardige ervaringen.",
    footer_nav_label: "Navigatie",
    footer_contact_label: "Contact",
    footer_nav_services: "Diensten",
    footer_nav_projects: "Realisaties",
    footer_nav_contact: "Contact",
    footer_legal_mentions: "Juridische Mededeling",
    footer_legal_privacy: "Privacy",
    footer_legal_cgu: "Voorwaarden",
    footer_copyright: "Alle rechten voorbehouden.",
  },
};

type TranslationKey = keyof typeof translations.fr;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key) => translations.fr[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.fr[key];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
