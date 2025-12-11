import React from "react";
import CyberpunkAvatar from "./CyberpunkAvatar";

export default function AboutFull() {
  const skills = [
    { id: "py", label: "Python" },
    { id: "cpp", label: "C++" },
    { id: "html", label: "HTML" },
    { id: "java", label: "Java" },
    { id: "sql", label: "SQL" },
    { id: "react", label: "React" },
  ];

  return (
    <section id="about" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-b from-white/3 to-white/2 dark:from-slate-900/40 dark:to-slate-900/30 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: circular gradient avatar (inline SVG fallback) */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex-shrink-0 shadow-lg ring-1 ring-white/6 overflow-hidden mx-auto md:mx-0" style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)" }}>
              <CyberpunkAvatar />
            </div>

            {/* Right: headline + paragraph + CTA + badges */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">
                About Me
              </h2>

              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-4">
                Aspiring Software Engineer studying at California State University, Fullerton, with a strong drive to build scalable,
                user-focused applications. I've developed projects ranging from AI-powered health and legal assistants to multiplayer games
                and shift management platforms, blending creativity with technical precision. Passionate about learning, I constantly explore new tools,
                languages, and frameworks to push the boundaries of what I can build. I'm excited by the intersection of AI, design, and full-stack development,
                and I aim to deliver solutions that make a real difference. Let's connect on GitHub or LinkedIn!
              </p>

              <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center">
                <a
                  href="#projects"
                  className="inline-block px-4 py-2 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-500 transition"
                >
                  View selected projects
                </a>
                <a
                  href="#contact"
                  className="inline-block px-4 py-2 border border-slate-300 text-slate-800 dark:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Contact me
                </a>
              </div>

              <div className="mt-4 w-full flex flex-wrap gap-2 justify-center">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/6 dark:bg-white/5 text-slate-800 dark:text-white"
                    title={s.label}
                  >
                    {s.id === "react" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
                        <g stroke="#61DAFB" strokeWidth="1" fill="none">
                          <ellipse cx="12" cy="12" rx="6.5" ry="2.6" transform="rotate(0 12 12)" />
                          <ellipse cx="12" cy="12" rx="6.5" ry="2.6" transform="rotate(60 12 12)" />
                          <ellipse cx="12" cy="12" rx="6.5" ry="2.6" transform="rotate(120 12 12)" />
                        </g>
                      </svg>
                    )}

                    {s.id === "html" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1" y="1" width="22" height="22" rx="3" fill="#E34F26" />
                        <text x="12" y="16" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">HTML</text>
                      </svg>
                    )}

                    {s.id === "java" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1" y="1" width="22" height="22" rx="3" fill="#007396" />
                        <text x="12" y="16" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#fff">Java</text>
                      </svg>
                    )}

                    {s.id === "sql" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <ellipse cx="12" cy="6" rx="7" ry="3" fill="#2563EB" />
                        <rect x="5" y="6" width="14" height="10" fill="#2563EB" opacity="0.95" />
                        <ellipse cx="12" cy="16" rx="7" ry="3" fill="#1E40AF" />
                      </svg>
                    )}

                    {s.id === "py" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1" y="1" width="22" height="22" rx="4" fill="#3776AB" />
                        <text x="12" y="16" fontSize="9" fontWeight="700" textAnchor="middle" fill="#FFE873">Py</text>
                      </svg>
                    )}

                    {s.id === "cpp" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1" y="1" width="22" height="22" rx="4" fill="#00599C" />
                        <text x="12" y="16" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">C++</text>
                      </svg>
                    )}

                    <span className="sr-only">{s.label}</span>
                    <span className="hidden sm:inline-block text-xs text-slate-800 dark:text-white">{s.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
