import React, { useEffect, useState } from "react";

export default function IntroGreeting({ name = "Kush Bajaria", role = "Full‑stack web developer" }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );

  const full = `${name}`;
  const letters = Array.from(full);

  useEffect(() => {
    let i = 0;
    const speed = 26; // stagger speed for a confident, elegant reveal
    const t = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= letters.length) {
        clearInterval(t);
        setDone(true);
      }
  }, speed);

    // respond to theme changes so the gradient matches
    function onThemeChange() {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => { 
      clearInterval(t);
      mo.disconnect();
    };
  }, []);

  const gradientDark = "linear-gradient(90deg,#e6eef2,#c2c9cc,#9ba3a6)";
  const gradientLight = "linear-gradient(90deg,#636363,#8f8f8f,#cfcfcf)";

  // Respect reduced motion preference
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return ( 
    <div className="absolute inset-x-0 top-1/4 sm:top-1/3 z-30 flex justify-center pointer-events-none">
      <style>{`
        @keyframes letterIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
        .intro-name span { display: inline-block; }
      `}</style>

      <div className="max-w-3xl text-center px-4">
        <h1
          className="intro-name text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundImage: isDark ? gradientDark : gradientLight,
            backgroundSize: done ? "200% 100%" : "100% 100%",
            animation: done && !prefersReduced ? "shimmer 3.5s linear infinite" : undefined,
            textShadow: isDark ? "0 12px 40px rgba(0,0,0,0.55)" : "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          {letters.map((ch, i) => {
            // render a visible gap on spaces so first/last name don't cramp together
            if (ch === " ") {
              return (
                <span
                  key={i}
                  aria-hidden={i >= visibleCount}
                  style={{
                    display: "inline-block",
                    width: i < visibleCount ? 12 : 0,
                    opacity: i < visibleCount ? 1 : 0,
                    transition: "width 220ms ease, opacity 220ms ease",
                  }}
                >
                  &nbsp;
                </span>
              );
            }

            return (
              <span
                key={i}
                aria-hidden={i >= visibleCount}
                style={{
                  opacity: i < visibleCount ? 1 : 0,
                  transform: i < visibleCount ? "none" : "translateY(10px) scale(0.98)",
                  animation: i < visibleCount || prefersReduced ? undefined : `letterIn 360ms forwards ${i * 22}ms`,
                  willChange: "transform, opacity",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundImage: isDark ? gradientDark : gradientLight,
                  backgroundSize: done ? "200% 100%" : "100% 100%",
                }}
              >
                {ch}
              </span>
            );
          })}
        </h1>

        <div className="mt-3">
          <div
            style={{
              height: 4,
              width: done ? 96 : 0,
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              margin: "10px auto 0",
              transition: "width 700ms cubic-bezier(.2,.9,.2,1)",
              borderRadius: 999,
            }}
          />
        </div>

        <p
          className="mt-3 text-sm md:text-base text-gray-300"
          style={{ opacity: done ? 1 : 0, transition: "opacity 450ms ease", transitionDelay: done ? "220ms" : "0ms" }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}
