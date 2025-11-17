import React from "react";

export default function AboutFull() {
  return (
    <section id="about" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-b from-white/3 to-white/2 dark:from-slate-900/40 dark:to-slate-900/30 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: circular gradient avatar (Ben-Scott inspired) */}
            <div className="w-32 h-32 rounded-full flex-shrink-0 shadow-lg ring-1 ring-white/6 overflow-hidden mx-auto md:mx-0"
                 style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)" }}>
              <svg viewBox="0 0 120 120" width="120" height="120" className="block" aria-hidden>
                <g transform="translate(10,8)">
                  <g fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="46" cy="22" r="8" fill="#ffffff" opacity="0.95" />
                    <path d="M36 34c3-2 6-4 10-4s7 2 10 4c0 0 1.5 3 1.5 6v4H34v-4c0-3.2 1.5-6 1.5-6z" fill="#ffffff" opacity="0.9" />
                  </g>
                  <g>
                    <rect x="6" y="46" width="80" height="34" rx="4" fill="#ffffff" opacity="0.92" />
                    <rect x="14" y="54" width="64" height="20" rx="3" fill="#0f172a" opacity="0.06" />
                    <rect x="44" y="82" width="32" height="6" rx="1" fill="#ffffff" opacity="0.9" />
                  </g>
                </g>
              </svg>
            </div>

            {/* Right: headline + paragraph + CTA + badges */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">
                Hey — I’m Kush. I build web products that get used.
              </h2>

              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-4">
                I design and ship full‑stack applications using React, TypeScript, and Node.js. I care about
                performance, accessibility, and developer ergonomics — so teams can move fast without
                sacrificing quality. Recent work includes building scalable front-ends, designing reliable
                APIs, and automating deployments with Docker and AWS. If you want someone who moves
                quickly, writes tests, and mentors others, we should talk.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a href="#projects" className="inline-block px-4 py-2 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-500 transition">
                  View selected projects
                </a>
                <a href="#contact" className="inline-block px-4 py-2 border border-slate-300 text-slate-800 dark:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  Contact me
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "GraphQL",
                  "AWS",
                  "Testing",
                ].map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/6 dark:bg-white/5 text-slate-800 dark:text-white">
                    {s}
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
