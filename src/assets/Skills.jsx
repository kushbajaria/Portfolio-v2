import React, { useRef } from "react";

function SkillCard({ title, children }) {
  const ref = useRef();

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.02)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="bg-slate-800 p-6 rounded-xl shadow-lg transition-transform duration-200"
    >
      <h3 className="text-lg font-medium text-cyan-300 mb-2">{title}</h3>
      <div className="text-sm text-gray-300">{children}</div>
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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {skills.map((s) => (
          <SkillCard key={s.title} title={s.title}>
            {s.desc}
          </SkillCard>
        ))}
      </div>
    </div>
  );
}
