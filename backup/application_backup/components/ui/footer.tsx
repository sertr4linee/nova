import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/privacy" },
  { label: "CGU", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#fdd9b9]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 mb-16">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-7 w-fit group">
              <Image
                src="/shape.png"
                alt="Klinkr"
                width={26}
                height={26}
                className="opacity-70 group-hover:opacity-90 transition-opacity duration-400 object-contain"
              />
              <span
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-white/70 group-hover:text-[#fdd9b9] transition-colors duration-400 text-xl font-light tracking-wider italic"
              >
                Klinkr
              </span>
            </Link>
            <p
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-white/28 text-sm font-light leading-relaxed max-w-sm"
            >
              Agence digitale spécialisée en développement web sur-mesure pour
              entrepreneurs, créateurs et startups ambitieuses.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdd9b9] opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#fdd9b9]/60" />
              </span>
              <span
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="text-white/20 text-[10px] tracking-[0.25em]"
              >
                Disponible pour de nouveaux projets
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[#fdd9b9]/40 text-[9px] tracking-[0.45em] uppercase mb-7"
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    className="text-white/28 hover:text-[#fdd9b9] transition-colors duration-300 text-sm font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[#fdd9b9]/40 text-[9px] tracking-[0.45em] uppercase mb-7"
            >
              Contact
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              <li>
                <a
                  href="mailto:hello@novastudio.fr"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="text-white/28 hover:text-[#fdd9b9] transition-colors duration-300 text-sm font-light"
                >
                  hello@novastudio.fr
                </a>
              </li>
              <li>
                <span
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="text-white/18 text-sm font-light"
                >
                  Paris, France
                </span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 border border-white/10 hover:border-[#fdd9b9]/35 flex items-center justify-center text-white/25 hover:text-[#fdd9b9] transition-all duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.744l7.73-8.835L2.02 2.25h6.956l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-white/10 hover:border-[#fdd9b9]/35 flex items-center justify-center text-white/25 hover:text-[#fdd9b9] transition-all duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-white/10 hover:border-[#fdd9b9]/35 flex items-center justify-center text-white/25 hover:text-[#fdd9b9] transition-all duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#fdd9b9]/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span
            style={{ fontFamily: "var(--font-dm-sans)" }}
            className="text-white/14 text-[10px] tracking-[0.25em]"
          >
            © {new Date().getFullYear()} klinkr. Tous droits réservés.
          </span>
          <div className="flex gap-6 flex-wrap justify-center">
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="text-white/14 hover:text-white/35 text-[10px] tracking-[0.25em] transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
