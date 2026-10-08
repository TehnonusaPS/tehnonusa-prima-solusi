"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { navItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tUi = useTranslations("ui");
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
          <a
            href="#"
            className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-foreground transition-opacity hover:opacity-90 outline-none"
            aria-label="PT Tehnonusa Prima Solusi Home"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-(--radius-md) bg-primary text-primary-foreground font-extrabold shadow-sm shadow-primary/25">
              T
            </span>
            <span className="flex flex-col">
              <span className="leading-none text-foreground font-semibold">
                Tehnonusa
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-medium leading-tight">
                Prima Solusi
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-(--radius-md) hover:bg-muted/60"
              >
                {tNav(item.key)}
              </a>
            ))}
          </nav>

          {/* Desktop Actions: Language, Theme, CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              size="sm"
              variant="default"
              className="ml-2"
              rightIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => {
                const el = document.querySelector("#contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {tHero("cta_primary")}
            </Button>
          </div>

          {/* Mobile Right Controls: Language, Theme, Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-(--radius-md) text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring outline-none transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen ? tUi("close_menu") : tUi("open_menu")
              }
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
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
