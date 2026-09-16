import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { LogoMarquee } from "./LogoMarquee";
import { GuidedSteps } from "./GuidedSteps";
import { InvoiceExamples } from "./InvoiceExamples";
import { SocialProof } from "./SocialProof";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { SiteFooter } from "./SiteFooter";
import { FeedbackWidget } from "./FeedbackWidget";
import { CookieConsent } from "./CookieConsent";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-navy antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <LogoMarquee />
        <InvoiceExamples />
        <GuidedSteps />
        <SocialProof />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <FeedbackWidget />
      <CookieConsent />
    </div>
  );
}
