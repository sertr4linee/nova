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
    nav_services: "Services",
    nav_projects: "Projets",
    nav_contact: "Contact",
    hero_eyebrow: "klinkr · Est. 2026 · Paris",
    hero_line1: "VOTRE VISION.",
    hero_line2: "NOTRE CODE.",
    hero_sub: "Sites web sur-mesure pour créateurs indépendants, dirigeants et startups ambitieuses.",
    hero_cheaper: "Jusqu'à 50% moins cher.",
    hero_cta_projects: "Voir nos projets",
    hero_cta_talk: "Discutons →",
    hero_available: "Disponible pour de nouveaux projets",
    services_title_1: "CE QUE",
    services_title_2: "NOUS",
    services_title_3: "FAISONS",
    services_sub: "De la conception à la mise en ligne, nous gérons l'intégralité de votre projet digital.",
    projects_title_1: "NOS PROJETS",
    projects_title_2: "RÉCENTS",
    projects_sub: "Des expériences digitales uniques, conçues avec passion et expertise technique. Chaque projet, une nouvelle vision.",
    why_title_1: "POURQUOI",
    why_title_2: "NOUS CHOISIR",
    cta_title: "PRÊT À",
    cta_title2: "LANCER VOTRE PROJET ?",
    cta_sub: "Partagez votre idée — nous répondons sous 24h avec une estimation claire et un plan d'action.",
    cta_button: "Démarrer un projet",
    cta_secondary: "Voir nos tarifs →",
    footer_tagline: "L'agence digitale qui transforme vos idées en expériences mémorables.",
  },
  en: {
    nav_services: "Services",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_eyebrow: "klinkr · Est. 2026 · Paris",
    hero_line1: "YOUR VISION.",
    hero_line2: "OUR CODE.",
    hero_sub: "Tailor-made websites for independent creators, executives and ambitious startups.",
    hero_cheaper: "Up to 50% cheaper.",
    hero_cta_projects: "View our work",
    hero_cta_talk: "Let's talk →",
    hero_available: "Available for new projects",
    services_title_1: "WHAT",
    services_title_2: "WE",
    services_title_3: "DO",
    services_sub: "From design to launch, we handle every aspect of your digital project.",
    projects_title_1: "OUR RECENT",
    projects_title_2: "PROJECTS",
    projects_sub: "Unique digital experiences, crafted with passion and technical expertise. Each project, a new vision.",
    why_title_1: "WHY",
    why_title_2: "CHOOSE US",
    cta_title: "READY TO",
    cta_title2: "LAUNCH YOUR PROJECT?",
    cta_sub: "Share your idea — we respond within 24h with a clear estimate and action plan.",
    cta_button: "Start a project",
    cta_secondary: "See our pricing →",
    footer_tagline: "The digital agency that transforms your ideas into memorable experiences.",
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
    services_title_1: "WAT",
    services_title_2: "WIJ",
    services_title_3: "DOEN",
    services_sub: "Van ontwerp tot lancering, wij beheren elk aspect van uw digitaal project.",
    projects_title_1: "ONZE RECENTE",
    projects_title_2: "PROJECTEN",
    projects_sub: "Unieke digitale ervaringen, gemaakt met passie en technische expertise. Elk project, een nieuwe visie.",
    why_title_1: "WAAROM",
    why_title_2: "ONS KIEZEN",
    cta_title: "KLAAR OM",
    cta_title2: "UW PROJECT TE STARTEN?",
    cta_sub: "Deel uw idee — wij reageren binnen 24u met een duidelijke schatting en actieplan.",
    cta_button: "Project starten",
    cta_secondary: "Onze tarieven →",
    footer_tagline: "Het digitale bureau dat uw ideeën omzet in gedenkwaardige ervaringen.",
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
