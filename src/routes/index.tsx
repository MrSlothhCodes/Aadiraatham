import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

// Defer below-the-fold sections to reduce initial JS bundle size.
const EventsSection = lazy(() =>
  import("@/components/landing/EventsSection").then((m) => ({
    default: m.EventsSection,
  })),
);
const AboutSection = lazy(() =>
  import("@/components/landing/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/landing/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);
const Footer = lazy(() =>
  import("@/components/landing/Footer").then((m) => ({ default: m.Footer })),
);

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <EventsSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
