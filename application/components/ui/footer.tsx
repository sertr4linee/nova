import Link from "next/link"
import { TextHoverEffect } from "./text-hover-effect"

import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-black via-black to-neutral-900 text-white overflow-hidden border-t border-[#ffdab9]/20">
      {/* Background Text Effect Nova */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <div className="w-full h-full max-w-6xl">
          <TextHoverEffect text="NOVA" />
        </div>
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-5 mix-blend-overlay"></div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-4 lg:gap-6">
            <div className="flex items-center space-x-3 mb-2 lg:mb-4">
              <div className="relative">
                <Image 
                  src="/nova.svg" 
                  alt="Nova Logo" 
                  width={36} 
                  height={36} 
                  className="sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px] drop-shadow-2xl filter brightness-110" 
                />
                <div className="absolute inset-0 bg-[#ffdab9]/20 blur-xl rounded-full"></div>
              </div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight font-serif italic text-[#ffdab9] drop-shadow-lg">Nova</span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <p className="text-sm lg:text-base text-white/80 leading-relaxed max-w-sm">
                Agence digitale créative spécialisée en branding, développement web & stratégies digitales sur mesure.
              </p>
              <p className="text-sm lg:text-base text-[#ffdab9]/80 font-medium">
                Nous créons des expériences numériques inoubliables.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-white/40 mt-2 lg:mt-4">
              <span>© {new Date().getFullYear()} Nova Agency.</span>
              <span className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></span>
              <span>Tous droits réservés.</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-sm font-semibold text-[#ffdab9] mb-4 lg:mb-6 uppercase tracking-wider font-serif">Navigation</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <Link href="/" className="text-white/70 hover:text-[#ffdab9] transition-all duration-300 hover:translate-x-1 inline-block text-sm lg:text-base">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-[#ffdab9] transition-all duration-300 hover:translate-x-1 inline-block text-sm lg:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/70 hover:text-[#ffdab9] transition-all duration-300 hover:translate-x-1 inline-block text-sm lg:text-base">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-[#ffdab9] transition-all duration-300 hover:translate-x-1 inline-block text-sm lg:text-base">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Réseaux */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Newsletter */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <h3 className="text-sm font-semibold text-[#ffdab9] mb-2 uppercase tracking-wider font-serif">Newsletter</h3>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="Votre email..."
                  className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffdab9]/50 focus:border-[#ffdab9]/30 transition-all duration-300 backdrop-blur-sm text-sm lg:text-base"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 lg:px-8 py-3 rounded-lg bg-gradient-to-r from-[#ffdab9] to-[#ffb366] text-black font-semibold hover:from-[#ffb366] hover:to-[#ffdab9] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#ffdab9]/25 text-sm lg:text-base"
                >
                  S&apos;inscrire
                </button>
              </form>
              <span className="text-xs text-white/50">Recevez nos actus, conseils & nouveautés • Aucun spam, promis.</span>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <h3 className="text-sm font-semibold text-[#ffdab9] mb-2 uppercase tracking-wider font-serif">Réseaux</h3>
              <div className="flex gap-3 lg:gap-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Twitter" 
                  className="group relative p-2.5 lg:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ffdab9]/30 hover:bg-[#ffdab9]/10 transition-all duration-300 hover:scale-110"
                >
                  <svg width="20" height="20" className="lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" className="text-white/70 group-hover:text-[#ffdab9] transition-colors duration-300" d="M22.46 5.924c-.793.352-1.646.59-2.54.697a4.48 4.48 0 0 0 1.965-2.47 8.94 8.94 0 0 1-2.828 1.08A4.48 4.48 0 0 0 11.2 9.03c0 .35.04.69.11 1.016-3.728-.187-7.034-1.97-9.244-4.68a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2.002 3.73a4.47 4.47 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.6 4.39c-.193.053-.397.08-.607.08-.148 0-.292-.014-.432-.04.293.915 1.143 1.58 2.15 1.6A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583a9.1 9.1 0 0 0 2.24-2.31Z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram" 
                  className="group relative p-2.5 lg:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ffdab9]/30 hover:bg-[#ffdab9]/10 transition-all duration-300 hover:scale-110"
                >
                  <svg width="20" height="20" className="lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24">
                    <rect width="16" height="16" x="4" y="4" rx="3" className="stroke-white/70 group-hover:stroke-[#ffdab9] transition-colors duration-300" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2.5" className="stroke-white/70 group-hover:stroke-[#ffdab9] transition-colors duration-300" strokeWidth="2"/>
                    <circle cx="17" cy="7" r="0.8" className="fill-white/70 group-hover:fill-[#ffdab9] transition-colors duration-300"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-[#ffdab9]/70 transition-colors">Confidentialité</Link>
              <span className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></span>
              <Link href="/terms" className="hover:text-[#ffdab9]/70 transition-colors">CGU</Link>
              <span className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></span>
              <Link href="/mentions-legales" className="hover:text-[#ffdab9]/70 transition-colors">Mentions légales</Link>
            </div>
            <div className="text-xs text-white/40 text-center sm:text-right">
              Fait avec ❤️ par Nova Agency
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
