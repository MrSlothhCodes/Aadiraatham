import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
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

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-2xl border border-primary/15 bg-background/20 px-5 py-3 backdrop-blur-sm">
            <img
              src={iistLogo}
              alt="IIST · ECE Department"
              className="h-10 w-auto sm:h-14 object-contain"
            />
          </div>
        </div>

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          {EVENT.organiser} presents
        </span>

        <h1 className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {EVENT.name.split(" ")[0]}
          <span className="block bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            {EVENT.name.split(" ")[1]}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A 2-day inter-college {EVENT.tagline.toLowerCase()} celebrating
          Robotics, AI, and engineering innovation.
        </p>

        {/* Highlighted date + venue cards */}
        <div className="mt-6 flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row">
          <div className="group relative flex-1 overflow-hidden rounded-xl border border-primary/40 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-4 backdrop-blur-md shadow-[0_0_30px_-10px_var(--primary)]">
            <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/20 blur-2xl" />
            <div className="flex items-center gap-3 text-left">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/40">
                <Calendar className="size-5" />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
                  Mission Date
                </div>
                <div className="font-display text-base font-bold text-foreground sm:text-lg">
                  {EVENT.dates}
                </div>
              </div>
            </div>
          </div>
          <div className="group relative flex-1 overflow-hidden rounded-xl border border-primary/40 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-4 backdrop-blur-md shadow-[0_0_30px_-10px_var(--primary)]">
            <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/20 blur-2xl" />
            <div className="flex items-center gap-3 text-left">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/40">
                <MapPin className="size-5" />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
                  Launch Pad
                </div>
                <div className="font-display text-base font-bold text-foreground sm:text-lg">
                  {EVENT.venue}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group relative h-12 overflow-hidden bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_30px_-4px_var(--primary)] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_-2px_var(--primary)]"
          >
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              <Sparkles className="size-4" />
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
