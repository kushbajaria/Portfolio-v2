import React from "react";
import { useInView } from "./useInView";

export default function AboutFull() {
  const imageUrl = `${import.meta.env.BASE_URL}about-pic.png`;

  const { ref: imgRef, isInView: imgInView } = useInView({ threshold: 0.2 });
  const { ref: headingRef, isInView: headingInView } = useInView({ threshold: 0.3 });
  const { ref: paraRef, isInView: paraInView } = useInView({ threshold: 0.2 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.3 });

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Profile picture */}
        <div
          ref={imgRef}
          className={`reveal-scale${imgInView ? " in-view" : ""}`}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full shadow-2xl ring-1 ring-slate-200/20 dark:ring-white/10 overflow-hidden">
            <img src={imageUrl} alt="Profile picture" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Heading */}
        <div ref={headingRef} className={`mt-8 reveal reveal-delay-1${headingInView ? " in-view" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        {/* Bio */}
        <div ref={paraRef} className={`mt-5 reveal reveal-delay-2${paraInView ? " in-view" : ""}`}>
          <p className="text-base md:text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            Software Engineer studying at California State University, Fullerton.
            I build scalable, user&#8209;focused applications — from AI&#8209;powered
            assistants to multiplayer games and shift&#8209;management platforms.
            Passionate about the intersection of AI, design, and full&#8209;stack
            development.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className={`mt-8 flex items-center gap-4 reveal reveal-delay-3${ctaInView ? " in-view" : ""}`}>
          <a
            href="#projects"
            className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-full hover:opacity-80 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
