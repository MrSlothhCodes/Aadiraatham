import { Phone, Mail, MapPin, ArrowRight, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APPLY_URL, CONTACT } from "@/lib/event-config";

const coordinators = [
  { name: "Harshvardhan Jaiswal", role: "Student Coordinator", phone: "9303538391" },
  { name: "Sumit Maheshwari", role: "Student Coordinator", phone: "7909766208" },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Get in touch
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Questions? Talk to a coordinator.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Reach out before the event for queries about registration, rules,
            or logistics.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {coordinators.map((c) => (
            <a
              key={c.phone}
              href={`tel:${c.phone}`}
              className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/40 p-6 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Phone className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-display text-lg font-semibold text-card-foreground">
                  {c.name}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.role}
                </div>
                <div className="mt-1 font-mono text-sm text-primary">
                  +91 {c.phone}
                </div>
              </div>
            </a>
          ))}

          <a
            href={`mailto:${CONTACT.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/40 p-6 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Mail className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Email
              </div>
              <div className="mt-1 break-all text-sm text-foreground">
                {CONTACT.email}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/40 p-6 backdrop-blur-xl">
            <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Venue
              </div>
              <div className="mt-1 text-sm text-foreground">
                IIST, Indore
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-3">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid size-11 place-items-center rounded-xl border border-primary/20 bg-card/40 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-11 place-items-center rounded-xl border border-primary/20 bg-card/40 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <Linkedin className="size-5" />
          </a>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[oklch(0.16_0.07_270)] via-[oklch(0.12_0.05_265)] to-[oklch(0.18_0.09_290)] p-10 text-center shadow-[0_0_60px_-15px_var(--primary)] backdrop-blur-xl sm:p-16">
          {/* Decorative star/glow accents */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 size-64 rounded-full bg-primary-glow/20 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, white 0.5px, transparent 1px), radial-gradient(circle at 40% 80%, white 0.5px, transparent 1px)",
              backgroundSize: "60px 60px, 90px 90px, 120px 120px",
            }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Mission Briefing
            </span>
            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to compete?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
              Registrations close soon. Lock your team in before the spots fill
              up.
            </p>
            <Button
              asChild
              size="lg"
              className="group relative mt-8 h-12 overflow-hidden bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_30px_-4px_var(--primary)] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_-2px_var(--primary)]"
            >
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
