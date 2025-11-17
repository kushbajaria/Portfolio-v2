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
        className={`relative inline-flex items-center h-10 w-20 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg ${
          theme === "dark"
            ? "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border border-slate-600"
            : "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 border border-yellow-300"
        }`}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        {/* Sun icon on left (fades when dark) */}
        <span
          className={`absolute left-2 text-xs select-none pointer-events-none ${
            theme === "dark" ? "opacity-40" : "opacity-100"
          }`}
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" className="fill-current text-yellow-400" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
          </svg>
        </span>

        {/* Knob */}
        <span
          className={`relative inline-block h-8 w-8 rounded-full bg-white shadow transform transition-transform duration-300 z-10 ${
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
            {/* Use same sun graphic as the left track: simple circle with rays for consistency */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" className="fill-current text-yellow-400" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
            </svg>
          </span>
        </span>

        {/* Moon icon on right (fades when light) */}
        <span
          className={`absolute right-2 text-xs select-none pointer-events-none ${
            theme === "dark" ? "opacity-100" : "opacity-40"
          }`}
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
