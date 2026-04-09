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
        className="group bg-slate-50 dark:bg-slate-800/80 p-7 rounded-2xl shadow-lg transition-all duration-300 w-full max-w-xs mx-auto flex flex-col justify-between min-h-[160px] border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/30 dark:hover:border-cyan-400/20"
      >
        <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-300 mb-3 tracking-tight">{title}</h3>
        <div className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">{children}</div>
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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {skills.map((s, i) => (
          <SkillCard key={s.title} title={s.title} delay={i + 1}>
            {s.desc}
          </SkillCard>
        ))}
      </div>
    </div>
  );
}
