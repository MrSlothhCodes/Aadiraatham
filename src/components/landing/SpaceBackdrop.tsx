import * as React from "react";

/**
 * Fixed full-viewport space scene that transitions with scroll.
 * Altitude descends from deep space (top) → upper atmosphere → ground (bottom).
 * progress: 0 = space, 1 = surface.
 */
export function SpaceBackdrop() {
  const [progress, setProgress] = React.useState(0);
  const [altitude, setAltitude] = React.useState(420);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
      // Altitude readout: 420 km (ISS-ish) → 0 km
      setAltitude(Math.round(420 * (1 - p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pre-generate stars once
  const stars = React.useMemo(
    () =>
      Array.from({ length: 120 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.6 + 0.3,
        d: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    [],
  );

  // Color stops: deep space → twilight → atmosphere blue → dawn horizon
  // We blend two gradients via opacity.
  const spaceOpacity = 1 - progress;
  const atmosphereOpacity = Math.max(0, Math.min(1, (progress - 0.35) / 0.35));
  const groundOpacity = Math.max(0, (progress - 0.75) / 0.25);
  const starOpacity = Math.max(0, 1 - progress * 1.6);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        {/* Deep space layer */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spaceOpacity,
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.22 0.1 280) 0%, oklch(0.1 0.05 265) 45%, oklch(0.06 0.03 260) 100%)",
          }}
        />
        {/* Nebula clouds */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spaceOpacity * 0.9,
            background:
              "radial-gradient(ellipse 60% 40% at 20% 30%, oklch(0.55 0.2 290 / 0.45), transparent 60%), radial-gradient(ellipse 50% 35% at 80% 60%, oklch(0.6 0.18 220 / 0.35), transparent 65%), radial-gradient(ellipse 40% 30% at 50% 80%, oklch(0.55 0.2 320 / 0.25), transparent 60%)",
            filter: "blur(20px)",
          }}
        />

        {/* Atmosphere (mid altitude) */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: atmosphereOpacity,
            background:
              "linear-gradient(to bottom, oklch(0.18 0.08 265) 0%, oklch(0.32 0.12 240) 40%, oklch(0.45 0.14 220) 80%, oklch(0.5 0.12 200) 100%)",
          }}
        />

        {/* Ground / horizon (low altitude) */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: groundOpacity,
            background:
              "linear-gradient(to bottom, oklch(0.45 0.14 220) 0%, oklch(0.55 0.16 200) 35%, oklch(0.4 0.1 60) 70%, oklch(0.22 0.06 40) 100%)",
          }}
        />

        {/* Stars */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: starOpacity }}
        >
          {stars.map((st, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: `${st.s}px`,
                height: `${st.s}px`,
                opacity: 0.6 + Math.random() * 0.4,
                animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
                boxShadow: "0 0 4px rgba(255,255,255,0.8)",
              }}
            />
          ))}
        </div>

        {/* Distant planet (visible while in space) */}
        <div
          className="absolute -right-20 top-[8%] size-72 rounded-full transition-opacity duration-500 sm:size-96"
          style={{
            opacity: starOpacity * 0.9,
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.7 0.16 60), oklch(0.4 0.14 40) 55%, oklch(0.18 0.06 30) 90%)",
            boxShadow:
              "inset -30px -30px 80px oklch(0 0 0 / 0.7), 0 0 80px oklch(0.6 0.18 50 / 0.35)",
          }}
        />

        {/* Curved earth horizon (appears at landing) */}
        <div
          className="absolute -bottom-[60vh] left-1/2 size-[200vw] -translate-x-1/2 rounded-full transition-opacity duration-500"
          style={{
            opacity: groundOpacity,
            background:
              "radial-gradient(circle at 50% 0%, oklch(0.55 0.16 200) 0%, oklch(0.45 0.12 180) 30%, oklch(0.3 0.08 150) 50%, oklch(0.2 0.06 120) 70%, oklch(0.12 0.04 90) 100%)",
          }}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Altitude HUD — fixed right-side gauge */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <div className="flex items-center gap-3">
          <div className="relative h-64 w-1 rounded-full bg-white/10">
            <div
              className="absolute left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_var(--primary)]"
              style={{ top: `${progress * 100}%` }}
            />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
            <div className="text-primary">ALT</div>
            <div className="mt-1 text-base font-bold text-foreground">
              {altitude}
              <span className="text-[9px] text-foreground/60"> km</span>
            </div>
            <div className="mt-1 text-[9px] text-foreground/50">
              {progress < 0.33
                ? "ORBIT"
                : progress < 0.7
                  ? "DESCENT"
                  : progress < 0.95
                    ? "ENTRY"
                    : "TOUCHDOWN"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
