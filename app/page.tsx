import nextDynamic from "next/dynamic";
import { TopBar } from "@/components/landing/TopBar";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Problem } from "@/components/landing/Problem";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Integrations } from "@/components/landing/Integrations";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const ChatWidget = nextDynamic(
  () => import("@/components/landing/ChatWidget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
);

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Problem />
        <Features />
        <HowItWorks />
        <Integrations />
        <TestimonialsCarousel />
        <PricingPreview />
        <CTASection />
        <Footer />
      </main>
      <ChatWidget />
    </>
  );
}