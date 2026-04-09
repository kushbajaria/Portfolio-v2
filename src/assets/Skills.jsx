import React from "react";
import { useInView } from "./useInView";

const groups = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "HTML", "CSS", "Tailwind", "Vite"],
  },
  {
    label: "Backend",
    items: ["Python", "C++", "C#", "Java", "SQL", "Node.js"],
  },
  {
    label: "DevOps",
    items: ["Docker", "GitHub Actions", "CI/CD"],
  },
];

function SkillGroup({ label, items, delay }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div ref={ref} className={`reveal reveal-delay-${delay}${isInView ? " in-view" : ""}`}>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 text-sm rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: headingRef, isInView: headingInView } = useInView({ threshold: 0.3 });

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={headingRef} className={`mb-12 text-center reveal${headingInView ? " in-view" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills
          </h2>
        </div>

        <div className="space-y-8">
          {groups.map((g, i) => (
            <SkillGroup key={g.label} label={g.label} items={g.items} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
