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

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-2xl border border-primary/15 bg-background/20 px-5 py-3 backdrop-blur-sm">
            <img
              src={iistLogo}
              alt="IIST · ECE Department"
              className="h-12 w-auto sm:h-16 object-contain mix-blend-screen opacity-60 [filter:drop-shadow(0_0_18px_rgba(140,190,255,0.55))_brightness(1.15)_contrast(1.05)]"
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

        {/* Highlighted date + venue cards */}
        <div className="mt-10 flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row">
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-gradient-to-r from-[oklch(0.32_0.12_250)] via-[oklch(0.28_0.14_265)] to-[oklch(0.22_0.1_280)] px-8 text-base text-foreground ring-1 ring-primary/40 shadow-[0_0_40px_-8px_var(--primary)] hover:from-[oklch(0.36_0.13_250)] hover:to-[oklch(0.26_0.12_280)]"
          >
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              <Sparkles className="size-4 text-primary" />
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
