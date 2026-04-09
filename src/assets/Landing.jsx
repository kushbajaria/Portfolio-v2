import React, { Suspense, useEffect, useState } from "react";
import Hero from "./Hero";
import Typewriter from "./Typewriter";
import Skills from "./Skills";
import ThemeToggle from "./ThemeToggle";
import AboutFull from "./AboutFull";
import Footer from "./Footer";
import { useInView } from "./useInView";

const GitHubRepos = React.lazy(() => import("./GitHubRepos"));

export default function Landing() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      localStorage.getItem("theme") || (document.documentElement.classList.contains("dark") ? "dark" : "light")
    ) === "dark";
  });

  /* Track scroll position for sticky nav visibility */
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
      // Show nav after scrolling past ~70% of the viewport (hero area)
      setShowNav(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const containerClass = isDark
    ? "min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white"
    : "min-h-screen bg-gradient-to-b from-white via-slate-100 to-white text-slate-900";

  const { ref: skillsHeadingRef, isInView: skillsHeadingInView } = useInView({ threshold: 0.3 });
  const { ref: reposHeadingRef, isInView: reposHeadingInView } = useInView({ threshold: 0.3 });

  return (
    <div className={containerClass}>
      {/* ── Floating glassmorphism navbar — appears after scrolling past hero ── */}
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
          <div className="flex items-center gap-4">
            <a
              href="#about"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Theme toggle visible before nav appears */}
      <div
        className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${
          showNav ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ThemeToggle />
      </div>

      <Hero />

      {/* ── Section divider ── */}
      <div className="section-divider my-8" aria-hidden="true" />

      {/* ── About ── */}
      <AboutFull />

      {/* ── Section divider ── */}
      <div className="section-divider my-8" aria-hidden="true" />

      {/* ── Skills & Projects ── */}
      <section id="skills" className="px-6 py-24 md:py-32 max-w-5xl mx-auto">
        <div
          ref={skillsHeadingRef}
          className={`mb-12 text-center reveal${skillsHeadingInView ? " in-view" : ""}`}
        >
          <Typewriter
            phrases={["Skills"]}
            showCursor={false}
            className={
              isDark
                ? "text-3xl md:text-4xl font-bold text-cyan-300"
                : "text-3xl md:text-4xl font-bold text-cyan-600"
            }
          />
        </div>

        <Skills />

        {/* ── Section divider ── */}
        <div className="section-divider my-16 md:my-24" aria-hidden="true" />

        <div id="projects" className="mt-0">
          <div
            ref={reposHeadingRef}
            className={`mb-12 reveal${reposHeadingInView ? " in-view" : ""}`}
          >
            <h2
              className={
                isDark
                  ? "text-3xl md:text-4xl font-bold text-cyan-300 text-center"
                  : "text-3xl md:text-4xl font-bold text-cyan-600 text-center"
              }
            >
              Repositories
            </h2>
          </div>
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={
                      isDark
                        ? "h-40 rounded-2xl bg-slate-800/60 animate-pulse"
                        : "h-40 rounded-2xl bg-slate-200/60 animate-pulse"
                    }
                  />
                ))}
              </div>
            }
          >
            <GitHubRepos username="kushbajaria" />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}
