import React from "react";
import { useInView } from "./useInView";

export default function AboutFull() {
  const imageUrl = `${import.meta.env.BASE_URL}about-pic.png`;

  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.1 });
  const { ref: cardRef, isInView: cardInView } = useInView({ threshold: 0.15 });

  const highlights = [
    { label: "University", value: "Cal State Fullerton" },
    { label: "Focus", value: "Full-Stack & AI" },
    { label: "Status", value: "Open to Work" },
  ];

  return (
    <section id="about" className="py-24 md:py-32" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div className={`mb-14 text-center reveal${sectionInView ? " in-view" : ""}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
            Get to know me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className={`reveal reveal-delay-1${cardInView ? " in-view" : ""}`}
        >
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20">
            <div className="rounded-3xl bg-white dark:bg-slate-900/80 backdrop-blur-sm p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                {/* Profile image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-xl">
                      <img src={imageUrl} alt="Kush Bajaria" className="w-full h-full object-cover" />
                    </div>
                    {/* Status dot */}
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-white dark:border-slate-900" title="Available" />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    I'm a Software Engineer studying at California State University, Fullerton,
                    with a passion for building products that matter. I've shipped projects
                    ranging from <span className="text-slate-900 dark:text-white font-medium">AI-powered assistants</span> to{" "}
                    <span className="text-slate-900 dark:text-white font-medium">multiplayer games</span> and{" "}
                    <span className="text-slate-900 dark:text-white font-medium">shift-management platforms</span>.
                    I love exploring the intersection of AI, design, and full-stack development.
                  </p>

                  {/* Highlight chips */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    {highlights.map((h) => (
                      <div
                        key={h.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      >
                        <span className="text-xs text-slate-500 dark:text-slate-400">{h.label}:</span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{h.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex items-center gap-3 justify-center md:justify-start">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      View Projects
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                    >
                      Contact Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
