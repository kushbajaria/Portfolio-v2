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
        className="block h-full p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-400/50 dark:hover:border-cyan-400/40"
      >
        <h3 className="font-semibold text-cyan-600 dark:text-cyan-300">{repo.name}</h3>
        <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">{repo.description}</p>
        <div className="text-xs text-slate-500 dark:text-gray-400 mt-2">★ {repo.stargazers_count} • {repo.language}</div>
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r, i) => (
        <RepoCard key={r.id} repo={r} delay={(i % 3) + 1} />
      ))}
    </div>
  );
}
