import React, { useEffect, useState } from "react";

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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <a
          key={r.id}
          href={r.html_url}
          target="_blank"
          rel="noreferrer"
          className="block p-4 bg-slate-800 rounded-lg hover:scale-105 transition-transform"
        >
          <h3 className="font-semibold text-cyan-300">{r.name}</h3>
          <p className="text-sm text-gray-300 mt-1">{r.description}</p>
          <div className="text-xs text-gray-400 mt-2">★ {r.stargazers_count} • {r.language}</div>
        </a>
      ))}
    </div>
  );
}
