"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t("footer_nav_services"), href: "#services" },
    { label: t("footer_nav_projects"), href: "#realisations" },
    { label: t("footer_nav_contact"), href: "/contract" },
  ];

  const legalLinks = [
    { label: t("footer_legal_mentions"), href: "/mentions-legales" },
    { label: t("footer_legal_privacy"), href: "/privacy" },
    { label: t("footer_legal_cgu"), href: "/terms" },
  ];
  return (
    <footer className="bg-[#080808] border-t border-[#fdd9b9]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 mb-16">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-7 w-fit group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="10 -65 740 760"
                width="20"
                height="21"
                aria-hidden="true"
                className="opacity-70 group-hover:opacity-90 transition-opacity duration-400 flex-shrink-0"
              >
                <path
                  d="M311 356C312 171 286 24 154 24C3 24 38 150 106 176C159 197 242 224 242 357V678H23V0H154C301 0 333 150 335 338C517 336 324 152 429 48C534 -57 681 19 748 107L732 123C701 91 667 79 632 114C597 149 604 238 551 301C496 366 419 361 335 361V380C335 413 349 468 398 468C448 468 459 415 540 415C639 415 684 493 684 677H659C659 638 641 601 615 601C560 601 551 684 462 684C313 684 311 542 311 384V356Z"
                  fill="#FDD9B9"
                />
              </svg>
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
              {t("footer_desc")}
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
                {t("footer_available")}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[#fdd9b9]/40 text-[9px] tracking-[0.45em] uppercase mb-7"
            >
              {t("footer_nav_label")}
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
              {t("footer_contact_label")}
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              <li>
                <a
                  href="mailto:hello@klinkr.app"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="text-white/28 hover:text-[#fdd9b9] transition-colors duration-300 text-sm font-light"
                >
                  hello@klinkr.app
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
            © {new Date().getFullYear()} klinkr. {t("footer_copyright")}
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
