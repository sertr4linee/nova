"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ───────────────────────────────────────────────────────────────────

type FeatureItem = {
  id: string;
  icon: string;
  label: { fr: string; en: string; nl: string };
  desc: { fr: string; en: string; nl: string };
  price: number;
  tag?: { fr: string; en: string; nl: string };
};

type Step = {
  id: string;
  titleKey: "ctr_step1_title" | "ctr_step2_title" | "ctr_step3_title" | "ctr_step4_title" | "ctr_step5_title" | "ctr_step6_title" | "ctr_step7_title";
  descKey: "ctr_step1_desc" | "ctr_step2_desc" | "ctr_step3_desc" | "ctr_step4_desc" | "ctr_step5_desc" | "ctr_step6_desc" | "ctr_step7_desc";
  multi: boolean;
  features: FeatureItem[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECT_TYPES: FeatureItem[] = [
  {
    id: "landing",
    icon: "🏠",
    label: { fr: "Landing Page", en: "Landing Page", nl: "Landingspagina" },
    desc: { fr: "Page vitrine percutante, conversion optimisée", en: "High-impact showcase page, conversion-optimized", nl: "Krachtige vitrinepagina, conversie-geoptimaliseerd" },
    price: 500,
  },
  {
    id: "portfolio",
    icon: "🎨",
    label: { fr: "Portfolio / Vitrine", en: "Portfolio / Showcase", nl: "Portfolio / Vitrine" },
    desc: { fr: "Site multi-pages pour présenter votre travail", en: "Multi-page site to showcase your work", nl: "Meerpagina-site om uw werk te presenteren" },
    price: 800,
  },
  {
    id: "blog",
    icon: "✍️",
    label: { fr: "Blog / Magazine", en: "Blog / Magazine", nl: "Blog / Magazine" },
    desc: { fr: "Contenu éditorial avec CMS intégré", en: "Editorial content with built-in CMS", nl: "Redactionele inhoud met ingebouwd CMS" },
    price: 1200,
  },
  {
    id: "saas",
    icon: "⚡",
    label: { fr: "Application SaaS", en: "SaaS Application", nl: "SaaS-applicatie" },
    desc: { fr: "Dashboard, abonnements, logique métier complexe", en: "Dashboard, subscriptions, complex business logic", nl: "Dashboard, abonnementen, complexe bedrijfslogica" },
    price: 2000,
    tag: { fr: "Populaire", en: "Popular", nl: "Populair" },
  },
  {
    id: "ecommerce",
    icon: "🛍️",
    label: { fr: "E-commerce", en: "E-commerce", nl: "E-commerce" },
    desc: { fr: "Catalogue produits, panier, paiement, gestion commandes", en: "Product catalog, cart, payment, order management", nl: "Productcatalogus, winkelwagen, betaling, orderbeheer" },
    price: 2500,
  },
  {
    id: "custom",
    icon: "🚀",
    label: { fr: "Application Custom", en: "Custom Application", nl: "Aangepaste applicatie" },
    desc: { fr: "Projet unique avec architecture sur-mesure", en: "Unique project with custom architecture", nl: "Uniek project met op maat gemaakte architectuur" },
    price: 4000,
    tag: { fr: "Premium", en: "Premium", nl: "Premium" },
  },
];

const AUTH_FEATURES: FeatureItem[] = [
  {
    id: "email_pass",
    icon: "🔑",
    label: { fr: "Email / Mot de passe", en: "Email / Password", nl: "E-mail / Wachtwoord" },
    desc: { fr: "Inscription et connexion classique", en: "Classic registration and login", nl: "Klassieke registratie en login" },
    price: 100,
  },
  {
    id: "magic_link",
    icon: "✨",
    label: { fr: "Magic Link", en: "Magic Link", nl: "Magic Link" },
    desc: { fr: "Connexion sans mot de passe par email", en: "Passwordless login via email", nl: "Wachtwoordloze login via e-mail" },
    price: 80,
  },
  {
    id: "oauth_google",
    icon: "🔵",
    label: { fr: "Google OAuth", en: "Google OAuth", nl: "Google OAuth" },
    desc: { fr: "Connexion avec compte Google", en: "Sign in with Google", nl: "Inloggen met Google" },
    price: 50,
  },
  {
    id: "oauth_github",
    icon: "⚫",
    label: { fr: "GitHub OAuth", en: "GitHub OAuth", nl: "GitHub OAuth" },
    desc: { fr: "Connexion avec compte GitHub", en: "Sign in with GitHub", nl: "Inloggen met GitHub" },
    price: 50,
  },
  {
    id: "oauth_apple",
    icon: "🍎",
    label: { fr: "Apple Sign In", en: "Apple Sign In", nl: "Apple Sign In" },
    desc: { fr: "Connexion avec identifiant Apple (obligatoire iOS)", en: "Sign in with Apple (required for iOS)", nl: "Inloggen met Apple (verplicht voor iOS)" },
    price: 80,
  },
  {
    id: "oauth_meta",
    icon: "🔷",
    label: { fr: "Meta (Facebook/Instagram)", en: "Meta (Facebook/Instagram)", nl: "Meta (Facebook/Instagram)" },
    desc: { fr: "Connexion via compte Meta", en: "Sign in with Meta account", nl: "Inloggen met Meta-account" },
    price: 50,
  },
  {
    id: "oauth_twitter",
    icon: "🐦",
    label: { fr: "Twitter / X", en: "Twitter / X", nl: "Twitter / X" },
    desc: { fr: "Connexion avec compte X", en: "Sign in with X account", nl: "Inloggen met X-account" },
    price: 50,
  },
  {
    id: "oauth_linkedin",
    icon: "💼",
    label: { fr: "LinkedIn OAuth", en: "LinkedIn OAuth", nl: "LinkedIn OAuth" },
    desc: { fr: "Connexion avec compte LinkedIn", en: "Sign in with LinkedIn", nl: "Inloggen met LinkedIn" },
    price: 50,
  },
  {
    id: "oauth_discord",
    icon: "🟣",
    label: { fr: "Discord OAuth", en: "Discord OAuth", nl: "Discord OAuth" },
    desc: { fr: "Connexion avec compte Discord", en: "Sign in with Discord", nl: "Inloggen met Discord" },
    price: 40,
  },
  {
    id: "oauth_microsoft",
    icon: "🪟",
    label: { fr: "Microsoft / Azure AD", en: "Microsoft / Azure AD", nl: "Microsoft / Azure AD" },
    desc: { fr: "Connexion entreprise via Microsoft", en: "Enterprise sign-in via Microsoft", nl: "Zakelijke login via Microsoft" },
    price: 80,
  },
  {
    id: "two_fa",
    icon: "🛡️",
    label: { fr: "2FA / TOTP", en: "2FA / TOTP", nl: "2FA / TOTP" },
    desc: { fr: "Double authentification (Google Authenticator, Authy...)", en: "Two-factor auth (Google Authenticator, Authy...)", nl: "Tweefactorauthenticatie (Google Authenticator, Authy...)" },
    price: 150,
    tag: { fr: "Sécurité", en: "Security", nl: "Beveiliging" },
  },
  {
    id: "sso",
    icon: "🏢",
    label: { fr: "SSO / SAML Enterprise", en: "SSO / SAML Enterprise", nl: "SSO / SAML Enterprise" },
    desc: { fr: "Authentification centralisée pour grandes organisations", en: "Centralized auth for large organizations", nl: "Gecentraliseerde auth voor grote organisaties" },
    price: 600,
    tag: { fr: "Enterprise", en: "Enterprise", nl: "Enterprise" },
  },
  {
    id: "rbac",
    icon: "👥",
    label: { fr: "Rôles & Permissions (RBAC)", en: "Roles & Permissions (RBAC)", nl: "Rollen & Rechten (RBAC)" },
    desc: { fr: "Gestion fine des droits utilisateurs", en: "Fine-grained user rights management", nl: "Gedetailleerd gebruikersrechtenbeheer" },
    price: 200,
  },
];

const API_FEATURES: FeatureItem[] = [
  {
    id: "rest",
    icon: "🔗",
    label: { fr: "REST API", en: "REST API", nl: "REST API" },
    desc: { fr: "API RESTful standard, documentation Swagger", en: "Standard RESTful API with Swagger docs", nl: "Standaard RESTful API met Swagger-documentatie" },
    price: 300,
  },
  {
    id: "graphql",
    icon: "◉",
    label: { fr: "GraphQL", en: "GraphQL", nl: "GraphQL" },
    desc: { fr: "API flexible, queries précises, subscriptions", en: "Flexible API, precise queries, subscriptions", nl: "Flexibele API, precieze queries, subscriptions" },
    price: 500,
    tag: { fr: "Avancé", en: "Advanced", nl: "Geavanceerd" },
  },
  {
    id: "trpc",
    icon: "⚙️",
    label: { fr: "tRPC (TypeSafe)", en: "tRPC (TypeSafe)", nl: "tRPC (TypeSafe)" },
    desc: { fr: "API full-stack type-safe, idéal avec Next.js", en: "Full-stack type-safe API, ideal with Next.js", nl: "Volledige stack type-veilige API, ideaal met Next.js" },
    price: 400,
  },
  {
    id: "websockets",
    icon: "⚡",
    label: { fr: "WebSockets", en: "WebSockets", nl: "WebSockets" },
    desc: { fr: "Communication bidirectionnelle temps réel", en: "Real-time bidirectional communication", nl: "Real-time bidirectionele communicatie" },
    price: 250,
  },
  {
    id: "realtime",
    icon: "🔴",
    label: { fr: "Subscriptions temps réel", en: "Real-time subscriptions", nl: "Real-time subscriptions" },
    desc: { fr: "Mises à jour live (chat, notifications, dashboards)", en: "Live updates (chat, notifications, dashboards)", nl: "Live updates (chat, meldingen, dashboards)" },
    price: 300,
  },
  {
    id: "webhooks",
    icon: "🔔",
    label: { fr: "Webhooks", en: "Webhooks", nl: "Webhooks" },
    desc: { fr: "Événements sortants vers services tiers", en: "Outbound events to third-party services", nl: "Uitgaande events naar externe diensten" },
    price: 120,
  },
  {
    id: "admin",
    icon: "🖥️",
    label: { fr: "Panel d'administration", en: "Admin Panel", nl: "Beheerpaneel" },
    desc: { fr: "Interface back-office complète", en: "Complete back-office interface", nl: "Volledig back-office interface" },
    price: 800,
    tag: { fr: "Inclut UI", en: "Includes UI", nl: "Inclusief UI" },
  },
  {
    id: "multi_tenant",
    icon: "🏗️",
    label: { fr: "Multi-tenant", en: "Multi-tenant", nl: "Multi-tenant" },
    desc: { fr: "Architecture isolée par organisation/client", en: "Isolated architecture per org/client", nl: "Geïsoleerde architectuur per organisatie/klant" },
    price: 1200,
    tag: { fr: "Complexe", en: "Complex", nl: "Complex" },
  },
];

const DB_FEATURES: FeatureItem[] = [
  {
    id: "postgres",
    icon: "🐘",
    label: { fr: "PostgreSQL", en: "PostgreSQL", nl: "PostgreSQL" },
    desc: { fr: "Base relationnelle robuste et scalable", en: "Robust and scalable relational database", nl: "Robuuste en schaalbare relationele database" },
    price: 120,
  },
  {
    id: "supabase",
    icon: "⚡",
    label: { fr: "Supabase", en: "Supabase", nl: "Supabase" },
    desc: { fr: "PostgreSQL managé + Auth + Storage tout-en-un", en: "Managed PostgreSQL + Auth + Storage all-in-one", nl: "Managed PostgreSQL + Auth + Storage alles-in-één" },
    price: 150,
    tag: { fr: "Recommandé", en: "Recommended", nl: "Aanbevolen" },
  },
  {
    id: "firebase",
    icon: "🔥",
    label: { fr: "Firebase / Firestore", en: "Firebase / Firestore", nl: "Firebase / Firestore" },
    desc: { fr: "NoSQL temps réel, idéal pour apps mobiles", en: "Real-time NoSQL, ideal for mobile apps", nl: "Real-time NoSQL, ideaal voor mobiele apps" },
    price: 150,
  },
  {
    id: "mongodb",
    icon: "🍃",
    label: { fr: "MongoDB Atlas", en: "MongoDB Atlas", nl: "MongoDB Atlas" },
    desc: { fr: "NoSQL flexible, schéma dynamique", en: "Flexible NoSQL, dynamic schema", nl: "Flexibel NoSQL, dynamisch schema" },
    price: 150,
  },
  {
    id: "planetscale",
    icon: "🪐",
    label: { fr: "PlanetScale / Neon", en: "PlanetScale / Neon", nl: "PlanetScale / Neon" },
    desc: { fr: "MySQL/PostgreSQL serverless ultra scalable", en: "Serverless MySQL/PostgreSQL, ultra scalable", nl: "Serverless MySQL/PostgreSQL, ultra schaalbaar" },
    price: 150,
  },
  {
    id: "redis",
    icon: "🔴",
    label: { fr: "Redis / Cache", en: "Redis / Cache", nl: "Redis / Cache" },
    desc: { fr: "Cache in-memory, sessions, file d'attente", en: "In-memory cache, sessions, queues", nl: "In-memory cache, sessies, wachtrijen" },
    price: 120,
  },
  {
    id: "s3_storage",
    icon: "🗄️",
    label: { fr: "Stockage fichiers (S3 / R2)", en: "File storage (S3 / R2)", nl: "Bestandsopslag (S3 / R2)" },
    desc: { fr: "Stockage objet sécurisé, CDN inclus", en: "Secure object storage with CDN", nl: "Veilige objectopslag met CDN" },
    price: 100,
  },
  {
    id: "cloudinary",
    icon: "🖼️",
    label: { fr: "Cloudinary (images & vidéos)", en: "Cloudinary (images & videos)", nl: "Cloudinary (afbeeldingen & video's)" },
    desc: { fr: "Optimisation et transformation d'assets", en: "Asset optimization and transformation", nl: "Asset-optimalisatie en -transformatie" },
    price: 100,
  },
];

const COMM_FEATURES: FeatureItem[] = [
  {
    id: "transac_email",
    icon: "📧",
    label: { fr: "Emails transactionnels", en: "Transactional emails", nl: "Transactionele e-mails" },
    desc: { fr: "Confirmation, reset password, alertes (Resend / SendGrid)", en: "Confirmation, password reset, alerts (Resend / SendGrid)", nl: "Bevestiging, wachtwoord reset, meldingen (Resend / SendGrid)" },
    price: 120,
  },
  {
    id: "newsletter",
    icon: "📨",
    label: { fr: "Newsletter / Campagnes email", en: "Newsletter / Email campaigns", nl: "Nieuwsbrief / E-mailcampagnes" },
    desc: { fr: "Segmentation, automatisations, analytics (Mailchimp, Loops)", en: "Segmentation, automations, analytics (Mailchimp, Loops)", nl: "Segmentatie, automatiseringen, analytics (Mailchimp, Loops)" },
    price: 200,
  },
  {
    id: "sms",
    icon: "📱",
    label: { fr: "SMS / Notifications téléphoniques", en: "SMS / Phone notifications", nl: "SMS / Telefonische meldingen" },
    desc: { fr: "OTP, alertes, marketing (Twilio, Vonage)", en: "OTP, alerts, marketing (Twilio, Vonage)", nl: "OTP, meldingen, marketing (Twilio, Vonage)" },
    price: 200,
  },
  {
    id: "push",
    icon: "🔔",
    label: { fr: "Push Notifications", en: "Push Notifications", nl: "Push-meldingen" },
    desc: { fr: "Web push et push mobile (FCM, OneSignal)", en: "Web push and mobile push (FCM, OneSignal)", nl: "Web push en mobiele push (FCM, OneSignal)" },
    price: 180,
  },
  {
    id: "chat",
    icon: "💬",
    label: { fr: "Chat temps réel", en: "Real-time chat", nl: "Real-time chat" },
    desc: { fr: "Messagerie instantanée entre utilisateurs", en: "Instant messaging between users", nl: "Directe berichten tussen gebruikers" },
    price: 600,
    tag: { fr: "Avancé", en: "Advanced", nl: "Geavanceerd" },
  },
  {
    id: "contact_form",
    icon: "📝",
    label: { fr: "Formulaire de contact", en: "Contact form", nl: "Contactformulier" },
    desc: { fr: "Formulaire simple avec validation et envoi email", en: "Simple form with validation and email delivery", nl: "Eenvoudig formulier met validatie en e-mailbezorging" },
    price: 50,
  },
];

const INTEGRATION_FEATURES: FeatureItem[] = [
  {
    id: "stripe",
    icon: "💳",
    label: { fr: "Stripe", en: "Stripe", nl: "Stripe" },
    desc: { fr: "Paiements, abonnements, invoicing", en: "Payments, subscriptions, invoicing", nl: "Betalingen, abonnementen, facturering" },
    price: 400,
    tag: { fr: "Recommandé", en: "Recommended", nl: "Aanbevolen" },
  },
  {
    id: "paypal",
    icon: "🅿️",
    label: { fr: "PayPal / Braintree", en: "PayPal / Braintree", nl: "PayPal / Braintree" },
    desc: { fr: "Paiements internationaux simplifiés", en: "Simplified international payments", nl: "Vereenvoudigde internationale betalingen" },
    price: 250,
  },
  {
    id: "mollie",
    icon: "🇳🇱",
    label: { fr: "Mollie", en: "Mollie", nl: "Mollie" },
    desc: { fr: "Paiements européens (iDEAL, Bancontact, SEPA)", en: "European payments (iDEAL, Bancontact, SEPA)", nl: "Europese betalingen (iDEAL, Bancontact, SEPA)" },
    price: 250,
    tag: { fr: "Populaire NL/BE", en: "Popular NL/BE", nl: "Populair NL/BE" },
  },
  {
    id: "google_analytics",
    icon: "📊",
    label: { fr: "Google Analytics 4", en: "Google Analytics 4", nl: "Google Analytics 4" },
    desc: { fr: "Suivi audience, événements, conversions", en: "Audience tracking, events, conversions", nl: "Publiekstracking, events, conversies" },
    price: 60,
  },
  {
    id: "posthog",
    icon: "🦔",
    label: { fr: "PostHog / Mixpanel", en: "PostHog / Mixpanel", nl: "PostHog / Mixpanel" },
    desc: { fr: "Analytics produit avancé, funnels, heatmaps", en: "Advanced product analytics, funnels, heatmaps", nl: "Geavanceerde productanalytics, funnels, heatmaps" },
    price: 150,
  },
  {
    id: "cms_sanity",
    icon: "🟠",
    label: { fr: "Sanity CMS", en: "Sanity CMS", nl: "Sanity CMS" },
    desc: { fr: "Éditeur de contenu headless flexible", en: "Flexible headless content editor", nl: "Flexibele headless content-editor" },
    price: 250,
  },
  {
    id: "cms_contentful",
    icon: "📦",
    label: { fr: "Contentful", en: "Contentful", nl: "Contentful" },
    desc: { fr: "CMS enterprise, API-first, multi-locale", en: "Enterprise CMS, API-first, multi-locale", nl: "Enterprise CMS, API-first, multi-locale" },
    price: 350,
  },
  {
    id: "maps",
    icon: "🗺️",
    label: { fr: "Google Maps / Mapbox", en: "Google Maps / Mapbox", nl: "Google Maps / Mapbox" },
    desc: { fr: "Cartes interactives, géolocalisation", en: "Interactive maps, geolocation", nl: "Interactieve kaarten, geolocatie" },
    price: 120,
  },
  {
    id: "i18n",
    icon: "🌍",
    label: { fr: "Multi-langue (i18n)", en: "Multi-language (i18n)", nl: "Meertalig (i18n)" },
    desc: { fr: "Site en plusieurs langues avec routing", en: "Multi-language site with routing", nl: "Meertalige site met routing" },
    price: 200,
  },
  {
    id: "seo",
    icon: "🔍",
    label: { fr: "SEO avancé", en: "Advanced SEO", nl: "Geavanceerde SEO" },
    desc: { fr: "Sitemap, structured data, Core Web Vitals", en: "Sitemap, structured data, Core Web Vitals", nl: "Sitemap, gestructureerde data, Core Web Vitals" },
    price: 150,
  },
  {
    id: "ai",
    icon: "🤖",
    label: { fr: "Intégration IA (OpenAI / Claude)", en: "AI Integration (OpenAI / Claude)", nl: "AI-integratie (OpenAI / Claude)" },
    desc: { fr: "Chatbot, génération de contenu, embeddings", en: "Chatbot, content generation, embeddings", nl: "Chatbot, contentgeneratie, embeddings" },
    price: 700,
    tag: { fr: "Tendance", en: "Trending", nl: "Trending" },
  },
];

const STEPS: Step[] = [
  { id: "project",       titleKey: "ctr_step1_title", descKey: "ctr_step1_desc", multi: false, features: PROJECT_TYPES },
  { id: "auth",         titleKey: "ctr_step2_title", descKey: "ctr_step2_desc", multi: true,  features: AUTH_FEATURES },
  { id: "api",          titleKey: "ctr_step3_title", descKey: "ctr_step3_desc", multi: true,  features: API_FEATURES },
  { id: "db",           titleKey: "ctr_step4_title", descKey: "ctr_step4_desc", multi: true,  features: DB_FEATURES },
  { id: "comm",         titleKey: "ctr_step5_title", descKey: "ctr_step5_desc", multi: true,  features: COMM_FEATURES },
  { id: "integrations", titleKey: "ctr_step6_title", descKey: "ctr_step6_desc", multi: true,  features: INTEGRATION_FEATURES },
];

// ─── Helper ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " €";
}

// ─── Feature Card ────────────────────────────────────────────────────────────

function FeatureCard({
  item,
  selected,
  onToggle,
  lang,
}: {
  item: FeatureItem;
  selected: boolean;
  onToggle: () => void;
  lang: "fr" | "en" | "nl";
}) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full text-left p-4 rounded-xl border transition-all duration-200 group cursor-pointer ${
        selected
          ? "border-emerald-500/60 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.12)]"
          : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold text-sm transition-colors ${selected ? "text-emerald-300" : "text-white/90 group-hover:text-white"}`}>
              {item.label[lang]}
            </span>
            {item.tag && (
              <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                {item.tag[lang]}
              </span>
            )}
          </div>
          <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{item.desc[lang]}</p>
          <p className={`text-xs font-mono mt-2 font-semibold ${selected ? "text-emerald-400" : "text-white/30"}`}>
            +{fmt(item.price)}
          </p>
        </div>
        <div className={`shrink-0 mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
          selected
            ? "bg-emerald-500 border-emerald-500"
            : "border-white/20 group-hover:border-white/40"
        }`}>
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Price Panel ─────────────────────────────────────────────────────────────

function PricePanel({
  basePrice,
  optionsPrice,
  total,
}: {
  basePrice: number;
  optionsPrice: number;
  total: number;
}) {
  const { t } = useLanguage();
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
      <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">
        {t("ctr_price_label")}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">{t("ctr_price_base")}</span>
          <span className="text-white/80 font-mono">{basePrice > 0 ? fmt(basePrice) : "—"}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">{t("ctr_price_options")}</span>
          <span className="text-white/80 font-mono">{optionsPrice > 0 ? "+" + fmt(optionsPrice) : "—"}</span>
        </div>
        <div className="h-px bg-white/10 my-2" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">{t("ctr_price_from")}</span>
          <span className="text-2xl font-bold font-mono text-emerald-400">
            {total > 0 ? fmt(total) : "—"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30">
        <span className="text-emerald-400 text-base">🎁</span>
        <p className="text-xs text-emerald-300/80">{t("ctr_consult_cta")}</p>
      </div>

      <p className="text-[10px] text-white/25 leading-relaxed">{t("ctr_price_note")}</p>
    </div>
  );
}

// ─── Summary Step ────────────────────────────────────────────────────────────

// ⚠️  Replace with your actual WhatsApp number (international format, no +/spaces)
const WA_NUMBER = "33611092531";

function SummaryStep({
  selections,
  total,
}: {
  selections: Record<string, string[]>;
  total: number;
}) {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const getLabel = (stepId: string, featureId: string): string => {
    const allFeatures = [
      ...PROJECT_TYPES, ...AUTH_FEATURES, ...API_FEATURES,
      ...DB_FEATURES, ...COMM_FEATURES, ...INTEGRATION_FEATURES,
    ];
    return allFeatures.find(f => f.id === featureId)?.label[lang] ?? featureId;
  };

  const allSelected = Object.entries(selections).flatMap(([stepId, ids]) =>
    ids.map(id => ({ stepId, label: getLabel(stepId, id) }))
  );

  const openWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const features = allSelected.map(s => `• ${s.label}`).join("\n");
    const msg = [
      `👋 *Nouveau devis Klinkr*`,
      ``,
      `*Nom :* ${form.name}`,
      form.email ? `*Email :* ${form.email}` : null,
      form.company ? `*Entreprise :* ${form.company}` : null,
      ``,
      `*Fonctionnalités sélectionnées :*`,
      features || "Aucune",
      ``,
      `*Estimation totale :* ${fmt(total)}`,
      form.message ? `\n*Message :*\n${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Summary card */}
      <div className="border border-white/10 rounded-2xl p-5 space-y-4">
        <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">{t("ctr_summary_title")}</p>
        {allSelected.length === 0 ? (
          <p className="text-white/30 text-sm">{t("ctr_summary_empty")}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allSelected.map((s, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                {s.label}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-sm text-white/50">{t("ctr_price_from")}</span>
          <span className="text-xl font-bold font-mono text-emerald-400">{fmt(total)}</span>
        </div>
      </div>

      {/* Form → WhatsApp */}
      <form onSubmit={openWhatsApp} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">{t("ctr_form_name")}</label>
            <input
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="Jean Dupont"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">{t("ctr_form_email")}</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="jean@startup.io"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">{t("ctr_form_company")}</label>
          <input
            value={form.company}
            onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors"
            placeholder="Acme Corp"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">{t("ctr_form_message")}</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
            placeholder="..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bf5b] text-black font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-3"
        >
          {/* WhatsApp SVG icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t("ctr_form_submit")}
        </button>
        <p className="text-center text-[11px] text-white/25">{t("ctr_price_note")}</p>
      </form>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ContractBuilder() {
  const { lang, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const TOTAL_STEPS = STEPS.length + 1; // +1 for summary

  const toggle = (stepId: string, featureId: string, multi: boolean) => {
    setSelections(prev => {
      const current = prev[stepId] ?? [];
      if (multi) {
        return {
          ...prev,
          [stepId]: current.includes(featureId)
            ? current.filter(id => id !== featureId)
            : [...current, featureId],
        };
      } else {
        return { ...prev, [stepId]: [featureId] };
      }
    });
  };

  const { basePrice, optionsPrice, total } = useMemo(() => {
    const projectIds = selections["project"] ?? [];
    const base = projectIds.reduce((sum, id) => {
      return sum + (PROJECT_TYPES.find(f => f.id === id)?.price ?? 0);
    }, 0);

    let opts = 0;
    STEPS.slice(1).forEach(step => {
      const ids = selections[step.id] ?? [];
      ids.forEach(id => {
        opts += step.features.find(f => f.id === id)?.price ?? 0;
      });
    });

    return { basePrice: base, optionsPrice: opts, total: base + opts };
  }, [selections]);

  const isSummary = currentStep === STEPS.length;
  const currentStepData = !isSummary ? STEPS[currentStep] : null;

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Noise + gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-zinc-950/50" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-white/35 hover:text-white/60 transition-colors mb-6 tracking-wider uppercase"
          >
            {t("ctr_back")}
          </Link>
          <h1
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t("ctr_title")}
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-xl">{t("ctr_sub")}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          {/* Mobile: step counter + dots */}
          <div className="flex sm:hidden items-center justify-between mb-3">
            <p className="text-xs text-white/40 font-medium">
              {isSummary ? `${TOTAL_STEPS} / ${TOTAL_STEPS}` : `${currentStep + 1} / ${TOTAL_STEPS}`}
              {" — "}
              <span className="text-white/70">
                {isSummary ? t("ctr_step7_title") : t(STEPS[currentStep].titleKey)}
              </span>
            </p>
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => i <= currentStep && setCurrentStep(i)}
                  disabled={i > currentStep}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep ? "w-6 bg-emerald-500" : i < currentStep ? "w-3 bg-emerald-700" : "w-3 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: full pills */}
          <div className="hidden sm:flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  i === currentStep
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : i < currentStep
                    ? "bg-white/5 text-white/60 border border-white/10 hover:bg-white/8"
                    : "bg-transparent text-white/25 border border-white/5 cursor-not-allowed"
                }`}
                disabled={i > currentStep}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  i < currentStep ? "bg-emerald-500 text-black" : i === currentStep ? "bg-emerald-500/30 text-emerald-300" : "bg-white/8 text-white/25"
                }`}>
                  {i < currentStep ? "✓" : i + 1}
                </span>
                {t(step.titleKey)}
              </button>
            ))}
            <button
              onClick={() => currentStep >= STEPS.length && setCurrentStep(STEPS.length)}
              disabled={currentStep < STEPS.length}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                currentStep === STEPS.length
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-transparent text-white/25 border border-white/5 cursor-not-allowed"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                currentStep === STEPS.length ? "bg-emerald-500/30 text-emerald-300" : "bg-white/8 text-white/25"
              }`}>
                {STEPS.length + 1}
              </span>
              {t("ctr_step7_title")}
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              animate={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Content + sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {!isSummary && currentStepData ? (
                  <>
                    <div className="mb-5">
                      <h2
                        className="text-xl sm:text-2xl font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {t(currentStepData.titleKey)}
                      </h2>
                      <p className="text-white/40 text-sm">{t(currentStepData.descKey)}</p>
                      {currentStepData.multi && (
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-white/25 border border-white/10 rounded-full px-2.5 py-0.5">
                          {t("ctr_select_hint")}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentStepData.features.map(item => (
                        <FeatureCard
                          key={item.id}
                          item={item}
                          lang={lang}
                          selected={(selections[currentStepData.id] ?? []).includes(item.id)}
                          onToggle={() => toggle(currentStepData.id, item.id, currentStepData.multi)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <SummaryStep selections={selections} total={total} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {!isSummary && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                  disabled={currentStep === 0}
                  className="px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t("ctr_step_prev")}
                </button>
                <button
                  onClick={() => setCurrentStep(s => Math.min(TOTAL_STEPS - 1, s + 1))}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  {currentStep === STEPS.length - 1 ? t("ctr_step7_title") : t("ctr_step_next")}
                </button>
              </div>
            )}
          </div>

          {/* Sticky price sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-6">
              <PricePanel
                basePrice={basePrice}
                optionsPrice={optionsPrice}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile floating price bar */}
      {total > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-4">
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{t("ctr_price_from")}</p>
              <p className="text-lg font-bold font-mono text-emerald-400">{fmt(total)}</p>
            </div>
            <button
              onClick={() => setCurrentStep(STEPS.length)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all"
            >
              {t("ctr_step_submit")} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
