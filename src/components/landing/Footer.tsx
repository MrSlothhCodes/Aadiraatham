import { Instagram, Linkedin, Mail } from "lucide-react";
import { CONTACT, EVENT } from "@/lib/event-config";
import logoClub from "@/assets/logo-club.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/40 backdrop-blur-md py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img
            src={logoClub}
            alt={`${EVENT.organiser} logo`}
            className="size-8 rounded-full bg-background object-cover ring-1 ring-border"
          />
          <span className="font-display text-sm font-semibold">
            {EVENT.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {EVENT.organiser}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
