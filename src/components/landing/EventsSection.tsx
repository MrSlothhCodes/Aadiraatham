import {
  Brain,
  CircuitBoard,
  Plane,
  Car,
  Swords,
  PackageSearch,
  type LucideIcon,
} from "lucide-react";

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
  return (
    <section id="events" className="border-b border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <article
                key={e.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:shadow-elegant"
              >
                {/* Animated gradient border glow */}
                <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary-glow/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-primary/30 group-hover:to-primary-glow/30 group-hover:opacity-100" />

                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary via-primary-glow to-primary transition-transform duration-500 group-hover:scale-x-100" />

                {/* Big faded number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-black leading-none text-primary/5 transition-colors duration-500 group-hover:text-primary/10">
                  {num}
                </span>

                <div className="relative flex items-center justify-between">
                  <span className="relative grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary))]">
                    <Icon className="size-7" />
                  </span>
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                    {e.day}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-bold text-card-foreground transition-colors group-hover:text-primary">
                  {e.name}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>

                <div className="relative mt-6 flex items-center justify-between border-t border-dashed border-border/60 pt-4 text-xs">
                  <span className="font-semibold text-primary">{e.meta}</span>
                  <span className="text-muted-foreground">{e.venue}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
