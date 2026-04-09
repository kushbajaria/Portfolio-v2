import { useEffect, useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import IntroGreeting from "./IntroGreeting";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ParticlesBackground />
      <IntroGreeting />

      {/* Scroll-down indicator — fades out once user starts scrolling */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700"
        style={{ opacity: scrolled ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500 font-medium">
          Scroll
        </span>
        <svg
          className="scroll-indicator text-slate-500 dark:text-slate-500"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
