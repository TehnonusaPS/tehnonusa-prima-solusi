"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SlideTabs } from "@/components/ui/slide-tabs";
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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      })),
    [tNav]
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-xs"
          : "bg-background/50 backdrop-blur-xs border-b border-transparent",
        className
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <Logo />

          {/* Desktop Navigation Links (Clean & Borderless with Spring Cursor) */}
          <nav className="hidden lg:flex items-center" aria-label="Main Navigation">
            <SlideTabs tabs={desktopTabs} />
          </nav>

          {/* Desktop Actions: Harmonized 36px optical height (Language, Theme, CTA) */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle variant="icon" />
            <div className="h-4 w-px bg-border/80 mx-0.5" aria-hidden="true" />
            <Button
              size="sm"
              variant="default"
              className="h-9 px-4 rounded-full shadow-sm shadow-primary/25 font-sans font-semibold cursor-pointer"
              rightIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => {
                const el = document.querySelector("#contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {tHero("cta_primary")}
            </Button>
          </div>

          {/* Mobile Right Controls: Language, Compact Theme, Morphing Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <ThemeToggle variant="icon" className="w-8 h-8" />
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
