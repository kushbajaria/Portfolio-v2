import React from "react";
import { useInView, useParallax } from "./useInView";

export default function AboutFull() {
  const imageUrl = `${import.meta.env.BASE_URL}about-pic.png`;
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.08 });
  const parallaxRef = useParallax(0.08);

  /* Individual element reveal hooks for staggered entrance */
  const { ref: imgRef, isInView: imgInView } = useInView({ threshold: 0.2 });
  const { ref: headingRef, isInView: headingInView } = useInView({ threshold: 0.3 });
  const { ref: paraRef, isInView: paraInView } = useInView({ threshold: 0.2 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.3 });
  const { ref: badgesRef, isInView: badgesInView } = useInView({ threshold: 0.3 });

  const skills = [
    { id: "py", label: "Python" },
    { id: "cpp", label: "C++" },
    { id: "html", label: "HTML" },
    { id: "java", label: "Java" },
    { id: "sql", label: "SQL" },
    { id: "react", label: "React" },
  ];

  return (
    <section id="about" className="py-24 md:py-32" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6">
        <div className={`bg-gradient-to-b from-white/5 to-white/[0.02] dark:from-slate-900/40 dark:to-slate-900/20 rounded-3xl p-8 md:p-14 backdrop-blur-sm border border-slate-200/10 dark:border-white/5 reveal-fade${isInView ? " in-view" : ""}`}>
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left: profile picture with scale reveal + parallax */}
            <div
              ref={(el) => {
                imgRef.current = el;
                parallaxRef.current = el;
              }}
              className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full flex-shrink-0 shadow-2xl ring-2 ring-cyan-500/30 overflow-hidden mx-auto md:mx-0 will-change-transform reveal-scale${imgInView ? " in-view" : ""}`}
            >
              <img src={imageUrl} alt="Profile picture" className="w-full h-full object-cover" />
            </div>

            {/* Right: headline + paragraph + CTA + badges */}
            <div className="flex-1 text-center md:text-left space-y-5">
              <div ref={headingRef} className={`reveal reveal-delay-1${headingInView ? " in-view" : ""}`}>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  About Me
                </h2>
              </div>

              <div ref={paraRef} className={`reveal reveal-delay-2${paraInView ? " in-view" : ""}`}>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  Aspiring Software Engineer studying at California State University, Fullerton, with a strong drive to build scalable,
                  user-focused applications. I've developed projects ranging from AI-powered health and legal assistants to multiplayer games
                  and shift management platforms, blending creativity with technical precision. Passionate about learning, I constantly explore new tools,
                  languages, and frameworks to push the boundaries of what I can build. I'm excited by the intersection of AI, design, and full-stack development,
                  and I aim to deliver solutions that make a real difference. Let's connect on GitHub or LinkedIn!
                </p>
              </div>

              <div ref={ctaRef} className={`reveal reveal-delay-3${ctaInView ? " in-view" : ""}`}>
                <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center md:justify-start">
                  <a
                    href="#projects"
                    className="inline-block px-5 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-500 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    View projects
                  </a>
                  <a
                    href="#contact"
                    className="inline-block px-5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    Contact me
                  </a>
                </div>
              </div>

              <div ref={badgesRef} className={`reveal reveal-delay-4${badgesInView ? " in-view" : ""}`}>
                <div className="w-full flex flex-wrap gap-2 justify-center md:justify-start">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/6 dark:bg-white/5 text-slate-800 dark:text-white transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/20 hover:bg-cyan-500/10 cursor-default border border-slate-200/10 dark:border-white/5"
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
      </div>
    </section>
  );
}
