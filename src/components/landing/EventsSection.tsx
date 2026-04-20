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
          {events.map((e) => {
            const Icon = e.icon;
            return (
              <article
                key={e.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-glow transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {e.day}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-card-foreground">
                  {e.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                  <span className="font-medium text-primary">{e.meta}</span>
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
