"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarDemo } from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { GlowText } from "@/components/ui/glow-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PricingConfigurator } from "@/components/ui/pricing-configurator";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern-fixed";
import { Spotlight } from "@/components/ui/spotlight";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function PricingPage() {
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
      <section className="relative z-10 pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-8 inline-block rounded-full bg-white/5 px-4 py-2 text-sm font-montserrat font-medium text-white/80 backdrop-blur-sm tracking-wider">
              Configurateur de Prix
            </Badge>
          </motion.div>

          <HeroHighlight containerClassName="h-auto py-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto font-montserrat"
            >
              Composez votre{" "}
              <Highlight className="text-white">
                projet idéal
              </Highlight>
            </motion.h1>
          </HeroHighlight>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto"
          >
            <TextGenerateEffect
              words="Sélectionnez les services et fonctionnalités dont vous avez besoin. Notre configurateur calcule instantanément votre estimation."
              className="text-lg md:text-xl font-montserrat font-light text-white/70"
              duration={0.5}
              textColor="text-white/70"
            />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-5 h-5 text-[#ffdab9]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-montserrat text-sm">Sans engagement</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-5 h-5 text-[#ffdab9]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-montserrat text-sm">Devis gratuit</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-5 h-5 text-[#ffdab9]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-montserrat text-sm">Accompagnement personnalisé</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Configurator */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto">
          <PricingConfigurator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-white/60 font-montserrat">
              Tout ce que vous devez savoir sur nos tarifs
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Les prix affichés sont-ils définitifs ?",
                a: "Les prix du configurateur sont des estimations. Après discussion de votre projet, nous vous fournissons un devis détaillé et personnalisé."
              },
              {
                q: "Quels sont les délais de réalisation ?",
                a: "Les délais varient selon la complexité du projet. Un site vitrine prend généralement 2-3 semaines, tandis qu'une application web peut nécessiter 4-8 semaines."
              },
              {
                q: "Proposez-vous un paiement en plusieurs fois ?",
                a: "Oui, nous proposons un paiement en 3 fois sans frais pour tous les projets supérieurs à 1500€."
              },
              {
                q: "Qu'inclut la maintenance mensuelle ?",
                a: "La maintenance comprend les mises à jour de sécurité, la sauvegarde des données, le monitoring de performance et un support réactif sous 24h."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-white font-montserrat mb-2">
                  {faq.q}
                </h3>
                <p className="text-white/60 font-montserrat">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-[#ffdab9]/30 bg-gradient-to-br from-[#ffdab9]/10 to-transparent p-12 text-center"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffdab9]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#ffdab9]/10 rounded-full blur-3xl" />

            <div className="relative">
              <GlowText
                intensity="high"
                glowColor="#ffdab9"
                className="text-3xl md:text-4xl font-bold font-montserrat mb-4"
                animate={true}
                textColor="#ffffff"
              >
                Prêt à lancer votre projet ?
              </GlowText>

              <p className="text-white/70 font-montserrat mb-8 max-w-xl mx-auto">
                Discutons de votre vision. Notre équipe est là pour transformer vos idées en réalité digitale.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-[#ffdab9] text-black font-montserrat font-semibold transition-all duration-300 hover:bg-[#ffdab9]/90"
                >
                  Demander un devis gratuit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-montserrat font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Voir nos réalisations
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
