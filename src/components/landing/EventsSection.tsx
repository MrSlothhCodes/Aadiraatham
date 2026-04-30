import * as React from "react";
import {
  Brain,
  CircuitBoard,
  Plane,
  Car,
  Swords,
  PackageSearch,
  MapPin,
  Tag,
  CalendarDays,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { APPLY_URL } from "@/lib/event-config";
import astronautImg from "@/assets/astronaut.png";
import shuttleImg from "@/assets/shuttle.png";

interface EventItem {
  icon: LucideIcon;
  day: string;
  name: string;
  description: string;
  meta: string;
  venue: string;
}

const events: EventItem[] = [
  {
    icon: Brain,
    day: "Day 1",
    name: "AI in Emerging Tech",
    description:
      "A 2-hour offline seminar exploring AI beyond software — how intelligent models drive sensors, embedded systems, and real-world hardware. Live quizzes with instant prizes.",
    meta: "Free · Seminar",
    venue: "Auditorium",
  },
  {
    icon: Swords,
    day: "Day 1",
    name: "Robo Wrestling",
    description:
      "Head-to-head knockouts in a defined arena. Disable, immobilise, or push your opponent out of the combat zone using design, drive, and tactics.",
    meta: "₹99 · 1–2 per team",
    venue: "B-Block, Ground floor",
  },
  {
    icon: CircuitBoard,
    day: "Day 1",
    name: "Circuit Mania",
    description:
      "Round 1: identify electronic components and explain their function. Top teams advance to Round 2 — design and build a working circuit from scratch.",
    meta: "₹99 · 1–2 per team",
    venue: "Auditorium",
  },
  {
    icon: Car,
    day: "Day 2",
    name: "Robo Race",
    description:
      "A multiplayer, time-based race where multiple bots compete on a common track. Strategic blocking allowed — destruction is not. Tests control, strategy, and grit.",
    meta: "₹99 · 1–3 per team",
    venue: "C-Block, Ground floor",
  },
  {
    icon: Plane,
    day: "Day 2",
    name: "Drone Competition",
    description:
      "Manually pilot a drone through a predefined obstacle course and land on the target zone in the minimum time. Penalties for collisions and missed obstacles.",
    meta: "₹149 · 1–2 per team",
    venue: "Ground",
  },
  {
    icon: PackageSearch,
    day: "Day 2",
    name: "Hunt It & Make It",
    description:
      "A time-bound hardware hunt. Locate components hidden across permitted college zones, then assemble and complete your build in under 2 hours.",
    meta: "₹99 · 2–5 per team",
    venue: "Seminar Hall",
  },
];

export function EventsSection() {
  const [active, setActive] = React.useState<EventItem | null>(null);
  const ActiveIcon = active?.icon;

  return (
    <section
      id="events"
      className="relative overflow-hidden border-b border-border/60 py-24 sm:py-32"
    >
      {/* Floating astronaut — drifts across as the events area scrolls past */}
      <FloatingAstronaut />
      <FloatingShuttle />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            The competitions
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Six events. Two days. One arena.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From drones to head-to-head bot wrestling — pick your
            challenge.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => {
            const Icon = e.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <button
                type="button"
                onClick={() => setActive(e)}
                key={e.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card/40 p-6 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/70 hover:bg-card/60 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Corner brackets — mission control panel */}
                <span className="pointer-events-none absolute left-2 top-2 size-3 border-l border-t border-primary/60" />
                <span className="pointer-events-none absolute right-2 top-2 size-3 border-r border-t border-primary/60" />
                <span className="pointer-events-none absolute bottom-2 left-2 size-3 border-b border-l border-primary/60" />
                <span className="pointer-events-none absolute bottom-2 right-2 size-3 border-b border-r border-primary/60" />

                {/* Animated gradient border glow */}
                <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary-glow/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-primary/40 group-hover:to-primary-glow/40 group-hover:opacity-100" />

                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary via-primary-glow to-primary transition-transform duration-500 group-hover:scale-x-100" />

                {/* Subtle grid pattern */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Big faded number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-mono text-[7rem] font-black leading-none text-primary/10 transition-colors duration-500 group-hover:text-primary/20">
                  {num}
                </span>

                <div className="relative flex items-center justify-between">
                  <span className="relative grid size-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_30px_-2px_var(--primary)]">
                    <Icon className="size-7" />
                  </span>
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    ◉ {e.day}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-bold text-card-foreground transition-colors group-hover:text-primary">
                  {e.name}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {e.description}
                </p>

                <div className="relative mt-6 flex items-center justify-between border-t border-dashed border-primary/30 pt-4 text-xs">
                  <span className="font-mono font-semibold text-primary">{e.meta}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <span className="font-mono uppercase tracking-wider">Launch</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          {active ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {ActiveIcon ? (
                    <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                      <ActiveIcon className="size-6" />
                    </span>
                  ) : null}
                  <div className="flex flex-col items-start gap-1">
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                      {active.day}
                    </span>
                    <DialogTitle className="font-display text-2xl">
                      {active.name}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="pt-3 text-base leading-relaxed">
                  {active.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-primary" />
                  <span className="font-medium">{active.meta}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-muted-foreground">{active.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" />
                  <span className="text-muted-foreground">{active.day} · May 14–15, 2026</span>
                </div>
              </div>

              <DialogFooter>
                <Button asChild className="w-full sm:w-auto">
                  <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function FloatingAstronaut() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current?.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section just enters bottom of viewport, 1 when it has fully exited the top
      const total = rect.height + vh;
      const passed = vh - rect.top;
      setP(Math.max(0, Math.min(1, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          // Drift diagonally across the section as user scrolls past it
          left: `${-15 + p * 115}%`,
          top: `${5 + p * 85}%`,
          transform: `rotate(${-15 + p * 35}deg)`,
          transition: "transform 120ms linear",
        }}
      >
        <div style={{ animation: "float-slow 6s ease-in-out infinite" }}>
          <img
            src={astronautImg}
            alt=""
            width={320}
            height={320}
            loading="lazy"
            className="w-[150px] sm:w-[220px] lg:w-[280px] h-auto select-none"
            style={{
              filter:
                "drop-shadow(0 0 25px rgba(120,180,255,0.45)) drop-shadow(0 0 60px rgba(80,130,220,0.35))",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function FloatingShuttle() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current?.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      setP(Math.max(0, Math.min(1, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          // Drift opposite direction — right to left across the section
          right: `${-15 + p * 110}%`,
          top: `${30 + p * 40}%`,
          transform: `rotate(${15 - p * 30}deg)`,
          transition: "transform 120ms linear",
        }}
      >
        <div style={{ animation: "float-slow 7s ease-in-out infinite" }}>
          <img
            src={shuttleImg}
            alt=""
            width={420}
            height={210}
            loading="lazy"
            className="w-[180px] sm:w-[280px] lg:w-[360px] h-auto select-none"
            style={{
              filter:
                "drop-shadow(0 0 20px rgba(120,170,255,0.45)) drop-shadow(0 0 50px rgba(80,130,220,0.3))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
