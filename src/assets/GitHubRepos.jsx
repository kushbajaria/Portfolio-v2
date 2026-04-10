import React, { useEffect, useState } from "react";
import { useInView } from "./useInView";

const langColors = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  Java: "#ED8B00",
  "C++": "#00599C",
  "C#": "#239120",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
};

function RepoCard({ repo, delay }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const dotColor = langColors[repo.language] || "#6B7280";

  return (
    <div ref={ref} className={`reveal reveal-delay-${delay}${isInView ? " in-view" : ""}`}>
      <div className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 via-slate-200/50 to-slate-200 dark:from-slate-700/60 dark:via-slate-700/20 dark:to-slate-700/60 hover:from-cyan-400/40 hover:via-purple-400/20 hover:to-cyan-400/40 transition-all duration-500">
        <div className="h-full rounded-2xl bg-white dark:bg-slate-900/90 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                {repo.name}
              </h3>
            </div>
            {/* External link icon */}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={`Open ${repo.name} on GitHub`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17l9.2-9.2M17 17V8H8" />
              </svg>
            </a>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
            {repo.description || "No description available"}
          </p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {repo.stargazers_count}
                </span>
              )}
            </div>
            {repo.fork && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                Fork
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const { ref: headingRef, isInView: headingInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!username) return;
    let mounted = true;

    fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=pushed`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => mounted && setRepos(data))
      .catch((e) => mounted && setError(e.message));

    return () => (mounted = false);
  }, [username]);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className={`mb-14 text-center reveal${headingInView ? " in-view" : ""}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
            What I've built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projects
          </h2>
        </div>

        {error ? (
          <p className="text-center text-sm text-red-500 dark:text-red-400">Could not load repositories.</p>
        ) : !repos.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-44 rounded-2xl bg-slate-100 dark:bg-slate-800/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <RepoCard key={r.id} repo={r} delay={(i % 3) + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
