import React, { Suspense, useEffect, useState } from "react";
import Hero from "./Hero";
import Skills from "./Skills";
import ThemeToggle from "./ThemeToggle";
import AboutFull from "./AboutFull";
import Footer from "./Footer";

const GitHubRepos = React.lazy(() => import("./GitHubRepos"));

export default function Landing() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      localStorage.getItem("theme") || (document.documentElement.classList.contains("dark") ? "dark" : "light")
    ) === "dark";
  });

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    function onThemeChange() {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      setShowNav(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const containerClass = isDark
    ? "min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white"
    : "min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900";

  return (
    <div className={containerClass}>
      {/* Floating glassmorphism navbar */}
      <nav
        className={`glass-nav fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          showNav
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-white">
            Kush Bajaria
          </span>
          <div className="flex items-center gap-5">
            {["About", "Skills", "Projects", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Theme toggle before nav appears */}
      <div
        className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${
          showNav ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ThemeToggle />
      </div>

      <Hero />
      <AboutFull />
      <Skills />
      <Suspense fallback={null}>
        <GitHubRepos username="kushbajaria" />
      </Suspense>
      <Footer />
    </div>
  );
}
