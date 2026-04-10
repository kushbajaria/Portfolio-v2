import React from "react";
import { useInView } from "./useInView";

const links = [
  {
    label: "Email",
    href: "mailto:bajariakush@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/kushbajaria",
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.9c-3.3.7-4-1.6-4-1.6-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.2 1.4 4 .9.1-.7.5-1.4.9-1.7-2.7-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.8.8 1.2 1.8 1.2 3.1 0 4.6-2.9 5.6-5.7 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.6.8.5A12 12 0 0 0 12 .5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kush-bajaria/",
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 10.5v6M7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 16.5v-4a2 2 0 0 1 4 0v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const resumeUrl = `${import.meta.env.BASE_URL}Kush-Bajaria-Resume.pdf`;

  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const { ref: linksRef, isInView: linksInView } = useInView({ threshold: 0.15 });

  return (
    <footer id="contact" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div ref={sectionRef} className={`text-center reveal${isInView ? " in-view" : ""}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
            Contact
          </p>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's work together
          </h3>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            I'm always open to new opportunities. Feel free to reach out!
          </p>
        </div>

        {/* Links */}
        <div
          ref={linksRef}
          className={`mt-10 flex flex-wrap items-center justify-center gap-3 reveal reveal-delay-2${linksInView ? " in-view" : ""}`}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium"
            >
              <span className="text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}

          {/* Resume - primary */}
          <a
            href={resumeUrl}
            download="Kush-Bajaria-Resume.pdf"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            &copy; {year} Kush Bajaria.
          </p>
        </div>
      </div>
    </footer>
  );
}
