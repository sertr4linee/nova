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
import { useState, useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

export function NavbarDemo() {
  const { isModalOpen } = useContext(ModalContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  if (isModalOpen) return null;
  const navItems = [
    // {
    //   name: "Home",
    //   link: "#hero",
    // },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
    {
      name: "Blog",
      link: "#blog",
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar className="pt-2">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton variant="primary">Login</NavbarButton>
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
            // ...existing scroll logic...
          }}
          className="block w-full text-center text-neutral-600 dark:text-neutral-300 hover:text-[#ffdab9] transition-colors duration-200 py-3"
        >
          {item.name}
        </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}