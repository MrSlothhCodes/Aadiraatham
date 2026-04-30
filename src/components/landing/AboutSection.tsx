import { Trophy, Users, Lightbulb } from "lucide-react";

const stats = [
  { icon: Users, label: "Expected participants", value: "500+" },
  { icon: Trophy, label: "Total prize pool", value: "₹50K+" },
  { icon: Lightbulb, label: "Days of innovation", value: "2" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative border-b border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              About us
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Where Code, Electronics and Mechanics collide and make the system intelligent.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                The <strong className="text-foreground">Robotics and Drone Club</strong>{" "}
                is a student-led community building hands-on experience at the
                intersection of hardware, AI and Mechanics
              </p>
              <p>
                Apratim Adirtham is our flagship inter-college fest — a stage
                for undergraduate engineers across mechanical, electronics, and
                computer science to compete, collaborate, and showcase
                engineering innovation in front of peers and industry mentors.
              </p>
              <p>
                Our mission is to bridge the gap between classroom theory and
                real-world systems, generating institutional prestige and
                growing the next generation of builders.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-6 rounded-2xl border border-primary/20 bg-card/40 p-6 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-glow"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-7" />
                  </span>
                  <div>
                    <div className="font-display text-3xl font-bold text-card-foreground">
                      {s.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
