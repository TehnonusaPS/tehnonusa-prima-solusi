"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { SliderToggle } from "@/components/ui/slider-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { AnimatedHamburgerButton } from "@/components/ui/animated-hamburger";
import { navItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("services");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const sectionKeys = ["services", "solutions", "process", "portfolio", "contact"];
      const scrollPos = window.scrollY + 140;

      for (let i = sectionKeys.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionKeys[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionKeys[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopTabs = React.useMemo(
    () =>
      navItems.map((item) => ({
        id: item.key,
        label: tNav(item.key),
        href: item.href,
        onClick: () => setActiveSection(item.key),
      })),
    [tNav]
  );

  const hasBackdrop = isScrolled || mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        hasBackdrop
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-xs"
          : "bg-transparent border-b-0 shadow-none",
        className
      )}
    >
      <Container size="lg">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links — Centered 100% with Hero & Sections */}
          <nav
            className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 z-10"
            aria-label="Main Navigation"
          >
            <SlideTabs
              tabs={desktopTabs}
              activeId={activeSection}
              onChange={setActiveSection}
              className="border-border/60 bg-surface/80"
            />
          </nav>

          {/* Desktop Actions: Theme Slider, and Language Switcher at the far right */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <SliderToggle useNextThemes />
            <LanguageSwitcher />
          </div>

          {/* Mobile Right Controls: Compact Theme Icon Button, Language Switcher, Morphing Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <ThemeToggle className="w-8 h-8 rounded-full border border-border/60 bg-surface/80" />
            <LanguageSwitcher />
            <AnimatedHamburgerButton
              active={mobileMenuOpen}
              onToggle={setMobileMenuOpen}
              size="sm"
              ariaLabel="Toggle mobile menu"
            />
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 py-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          id="mobile-navigation"
        >
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-(--radius-md) transition-colors"
              >
                {tNav(item.key)}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-border">
              <Button
                variant="default"
                size="md"
                className="w-full justify-center"
                rightIcon={<Sparkles className="w-4 h-4" />}
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.querySelector("#contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {tHero("cta_primary")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
