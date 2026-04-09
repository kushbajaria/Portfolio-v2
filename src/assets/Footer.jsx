import React from "react";
import { useInView } from "./useInView";

export default function Footer() {
  const year = new Date().getFullYear();
  const resumeUrl = `${import.meta.env.BASE_URL}Kush-Bajaria-Resume.pdf`;

  const { ref: headRef, isInView: headInView } = useInView({ threshold: 0.2 });
  const { ref: linksRef, isInView: linksInView } = useInView({ threshold: 0.2 });
  const { ref: copyRef, isInView: copyInView } = useInView({ threshold: 0.3 });

  return (
    <footer id="contact" className="mt-8 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div
          ref={headRef}
          className={`text-center md:text-left reveal reveal-delay-1${headInView ? " in-view" : ""}`}
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200">Contact me</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
            Available for freelance or full-time work. Let's build something great.
          </p>
        </div>

        <div
          ref={linksRef}
          className={`flex flex-wrap items-center gap-3 justify-center md:justify-end w-full md:w-auto reveal reveal-delay-2${linksInView ? " in-view" : ""}`}
        >
          <a
            href="mailto:bajariakush@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 shadow-sm hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 transition-all duration-200"
            aria-label="Send email"
          >
            <svg className="text-slate-900 dark:text-white" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 6.5v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ml-1 text-slate-900 dark:text-white text-sm">Email</span>
          </a>

          <a
            href="https://github.com/kushbajaria"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 shadow-sm hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 transition-all duration-200"
            aria-label="GitHub profile"
          >
            <svg className="text-slate-900 dark:text-white" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.9c-3.3.7-4-1.6-4-1.6-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.2 1.4 4 .9.1-.7.5-1.4.9-1.7-2.7-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.8.8 1.2 1.8 1.2 3.1 0 4.6-2.9 5.6-5.7 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.6.8.5A12 12 0 0 0 12 .5z" />
            </svg>
            <span className="ml-1 text-slate-900 dark:text-white text-sm">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/kush-bajaria/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 shadow-sm hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 transition-all duration-200"
            aria-label="LinkedIn profile"
          >
            <svg className="text-slate-900 dark:text-white" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 10.5v6M7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 16.5v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ml-1 text-slate-900 dark:text-white text-sm">LinkedIn</span>
          </a>

          <a
            href={resumeUrl}
            download="Kush-Bajaria-Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200"
            aria-label="Download resume"
          >
            <svg className="text-white" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="ml-1 text-white text-sm">Resume</span>
          </a>
        </div>

        <div
          ref={copyRef}
          className={`text-sm text-slate-400 dark:text-slate-500 reveal-fade reveal-delay-3${copyInView ? " in-view" : ""}`}
        >
          &copy; {year} Kush Bajaria
        </div>
      </div>
    </footer>
  );
}
