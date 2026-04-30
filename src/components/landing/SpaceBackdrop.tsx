import * as React from "react";
import moonImg from "@/assets/moon.png";

/**
 * Fixed full-viewport space scene that transitions with scroll.
 * Altitude descends from deep space (top) → upper atmosphere → ground (bottom).
 * progress: 0 = space, 1 = surface.
 */
export function SpaceBackdrop() {
  const [progress, setProgress] = React.useState(0);
  const [altitude, setAltitude] = React.useState(1000);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
      // Altitude readout: 1000 km → 0 km
      setAltitude(Math.round(1000 * (1 - p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Dense starfield
  const stars = React.useMemo(
    () =>
      Array.from({ length: 500 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.6 + 0.3,
        d: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        bright: Math.random() > 0.88,
      })),
    [],
  );

  // Brighter sparkle stars
  const bigStars = React.useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 75,
        d: Math.random() * 3 + 3,
        delay: Math.random() * 4,
      })),
    [],
  );

  const spaceOpacity = 1 - progress;
  const atmosphereOpacity = Math.max(0, Math.min(1, (progress - 0.4) / 0.35));
  const groundOpacity = Math.max(0, (progress - 0.8) / 0.2);
  const starOpacity = Math.max(0, 1 - progress * 1.5);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        {/* Deep space — darker, richer */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spaceOpacity,
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.18 0.09 275) 0%, oklch(0.08 0.05 265) 45%, oklch(0.04 0.02 260) 100%)",
          }}
        />

        {/* Nebula clouds — more vivid */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spaceOpacity,
            background:
              "radial-gradient(ellipse 55% 38% at 18% 25%, oklch(0.5 0.22 295 / 0.55), transparent 60%), radial-gradient(ellipse 50% 35% at 82% 55%, oklch(0.55 0.2 220 / 0.45), transparent 65%), radial-gradient(ellipse 45% 32% at 50% 85%, oklch(0.5 0.22 320 / 0.4), transparent 60%), radial-gradient(ellipse 30% 25% at 75% 15%, oklch(0.55 0.18 200 / 0.35), transparent 65%)",
            filter: "blur(24px)",
          }}
        />

        {/* Subtle film grain via repeating gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spaceOpacity * 0.5,
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0px, transparent 1px), radial-gradient(circle at 60% 70%, rgba(255,255,255,0.025) 0px, transparent 1px)",
            backgroundSize: "3px 3px, 5px 5px",
          }}
        />

        {/* Atmosphere — stays in deep purple/indigo tones (no green) */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: atmosphereOpacity,
            background:
              "linear-gradient(to bottom, oklch(0.12 0.06 270) 0%, oklch(0.18 0.09 270) 50%, oklch(0.22 0.11 265) 100%)",
          }}
        />

        {/* Lower atmosphere — subtle deep-blue glow, no green */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: groundOpacity,
            background:
              "linear-gradient(to bottom, oklch(0.18 0.09 270) 0%, oklch(0.14 0.07 265) 50%, oklch(0.08 0.05 265) 100%)",
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
                opacity: st.bright ? 0.95 : 0.5 + Math.random() * 0.4,
                animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
                boxShadow: st.bright
                  ? "0 0 8px rgba(255,255,255,1), 0 0 18px rgba(180,210,255,0.7)"
                  : "0 0 3px rgba(255,255,255,0.7)",
              }}
            />
          ))}
          {bigStars.map((st, i) => (
            <span
              key={`big-${i}`}
              className="absolute"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: 3,
                height: 3,
                borderRadius: "9999px",
                background: "white",
                boxShadow:
                  "0 0 12px #fff, 0 0 24px #bcd5ff, 0 0 48px rgba(140,180,255,0.7)",
                animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* The Moon — realistic texture with glow */}
        <div
          className="absolute right-[-3%] top-[6%] transition-opacity duration-500 sm:right-[2%] sm:top-[5%]"
          style={{ opacity: starOpacity * 0.95 }}
        >
          {/* Outer glow halo */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,228,150,0.6) 0%, rgba(240,200,120,0.3) 40%, transparent 75%)",
              transform: "scale(1.6)",
              animation: "moon-pulse 6s ease-in-out infinite",
            }}
          />
          <img
            src={moonImg}
            alt=""
            width={400}
            height={400}
            loading="lazy"
            className="size-56 object-contain sm:size-80 lg:size-96"
            style={{
              filter:
                "sepia(0.55) saturate(1.5) hue-rotate(-12deg) brightness(1.05) drop-shadow(0 0 30px rgba(255,220,140,0.65)) drop-shadow(0 0 80px rgba(240,190,100,0.45))",
            }}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Altitude HUD — visible on mobile too (compact) */}
      <div className="pointer-events-none fixed right-2 top-1/2 z-30 -translate-y-1/2 sm:right-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative h-40 w-1 rounded-full bg-white/10 sm:h-64">
            <div
              className="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_var(--primary)] sm:size-3"
              style={{ top: `${progress * 100}%` }}
            />
          </div>
          <div className="rounded-md border border-primary/20 bg-background/40 px-1.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-md sm:px-2 sm:py-1.5 sm:text-[10px]">
            <div className="text-primary">ALT</div>
            <div className="mt-0.5 text-sm font-bold text-foreground sm:text-base">
              {altitude}
              <span className="text-[8px] text-foreground/60 sm:text-[9px]"> km</span>
            </div>
            <div className="mt-0.5 text-[8px] text-foreground/60 sm:text-[9px]">
              {progress < 0.33
                ? "ORBIT"
                : progress < 0.7
                  ? "DESCENT"
                  : progress < 0.95
                    ? "ENTRY"
                    : "LAND"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
