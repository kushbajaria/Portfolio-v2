import React, { Suspense, useEffect, useState } from "react";
import Hero from "./Hero";
import Typewriter from "./Typewriter";
import Skills from "./Skills";
import ThemeToggle from "./ThemeToggle";

const GitHubRepos = React.lazy(() => import("./GitHubRepos"));

export default function Landing() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      localStorage.getItem("theme") || (document.documentElement.classList.contains("dark") ? "dark" : "light")
    ) === "dark";
  });

  useEffect(() => {
    function onThemeChange() {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const containerClass = isDark
    ? "min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white"
    : "min-h-screen bg-gradient-to-b from-white via-slate-100 to-white text-slate-900";

  const viewProjectsClass = isDark
    ? "hidden md:inline-block px-3 py-2 bg-cyan-500 text-black font-semibold rounded-md hover:bg-cyan-400 transition"
    : "hidden md:inline-block px-3 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 transition";

  const contactClass = isDark
    ? "hidden md:inline-block px-3 py-2 border border-cyan-500 text-cyan-300 rounded-md hover:bg-cyan-500 hover:text-black transition"
    : "hidden md:inline-block px-3 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100 hover:text-slate-900 transition";

  return (
    <div className={containerClass}>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <a href="#projects" className={viewProjectsClass}>
          View Projects
        </a>
        <a href="#contact" className={contactClass}>
          Contact
        </a>
        <ThemeToggle />
      </div>

      <Hero />

      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <Typewriter
            phrases={["Skills"]}
            showCursor={false}
            className={isDark ? "text-2xl font-semibold text-cyan-300" : "text-2xl font-semibold text-cyan-600"}
          />
        </div>

        <Skills />

        <div id="projects" className="mt-12">
          <h2 className={isDark ? "text-2xl font-semibold mb-4 text-cyan-300 text-center" : "text-2xl font-semibold mb-4 text-cyan-600 text-center"}>
            Selected Repositories
          </h2>
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={isDark ? "h-36 rounded-lg bg-slate-800 animate-pulse" : "h-36 rounded-lg bg-slate-200 animate-pulse"} />
                ))}
              </div>
            }
          >
            <GitHubRepos username="kushbajaria" />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
