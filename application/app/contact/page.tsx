"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarDemo } from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { GlowText } from "@/components/ui/glow-text";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern-fixed";
import { Spotlight } from "@/components/ui/spotlight";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Check,
  X,
  ShoppingCart
} from "lucide-react";

interface PricingSelection {
  base: string;
  features: string[];
  extras: string[];
  total: number;
  services: string[];
}

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "contact@nova.dev",
    href: "mailto:contact@nova.dev"
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Téléphone",
    value: "+33 6 12 34 56 78",
    href: "tel:+33612345678"
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Localisation",
    value: "Paris, France",
    href: null
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Disponibilité",
    value: "Lun - Ven, 9h - 18h",
    href: null
  }
];

const projectTypes = [
  "Site Vitrine",
  "E-commerce",
  "Application Web",
  "Refonte de site",
  "Autre"
];

const budgetRanges = [
  "< 500€",
  "500€ - 1000€",
  "1000€ - 2000€",
  "2000€ - 5000€",
  "> 5000€"
];

export default function ContactPage() {
  const [pricingSelection, setPricingSelection] = useState<PricingSelection | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pricingSelection");
    if (stored) {
      const data = JSON.parse(stored) as PricingSelection;
      setPricingSelection(data);

      // Pre-fill form with pricing data
      setFormData(prev => ({
        ...prev,
        projectType: data.base,
        message: `Projet: ${data.base}\n` +
          (data.features.length > 0 ? `Fonctionnalités: ${data.features.join(", ")}\n` : "") +
          (data.extras.length > 0 ? `Extras: ${data.extras.join(", ")}\n` : "") +
          `Budget estimé: ${data.total}€\n\n` +
          "Décrivez votre projet ici..."
      }));
    }
  }, []);

  const clearPricingSelection = () => {
    localStorage.removeItem("pricingSelection");
    setPricingSelection(null);
    setFormData(prev => ({
      ...prev,
      projectType: "",
      message: ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black text-white overflow-x-hidden">
      <Spotlight className="hidden sm:block" />

      {/* Background grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <InteractiveGridPattern
          className={cn(
            "absolute inset-0 w-full opacity-30 sm:opacity-40"
          )}
          width={280}
          height={160}
          squaresClassName="stroke-white/10 hover:stroke-white/20"
          squares={[6, 8, 10, 12]}
        />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-30">
        <NavbarDemo />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 px-3 sm:px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 sm:mb-6 md:mb-8 inline-block rounded-full bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wider">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-2" />
              Contactez-nous
            </Badge>
          </motion.div>

          <HeroHighlight containerClassName="h-auto py-4 sm:py-6 md:py-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto font-montserrat px-2"
            >
              Parlons de votre{" "}
              <Highlight className="text-white">
                projet
              </Highlight>
            </motion.h1>
          </HeroHighlight>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-montserrat font-light text-white/70 max-w-2xl mx-auto px-2"
          >
            Une idée, un projet, une question ? Nous sommes là pour vous accompagner.
            Réponse garantie sous 24h.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8 sm:py-10 md:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6 sm:space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#ffdab9]/30 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#ffdab9]/10 text-[#ffdab9] group-hover:bg-[#ffdab9]/20 transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-white/50 font-montserrat">{item.label}</p>
                          <p className="text-sm sm:text-base text-white font-montserrat font-medium truncate">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#ffdab9]/10 text-[#ffdab9] shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-white/50 font-montserrat">{item.label}</p>
                          <p className="text-sm sm:text-base text-white font-montserrat font-medium truncate">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Why Contact Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#ffdab9]/20 bg-gradient-to-br from-[#ffdab9]/10 to-transparent"
              >
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdab9]" />
                  <h3 className="text-base sm:text-lg font-semibold text-white font-montserrat">
                    Pourquoi nous choisir ?
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Réponse sous 24h garantie",
                    "Devis gratuit et sans engagement",
                    "Accompagnement personnalisé",
                    "Technologies modernes"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/70 font-montserrat text-xs sm:text-sm">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffdab9] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                {/* Pricing Selection Summary */}
                {pricingSelection && !isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-2xl bg-[#ffdab9]/10 border border-[#ffdab9]/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#ffdab9]/20">
                          <ShoppingCart className="w-5 h-5 text-[#ffdab9]" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60 font-montserrat">Votre sélection</p>
                          <p className="font-semibold text-white font-montserrat">{pricingSelection.base}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-white/60 font-montserrat">Estimation</p>
                          <p className="font-bold text-[#ffdab9] font-montserrat text-lg">{pricingSelection.total}€</p>
                        </div>
                        <button
                          onClick={clearPricingSelection}
                          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <X className="w-4 h-4 text-white/60" />
                        </button>
                      </div>
                    </div>
                    {(pricingSelection.features.length > 0 || pricingSelection.extras.length > 0) && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                        {pricingSelection.features.map((f, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                            {f}
                          </span>
                        ))}
                        {pricingSelection.extras.map((e, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-[#ffdab9]/20 text-[#ffdab9]">
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#ffdab9]/20 flex items-center justify-center">
                      <Check className="w-10 h-10 text-[#ffdab9]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-montserrat mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-white/60 font-montserrat mb-6">
                      Merci pour votre message. Nous vous répondrons sous 24h.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          projectType: "",
                          budget: "",
                          message: ""
                        });
                      }}
                      className="text-[#ffdab9] font-montserrat font-medium hover:underline"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm text-white/70 font-montserrat mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-montserrat placeholder:text-white/30 focus:outline-none focus:border-[#ffdab9]/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm text-white/70 font-montserrat mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-montserrat placeholder:text-white/30 focus:outline-none focus:border-[#ffdab9]/50 transition-colors"
                          placeholder="john@exemple.com"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm text-white/70 font-montserrat mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-montserrat placeholder:text-white/30 focus:outline-none focus:border-[#ffdab9]/50 transition-colors"
                        placeholder="Nom de votre entreprise (optionnel)"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Project Type */}
                      <div>
                        <label className="block text-sm text-white/70 font-montserrat mb-2">
                          Type de projet *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-montserrat focus:outline-none focus:border-[#ffdab9]/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Sélectionner...</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type} className="bg-black">{type}</option>
                          ))}
                        </select>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-sm text-white/70 font-montserrat mb-2">
                          Budget estimé
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-montserrat focus:outline-none focus:border-[#ffdab9]/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Sélectionner...</option>
                          {budgetRanges.map(range => (
                            <option key={range} value={range} className="bg-black">{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm text-white/70 font-montserrat mb-2">
                        Votre message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-montserrat placeholder:text-white/30 focus:outline-none focus:border-[#ffdab9]/50 transition-colors resize-none"
                        placeholder="Décrivez votre projet, vos besoins, vos délais..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-montserrat font-semibold transition-all duration-300",
                        isSubmitting
                          ? "bg-[#ffdab9]/50 text-black/50 cursor-wait"
                          : "bg-[#ffdab9] text-black hover:bg-[#ffdab9]/90"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-white/40 font-montserrat">
                      En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map/CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <GlowText
              intensity="medium"
              glowColor="#ffdab9"
              className="text-2xl md:text-3xl font-bold font-montserrat mb-4"
              animate={true}
              textColor="#ffffff"
            >
              Préférez-vous un appel ?
            </GlowText>
            <p className="text-white/60 font-montserrat mb-8 max-w-xl mx-auto">
              Réservez un créneau de 30 minutes pour discuter de votre projet en direct.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#ffdab9]/30 text-[#ffdab9] font-montserrat font-medium hover:bg-[#ffdab9]/10 transition-all duration-300"
            >
              Réserver un appel
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
