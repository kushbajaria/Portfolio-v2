import React from "react";
import { useInView } from "./useInView";

export default function Footer() {
  const year = new Date().getFullYear();
  const resumeUrl = `${import.meta.env.BASE_URL}Kush-Bajaria-Resume.pdf`;

  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });
  const { ref: linksRef, isInView: linksInView } = useInView({ threshold: 0.2 });

  return (
    <footer id="contact" className="border-t border-slate-100 dark:border-slate-800/60">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <div ref={sectionRef} className={`reveal${isInView ? " in-view" : ""}`}>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's work together
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Available for freelance or full-time opportunities.
          </p>
        </div>

        <div
          ref={linksRef}
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 reveal reveal-delay-2${linksInView ? " in-view" : ""}`}
        >
          <a
            href="mailto:bajariakush@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-80 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 6.5v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11" />
              <path d="M21 6.5l-9 6-9-6" />
            </svg>
            Email
          </a>

          <a
            href="https://github.com/kushbajaria"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.9c-3.3.7-4-1.6-4-1.6-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.2 1.4 4 .9.1-.7.5-1.4.9-1.7-2.7-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.8.8 1.2 1.8 1.2 3.1 0 4.6-2.9 5.6-5.7 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.6.8.5A12 12 0 0 0 12 .5z" />
            </svg>
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/kush-bajaria/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M7 10.5v6M7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 16.5v-4a2 2 0 0 1 4 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            LinkedIn
          </a>

          <a
            href={resumeUrl}
            download="Kush-Bajaria-Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3v12" />
              <path d="M8 11l4 4 4-4" />
              <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="1.2" />
            </svg>
            Resume
          </a>
        </div>

        <p className="mt-12 text-xs text-slate-400 dark:text-slate-600">
          &copy; {year} Kush Bajaria
        </p>
      </div>
    </footer>
  );
}
