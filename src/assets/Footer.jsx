import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contact me</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Available for freelance or full‑time work. Let's build something great.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:bajariakush@gmail.com"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 dark:bg-white/5 text-slate-800 dark:text-white hover:brightness-105 transition"
            aria-label="Send email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 6.5v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Email</span>
          </a>

          <a
            href="https://github.com/kushbajaria"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 dark:bg-white/5 text-slate-800 dark:text-white hover:brightness-105 transition"
            aria-label="GitHub profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.9c-3.3.7-4-1.6-4-1.6-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.2 1.4 4 .9.1-.7.5-1.4.9-1.7-2.7-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.8.8 1.2 1.8 1.2 3.1 0 4.6-2.9 5.6-5.7 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.6.8.5A12 12 0 0 0 12 .5z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/kush-bajaria/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 dark:bg-white/5 text-slate-800 dark:text-white hover:brightness-105 transition"
            aria-label="LinkedIn profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 10.5v6M7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 16.5v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-500 transition"
            aria-label="Download resume"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="hidden sm:inline">Resume</span>
          </a>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400">© {year} Kush Bajaria</div>
      </div>
    </footer>
  );
}
