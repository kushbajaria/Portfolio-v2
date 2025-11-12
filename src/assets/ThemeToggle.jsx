import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return (
      localStorage.getItem("theme") ||
      (document.documentElement.classList.contains("dark") ? "dark" : "light")
    );
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggle}
        role="switch"
        aria-checked={theme === "dark"}
        className={`relative inline-flex items-center h-10 w-20 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
          theme === "dark" ? "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900" : "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200"
        }`}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        {/* Sun icon on left */}
        <span className="absolute left-2 text-xs select-none" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.22a.75.75 0 01.75-.72h0A.75.75 0 0111.5 3.22V4.5a.75.75 0 01-1.5 0V3.22zM4.47 5.06a.75.75 0 10-1.06-1.06L2.22 5.18a.75.75 0 101.06 1.06l1.19-1.18zM3.22 10a.75.75 0 01.72-.75h1.28a.75.75 0 010 1.5H3.94A.75.75 0 013.22 10zM5.41 14.94a.75.75 0 001.06 1.06l1.19-1.18a.75.75 0 10-1.06-1.06L5.41 14.94zM10 16.78a.75.75 0 01-.75.72h0A.75.75 0 019.5 16.78V15.5a.75.75 0 011.5 0v1.28zM14.59 14.94l1.18 1.18a.75.75 0 101.06-1.06l-1.18-1.18a.75.75 0 10-1.06 1.06zM16.06 10a.75.75 0 01.75-.72h1.28a.75.75 0 010 1.5h-1.28A.75.75 0 0116.06 10zM14.59 5.06a.75.75 0 011.06-1.06l1.18 1.18a.75.75 0 11-1.06 1.06L14.59 5.06z" />
            <path d="M10 6.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
          </svg>
        </span>

        {/* Knob */}
        <span
          className={`relative inline-block h-8 w-8 rounded-full bg-white shadow transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-10" : "translate-x-1"
          }`}
        >
          {/* moon icon inside knob when dark */}
          <span className={`absolute inset-0 flex items-center justify-center ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-800" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 116.707 2.707a6 6 0 0010.586 10.586z" />
            </svg>
          </span>
          {/* sun inside knob when light */}
          <span className={`absolute inset-0 flex items-center justify-center ${theme === "dark" ? "opacity-0" : "opacity-100"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3.22a.75.75 0 01.75-.72h0A.75.75 0 0111.5 3.22V4.5a.75.75 0 01-1.5 0V3.22zM4.47 5.06a.75.75 0 10-1.06-1.06L2.22 5.18a.75.75 0 101.06 1.06l1.19-1.18zM3.22 10a.75.75 0 01.72-.75h1.28a.75.75 0 010 1.5H3.94A.75.75 0 013.22 10zM5.41 14.94a.75.75 0 001.06 1.06l1.19-1.18a.75.75 0 10-1.06-1.06L5.41 14.94zM10 16.78a.75.75 0 01-.75.72h0A.75.75 0 019.5 16.78V15.5a.75.75 0 011.5 0v1.28zM14.59 14.94l1.18 1.18a.75.75 0 101.06-1.06l-1.18-1.18a.75.75 0 10-1.06 1.06zM16.06 10a.75.75 0 01.75-.72h1.28a.75.75 0 010 1.5h-1.28A.75.75 0 0116.06 10zM14.59 5.06a.75.75 0 011.06-1.06l1.18 1.18a.75.75 0 11-1.06 1.06L14.59 5.06z" />
            </svg>
          </span>
        </span>

        {/* Moon icon on right */}
        <span className="absolute right-2 text-xs select-none" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 116.707 2.707a6 6 0 0010.586 10.586z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
