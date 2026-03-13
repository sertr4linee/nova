"use client";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel-with-modal-context";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AppleCardsCarouselDemo() {
  const { t } = useLanguage();

  const cards = [
    {
      category: t("proj1_cat"),
      title: t("proj1_title"),
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop",
      content: <BeldysContent />,
    },
    {
      category: t("proj2_cat"),
      title: t("proj2_title"),
      src: "/mockup.png",
      content: <BeldysAppContent />,
    },
    {
      category: t("proj3_cat"),
      title: t("proj3_title"),
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop",
      content: <WelkomHomeContent />,
    },
  ].map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <div className="w-full h-full py-2">
      <Carousel items={cards} />
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 border border-[#fdd9b9]/20 text-[#fdd9b9]/60 text-[9px] tracking-[0.25em] uppercase"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      {label}
    </span>
  );
}

function Result({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-white/45 text-sm font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <span className="text-[#fdd9b9]/50 mt-0.5 flex-shrink-0">→</span>
      {text}
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p
        className="text-[#fdd9b9]/40 text-[8px] tracking-[0.45em] uppercase mb-3"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-[#fdd9b9]/8 my-7" />;
}

/* ─── PROJET 1 — Beldy's Club ─────────────────────────────────────────────── */

const BeldysContent = () => {
  const { t } = useLanguage();
  return (
  <div>
    <div className="mb-8 space-y-3">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image src="/beldysweb/hero.png" alt="Beldy's — Hero" fill className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
      </div>
      <p className="text-[#fdd9b9]/35 text-[8px] tracking-[0.3em] uppercase font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("beldys_hero_cap")}</p>
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-2">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
            <Image src="/beldysweb/shop.png" alt="Beldy's — Menu" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 350px" />
          </div>
          <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("beldys_shop_cap")}</p>
        </div>
        <div className="space-y-2">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
            <Image src="/beldysweb/order.png" alt="Beldy's — Commandes" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 350px" />
          </div>
          <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("beldys_order_cap")}</p>
        </div>
      </div>
    </div>
    <Divider />
    <Section title={t("sec_challenge")}>
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("beldys_challenge")}</p>
    </Section>
    <Divider />
    <Section title={t("sec_solution")}>
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("beldys_solution_p")}</p>
    </Section>
    <Divider />
    <Section title={t("sec_stack")}>
      <div className="flex flex-wrap gap-2">
        {["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Framer Motion"].map(s => <Tag key={s} label={s} />)}
      </div>
    </Section>
    <Divider />
    <Section title={t("sec_results")}>
      <ul className="space-y-2.5">
        <Result text={t("beldys_r1")} /><Result text={t("beldys_r2")} /><Result text={t("beldys_r3")} /><Result text={t("beldys_r4")} />
      </ul>
    </Section>
    <div className="pt-2">
      <a href="https://beldys.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#fdd9b9]/30 text-[#fdd9b9] px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-300" style={{ fontFamily: "var(--font-dm-sans)" }}>
        {t("see_site")}
      </a>
    </div>
  </div>
  );
};

/* ─── PROJET 2 — Beldy's App iOS & Android ────────────────────────────────── */

const BeldysAppContent = () => {
  const { t } = useLanguage();
  return (
  <div>
    <div className="relative w-full h-[200px] sm:h-[240px] mb-3 overflow-hidden bg-[#0d0d0d] flex items-center justify-center">
      <Image src="/mockup.png" alt="Beldy's App mockup" fill className="object-contain" sizes="(max-width: 768px) 100vw, 600px" />
    </div>
    <p className="text-[#fdd9b9]/35 text-[8px] tracking-[0.3em] uppercase font-light mb-6" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("app_overview_cap")}</p>
    <div className="grid grid-cols-2 gap-3 mb-8">
      <div className="space-y-2">
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#0d0d0d]">
          <Image src="/app/home.png" alt="Beldy's App — Accueil" fill className="object-contain" sizes="(max-width: 768px) 50vw, 300px" />
        </div>
        <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("app_home_cap")}</p>
      </div>
      <div className="space-y-2">
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#0d0d0d]">
          <Image src="/app/cart.png" alt="Beldy's App — Panier" fill className="object-contain" sizes="(max-width: 768px) 50vw, 300px" />
        </div>
        <p className="text-[#fdd9b9]/30 text-[7px] tracking-[0.25em] uppercase leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("app_cart_cap")}</p>
      </div>
    </div>
    <Divider />
    <Section title={t("sec_challenge")}>
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("app_challenge")}</p>
    </Section>
    <Divider />
    <Section title={t("sec_solution")}>
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("app_solution_p")}</p>
    </Section>
    <Divider />
    <Section title={t("sec_stack")}>
      <div className="flex flex-wrap gap-2">
        {["React Native", "Expo", "TypeScript", "Stripe", "Firebase", "Apple Pay", "Google Pay"].map(s => <Tag key={s} label={s} />)}
      </div>
    </Section>
    <Divider />
    <Section title={t("sec_results")}>
      <ul className="space-y-2.5">
        <Result text={t("app_r1")} /><Result text={t("app_r2")} /><Result text={t("app_r3")} /><Result text={t("app_r4")} />
      </ul>
    </Section>
    <div className="flex flex-wrap gap-3 pt-2">
      <a href="https://beldys.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#fdd9b9]/30 text-[#fdd9b9] px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-300" style={{ fontFamily: "var(--font-dm-sans)" }}>🍎 App Store</a>
      <a href="https://beldys.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/10 text-white/35 px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:border-[#fdd9b9]/30 hover:text-[#fdd9b9] transition-all duration-300" style={{ fontFamily: "var(--font-dm-sans)" }}>🤖 Google Play</a>
    </div>
  </div>
  );
};

/* ─── PROJET 3 — WelkomHome ────────────────────────────────────────────────── */

const WelkomHomeContent = () => {
  const { t } = useLanguage();
  return (
  <div>
    <Section title={t("sec_challenge")}>
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("welkom_challenge")}</p>
    </Section>
    <Divider />
    <Section title={t("sec_solution")}>
      <p className="text-white/50 text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>{t("welkom_solution_p")}</p>
    </Section>
    <Divider />
    <Section title={t("sec_stack")}>
      <div className="flex flex-wrap gap-2">
        {["Next.js", "TypeScript", "Framer Motion", "Sanity CMS", "Vercel", "Tailwind CSS"].map(s => <Tag key={s} label={s} />)}
      </div>
    </Section>
    <Divider />
    <Section title={t("sec_results")}>
      <ul className="space-y-2.5">
        <Result text={t("welkom_r1")} /><Result text={t("welkom_r2")} /><Result text={t("welkom_r3")} /><Result text={t("welkom_r4")} />
      </ul>
    </Section>
    <div className="pt-2">
      <a href="https://www-rust-iota.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#fdd9b9]/30 text-[#fdd9b9] px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase hover:bg-[#fdd9b9] hover:text-black transition-all duration-300" style={{ fontFamily: "var(--font-dm-sans)" }}>
        {t("see_site")}
      </a>
    </div>
  </div>
  );
};
