import React, { useRef } from "react";
import { useInView } from "./useInView";

function SkillCard({ title, children, delay = 0 }) {
  const tiltRef = useRef();
  const { ref: viewRef, isInView } = useInView({ threshold: 0.15 });

  function onMove(e) {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.02)`;
  }

  function onLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={viewRef}
      className={`reveal${isInView ? " in-view" : ""} reveal-delay-${delay}`}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl shadow-lg transition-transform duration-200 w-full max-w-xs mx-auto flex flex-col justify-between min-h-[140px] border border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-lg font-medium text-cyan-600 dark:text-cyan-300 mb-2">{title}</h3>
        <div className="text-sm text-slate-600 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}

export default function Skills() {
  const skills = [
    { title: "Frontend", desc: "React, HTML, CSS, Vite, Tailwind, TypeScript" },
    { title: "Backend", desc: "Python, C++, C#, SQL, Java, Node.js" },
    { title: "DevOps", desc: "GitHub Actions, Docker, CI/CD" },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {skills.map((s, i) => (
          <SkillCard key={s.title} title={s.title} delay={i + 1}>
            {s.desc}
          </SkillCard>
        ))}
      </div>
    </div>
  );
}
