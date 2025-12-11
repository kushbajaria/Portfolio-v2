import React, { useEffect, useRef } from "react";

// Polished interactive cyberpunk avatar
export default function CyberpunkAvatar({ size = 128, className = "" }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    }

    function onLeave() {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        "--mx": 0,
        "--my": 0,
      }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg" className="block" aria-hidden>
        <defs>
          <linearGradient id="neon1" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="neon2" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff6bcb" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="circleClip">
            <circle cx="100" cy="100" r="86" />
          </clipPath>
        </defs>

        {/* subtle neon backdrop */}
        <rect x="6" y="6" width="188" height="188" rx="28" fill="#030416" />

        {/* inner panel with neon stroke */}
        <g clipPath="url(#circleClip)">
          <rect x="24" y="24" width="152" height="152" rx="20" fill="#071026" stroke="url(#neon1)" strokeWidth="1.6" />

          {/* cyber head (parallax) */}
          <g style={{ transform: 'translate(calc(var(--mx) * 6px), calc(var(--my) * 6px))' }}>
            {/* headphones: neon headband + earcups */}
            <g aria-hidden="true">
              <path
                  d="M40 60 Q100 8 160 60"
                  fill="none"
                  stroke="url(#neon1)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                >
                <animate attributeName="stroke-width" values="3;5;3" dur="3.5s" repeatCount="indefinite" />
              </path>

              {/* left earcup */}
              <g transform="translate(28,86)">
                <rect x="0" y="0" width="28" height="36" rx="8" fill="url(#neon2)" opacity="0.98" />
                <rect x="4" y="6" width="20" height="24" rx="6" fill="#071026" opacity="0.85" />
                <rect x="6" y="10" width="16" height="16" rx="4" fill="url(#neon1)" opacity="0.9" />
              </g>

              {/* right earcup (mirrored) */}
              <g transform="translate(144,86)">
                <rect x="0" y="0" width="28" height="36" rx="8" fill="url(#neon2)" opacity="0.98" />
                <rect x="4" y="6" width="20" height="24" rx="6" fill="#071026" opacity="0.85" />
                <rect x="6" y="10" width="16" height="16" rx="4" fill="url(#neon1)" opacity="0.9" />
              </g>
            </g>
            <ellipse cx="100" cy="94" rx="56" ry="74" fill="#0b1220" />
            <path d="M48 58c10-26 104-26 104 6v12H48z" fill="#0f172a" opacity="0.96" />

            <g stroke="url(#neon2)" strokeWidth="1.4" strokeLinecap="round" opacity="0.95" filter="url(#glow)">
              <path d="M76 76c8-4 24-6 48 0" fill="none" />
              <path d="M100 52v12" />
            </g>

            <ellipse cx="82" cy="92" rx="5.6" ry="4.2" fill="#071026" stroke="#7c3aed" strokeWidth="1.4" filter="url(#glow)" />
            <ellipse cx="118" cy="92" rx="5.6" ry="4.2" fill="#071026" stroke="#ff6bcb" strokeWidth="1.4" filter="url(#glow)" />

            {/* smiling mouth: layered neon curve + soft inner line for depth */}
            <g aria-hidden="true">
              <path
                d="M70 124 Q100 144 130 124"
                fill="none"
                stroke="url(#neon1)"
                strokeWidth="3.8"
                strokeLinecap="round"
                filter="url(#glow)"
                opacity="0.98"
              />
              <path
                d="M78 128 Q100 138 122 128"
                fill="none"
                stroke="rgba(11,18,32,0.6)"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          </g>

          {/* scanline */}
          <rect x="24" y="24" width="152" height="152" fill="url(#neon2)" opacity="0.02">
            <animate attributeName="x" values="24;176" dur="3s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* outer ring */}
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="2" />

      </svg>

      <style>{`
        div[style] { --mx: 0; --my: 0; }
        svg { transition: transform 240ms cubic-bezier(.18,.9,.32,1); transform-origin: 50% 50%; transform: perspective(700px) rotateX(calc(var(--my) * 6deg)) rotateY(calc(var(--mx) * 6deg)); }
      `}</style>
    </div>
  );
}
