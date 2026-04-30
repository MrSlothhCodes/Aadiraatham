import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APPLY_URL, EVENT } from "@/lib/event-config";
import iistLogo from "@/assets/logo-iist.png";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 bg-hero-gradient"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-2xl border border-primary/20 bg-background/40 px-5 py-3 backdrop-blur-md shadow-elegant">
            <img
              src={iistLogo}
              alt="IIST · ECE Department"
              className="h-12 w-auto sm:h-16 object-contain mix-blend-screen opacity-95 [filter:drop-shadow(0_0_12px_rgba(120,180,255,0.35))_brightness(1.05)]"
            />
          </div>
        </div>

        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          {EVENT.organiser} presents
        </span>

        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          {EVENT.name.split(" ")[0]}
          <span className="block bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            {EVENT.name.split(" ")[1]}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A 2-day inter-college {EVENT.tagline.toLowerCase()} celebrating
          Robotics, AI, and engineering innovation.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            {EVENT.dates}
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            {EVENT.mode}
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-primary px-8 text-base text-primary-foreground shadow-elegant hover:bg-primary/90"
          >
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              Apply Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 border-border bg-background/50 px-8 text-base backdrop-blur"
          >
            <a href="#events">View Events</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
