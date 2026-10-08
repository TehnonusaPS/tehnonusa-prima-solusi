import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
} from "@/components/ui/motion-primitives";
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const tHero = useTranslations("hero");

  return (
    <main className="flex-1 py-12 sm:py-20">
      <Container size="lg">
        {/* Section Heading Component Showcase */}
        <SlideUp>
          <SectionHeading
            badge="UI & Design System Foundation"
            title={
              <>
                Membangun Pondasi{" "}
                <span className="text-primary">Solusi Digital</span> Modern
              </>
            }
            description={tHero("description")}
          />
        </SlideUp>

        {/* Action Buttons Showcase */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Button
              variant="default"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {tHero("cta_primary")}
            </Button>
            <Button variant="secondary" size="lg">
              Secondary Button
            </Button>
            <Button variant="outline" size="lg">
              Outline Button
            </Button>
            <Button variant="subtle" size="lg">
              Subtle Button
            </Button>
            <Button variant="ghost" size="lg">
              Ghost Button
            </Button>
          </div>
        </FadeIn>

        {/* Badges Showcase */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
            <Badge variant="default" withDot>
              Production Ready
            </Badge>
            <Badge variant="secondary">Enterprise</Badge>
            <Badge variant="surface">Next.js 16</Badge>
            <Badge variant="outline">Tailwind v4</Badge>
            <Badge variant="success">Active System</Badge>
            <Badge variant="warning">Work in Progress</Badge>
          </div>
        </FadeIn>

        {/* Cards Showcase via StaggerContainer */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card interactive>
            <CardHeader>
              <div className="w-10 h-10 rounded-(--radius-md) bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <CardTitle>Custom Web System</CardTitle>
              <CardDescription>
                Arsitektur modular berbasis Next.js dan TypeScript untuk kebutuhan enterprise.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Type-safe & Scalable
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  High Performance Core
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                Pelajari Selengkapnya
              </Button>
            </CardFooter>
          </Card>

          <Card interactive>
            <CardHeader>
              <div className="w-10 h-10 rounded-(--radius-md) bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <CardTitle>Digital Transformation</CardTitle>
              <CardDescription>
                Modernisasi alur kerja manual menjadi sistem terintegrasi dan otomatis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  API & Third-Party Integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Cloud Infrastructure
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                Pelajari Selengkapnya
              </Button>
            </CardFooter>
          </Card>

          <Card interactive>
            <CardHeader>
              <div className="w-10 h-10 rounded-(--radius-md) bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <CardTitle>Internal Business App</CardTitle>
              <CardDescription>
                Dashboard analitik, manajemen operasional, dan portal bisnis custom.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Role-based Access Control
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Data Analytics & Reporting
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                Pelajari Selengkapnya
              </Button>
            </CardFooter>
          </Card>
        </StaggerContainer>

        {/* Verification Status Banner */}
        <div className="mt-16 text-center">
          <Badge variant="surface" size="md">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            TASK 02 UI Foundation Verified — Ready for TASK 03 (Hero & Navbar)
          </Badge>
        </div>
      </Container>
    </main>
  );
}
