import * as React from "react";

function Shuttle() {
  return (
    <svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_20px_rgba(180,210,255,0.5)] sm:scale-110"
    >
      {/* Engine flames */}
      <path
        d="M0 30 Q 10 22, 22 28 Q 10 30, 22 32 Q 10 38, 0 30 Z"
        fill="url(#flame)"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="0.4s"
          repeatCount="indefinite"
        />
      </path>
      {/* Body */}
      <path
        d="M20 24 L80 22 Q 105 30, 80 38 L20 36 Q 14 30, 20 24 Z"
        fill="#e6ecf5"
        stroke="#94a3b8"
        strokeWidth="0.8"
      />
      {/* Cockpit window */}
      <circle cx="92" cy="30" r="4" fill="#7dd3fc" stroke="#0ea5e9" strokeWidth="0.8" />
      {/* Wing */}
      <path d="M40 36 L55 50 L72 38 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />
      <path d="M40 24 L55 12 L72 22 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />
      {/* Stripe */}
      <rect x="30" y="29" width="50" height="2" fill="#ef4444" rx="1" />
      <defs>
        <linearGradient id="flame" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="40%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Astronaut() {
  return (
    <svg
      width="80"
      height="100"
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_15px_rgba(160,200,255,0.45)]"
    >
      {/* Tether */}
      <path
        d="M40 5 Q 30 18, 40 30"
        stroke="#94a3b8"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        fill="none"
      />
      {/* Backpack */}
      <rect x="22" y="40" width="36" height="28" rx="6" fill="#94a3b8" />
      {/* Body suit */}
      <ellipse cx="40" cy="55" rx="20" ry="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      {/* Arms */}
      <rect x="10" y="48" width="14" height="9" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="56" y="48" width="14" height="9" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      {/* Gloves */}
      <circle cx="10" cy="52" r="5" fill="#e2e8f0" stroke="#94a3b8" />
      <circle cx="70" cy="52" r="5" fill="#e2e8f0" stroke="#94a3b8" />
      {/* Legs */}
      <rect x="28" y="72" width="10" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="42" y="72" width="10" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      {/* Boots */}
      <ellipse cx="33" cy="94" rx="6" ry="3" fill="#475569" />
      <ellipse cx="47" cy="94" rx="6" ry="3" fill="#475569" />
      {/* Helmet */}
      <circle cx="40" cy="32" r="16" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      {/* Visor */}
      <ellipse cx="40" cy="32" rx="11" ry="10" fill="url(#visor)" stroke="#0f172a" strokeWidth="0.8" />
      {/* Visor reflection */}
      <ellipse cx="36" cy="28" rx="3" ry="2" fill="white" opacity="0.7" />
      {/* Chest panel */}
      <rect x="34" y="50" width="12" height="8" rx="1.5" fill="#1e293b" />
      <circle cx="37" cy="54" r="1" fill="#22d3ee" />
      <circle cx="40" cy="54" r="1" fill="#facc15" />
      <circle cx="43" cy="54" r="1" fill="#ef4444" />
      <defs>
        <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="60%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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

  // Pre-generate stars once — denser starfield
  const stars = React.useMemo(
    () =>
      Array.from({ length: 320 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.8 + 0.3,
        d: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        bright: Math.random() > 0.85,
      })),
    [],
  );

  // A few brighter "shooting" stars / large twinkles
  const bigStars = React.useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 70,
        d: Math.random() * 3 + 3,
        delay: Math.random() * 4,
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
                opacity: st.bright ? 0.95 : 0.55 + Math.random() * 0.4,
                animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
                boxShadow: st.bright
                  ? "0 0 8px rgba(255,255,255,1), 0 0 16px rgba(180,210,255,0.7)"
                  : "0 0 4px rgba(255,255,255,0.8)",
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
                  "0 0 10px #fff, 0 0 20px #bcd5ff, 0 0 40px rgba(140,180,255,0.6)",
                animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* The Moon — visible while in space, with cratered texture */}
        <div
          className="absolute -right-16 top-[8%] size-72 rounded-full transition-opacity duration-500 sm:size-96"
          style={{
            opacity: starOpacity * 0.95,
            background: [
              // Maria (dark patches)
              "radial-gradient(circle at 35% 40%, rgba(70,80,100,0.55) 0 6%, transparent 7%)",
              "radial-gradient(circle at 55% 30%, rgba(60,70,90,0.5) 0 5%, transparent 6%)",
              "radial-gradient(circle at 60% 60%, rgba(70,80,100,0.6) 0 9%, transparent 10%)",
              "radial-gradient(circle at 40% 70%, rgba(60,70,90,0.5) 0 7%, transparent 8%)",
              // Small craters
              "radial-gradient(circle at 25% 25%, rgba(40,45,55,0.7) 0 1.4%, transparent 1.6%)",
              "radial-gradient(circle at 70% 22%, rgba(40,45,55,0.7) 0 1.2%, transparent 1.4%)",
              "radial-gradient(circle at 30% 55%, rgba(40,45,55,0.7) 0 1.6%, transparent 1.8%)",
              "radial-gradient(circle at 65% 75%, rgba(40,45,55,0.7) 0 1.4%, transparent 1.6%)",
              "radial-gradient(circle at 80% 50%, rgba(40,45,55,0.7) 0 1.2%, transparent 1.4%)",
              "radial-gradient(circle at 50% 85%, rgba(40,45,55,0.7) 0 1.4%, transparent 1.6%)",
              "radial-gradient(circle at 18% 75%, rgba(40,45,55,0.6) 0 1%, transparent 1.2%)",
              // Base sphere shading
              "radial-gradient(circle at 30% 30%, #f4f1ea 0%, #d6d2c8 40%, #8c8a85 75%, #2a2a2e 100%)",
            ].join(", "),
            boxShadow:
              "inset -28px -28px 70px rgba(0,0,0,0.8), 0 0 60px rgba(200,215,255,0.25), 0 0 120px rgba(160,190,240,0.15)",
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

      {/* Astronaut + Space shuttle — drift across as user scrolls */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {/* Space shuttle — moves left to right, descends with scroll */}
        <div
          className="absolute transition-transform duration-200 ease-out"
          style={{
            left: `${-10 + progress * 110}%`,
            top: `${15 + progress * 25}%`,
            transform: `rotate(${10 + progress * 25}deg)`,
            opacity: Math.max(0, 1 - progress * 1.1),
          }}
        >
          <Shuttle />
        </div>

        {/* Astronaut — floats down on the left, slowly rotates */}
        <div
          className="absolute"
          style={{
            left: `${8 + Math.sin(progress * Math.PI * 2) * 6}%`,
            top: `${10 + progress * 75}%`,
            transform: `rotate(${progress * 360 * 0.6}deg)`,
            opacity: Math.max(0.15, 1 - progress * 0.6),
            animation: "float-slow 6s ease-in-out infinite",
          }}
        >
          <Astronaut />
        </div>
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
