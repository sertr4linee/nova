"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Accueil",
      link: "#hero",
    },
    {
      name: "Réalisations",
      link: "#realisations",
    },
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="pt-2">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton variant="primary">Contact</NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center gap-6">
              <NavbarLogo />
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  
                  // Scroll personnalisé pour mobile
                  const targetId = item.link.replace('#', '');
                  const element = document.getElementById(targetId);
                  if (element) {
                    setTimeout(() => { // Petit délai pour permettre au menu de se fermer
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - 80;
                      
                      const startPosition = window.pageYOffset;
                      const distance = offsetPosition - startPosition;
                      const duration = 800;
                      let start: number | null = null;

                      const easeInOutCubic = (t: number): number => {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                      };

                      const animateScroll = (currentTime: number) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        const ease = easeInOutCubic(progress);

                        window.scrollTo(0, startPosition + distance * ease);

                        if (timeElapsed < duration) {
                          requestAnimationFrame(animateScroll);
                        }
                      };

                      requestAnimationFrame(animateScroll);
                    }, 200);
                  }
                }}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-[#ffdab9] transition-colors duration-200"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Contact
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}