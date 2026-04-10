import React from "react";
import { useInView } from "./useInView";

const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Python", color: "#3776AB" },
  { name: "C++", color: "#00599C" },
  { name: "C#", color: "#239120" },
  { name: "Java", color: "#ED8B00" },
  { name: "SQL", color: "#4479A1" },
  { name: "Node.js", color: "#339933" },
  { name: "Vite", color: "#646CFF" },
  { name: "Docker", color: "#2496ED" },
  { name: "GitHub Actions", color: "#2088FF" },
  { name: "Git", color: "#F05032" },
];

function SkillChip({ name, color, delay }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay}${isInView ? " in-view" : ""}`}
    >
      <div className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-800"
          style={{ backgroundColor: color, ringColor: color + "40" }}
        />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: headingRef, isInView: headingInView } = useInView({ threshold: 0.3 });

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className={`mb-14 text-center reveal${headingInView ? " in-view" : ""}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
            What I work with
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tech Stack
          </h2>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((s, i) => (
            <SkillChip
              key={s.name}
              name={s.name}
              color={s.color}
              delay={Math.min((i % 6) + 1, 6)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
