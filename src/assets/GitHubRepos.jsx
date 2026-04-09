import React, { useEffect, useState } from "react";
import { useInView } from "./useInView";

function RepoCard({ repo, delay }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className={`reveal${isInView ? " in-view" : ""} reveal-delay-${delay}`}>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="block h-full p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/30 dark:hover:border-cyan-400/20"
      >
        <h3 className="font-semibold text-cyan-600 dark:text-cyan-300 tracking-tight">{repo.name}</h3>
        <p className="text-sm text-slate-600 dark:text-gray-300 mt-2 leading-relaxed">{repo.description}</p>
        <div className="text-xs text-slate-400 dark:text-gray-500 mt-3 flex items-center gap-2">
          <span>★ {repo.stargazers_count}</span>
          {repo.language && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>{repo.language}</span>
            </>
          )}
        </div>
      </a>
    </div>
  );
}

export default function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) return <div className="text-red-400">Error loading repos: {error}</div>;
  if (!repos.length) return <div className="text-gray-400">No repos found.</div>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r, i) => (
        <RepoCard key={r.id} repo={r} delay={(i % 3) + 1} />
      ))}
    </div>
  );
}
