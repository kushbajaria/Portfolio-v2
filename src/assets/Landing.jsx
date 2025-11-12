import React, { Suspense } from "react";
import Hero from "./Hero";
import Typewriter from "./Typewriter";
import Skills from "./Skills";
import ThemeToggle from "./ThemeToggle";

const GitHubRepos = React.lazy(() => import("./GitHubRepos"));

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Hero />

      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <Typewriter
            phrases={[
              "Skills"
            ]}
          />
        </div>

        <Skills />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Selected Repositories</h2>
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-36 rounded-lg bg-slate-800 animate-pulse" />
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
