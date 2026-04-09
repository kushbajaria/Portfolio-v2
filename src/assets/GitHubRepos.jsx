import React, { useEffect, useState } from "react";
import { useInView } from "./useInView";

function RepoCard({ repo, delay }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className={`reveal reveal-delay-${delay}${isInView ? " in-view" : ""}`}>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="group block h-full p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-black/30 hover:border-slate-300 dark:hover:border-slate-600"
      >
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden
          >
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
            {repo.name}
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {repo.description || "No description"}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500/70" />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && <span>&#9733; {repo.stargazers_count}</span>}
        </div>
      </a>
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
      <div className="max-w-4xl mx-auto px-6">
        <div ref={headingRef} className={`mb-12 text-center reveal${headingInView ? " in-view" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projects
          </h2>
        </div>

        {error ? (
          <p className="text-center text-sm text-red-400">Could not load repositories.</p>
        ) : !repos.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-36 rounded-2xl bg-slate-100 dark:bg-slate-800/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <RepoCard key={r.id} repo={r} delay={(i % 3) + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
