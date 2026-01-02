import React, { useEffect, useRef } from "react";

// Interactive avatar that highlights coding skills
export default function CyberpunkAvatar({ size = "100%", className = "" }) {
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
      <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="block" aria-hidden>
        <defs>
          <linearGradient id="neonBlue" x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="neonPink" x1="0" x2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="neonGold" x1="0" x2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="bg" cx="0.5" cy="0.45" r="0.7">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        <rect x="8" y="8" width="184" height="184" rx="28" fill="url(#bg)" stroke="rgba(255,255,255,0.05)" />

        {/* orbiting ring */}
        <g stroke="url(#neonBlue)" strokeWidth="1.6" opacity="0.7">
          <circle cx="100" cy="100" r="84" fill="none" />
          <path d="M28 104c18-6 40-9 72-9s54 3 72 9" fill="none" strokeLinecap="round" />
        </g>

        {/* parallax coding cluster */}
        <g style={{ transform: 'translate(calc(var(--mx) * 6px), calc(var(--my) * 6px))' }}>
          {/* glowing chips */}
          <g opacity="0.8">
            <rect x="38" y="54" width="34" height="18" rx="5" fill="rgba(34,211,238,0.12)" stroke="url(#neonBlue)" strokeWidth="1.4" filter="url(#glow)" />
            <rect x="130" y="52" width="32" height="16" rx="5" fill="rgba(244,114,182,0.12)" stroke="url(#neonPink)" strokeWidth="1.4" filter="url(#glow)" />
            <rect x="46" y="130" width="30" height="14" rx="4" fill="rgba(251,191,36,0.12)" stroke="url(#neonGold)" strokeWidth="1.2" filter="url(#glow)" />
          </g>

          {/* main terminal */}
          <g>
            <rect x="46" y="68" width="108" height="70" rx="12" fill="#0b1220" stroke="url(#neonBlue)" strokeWidth="1.6" />
            <rect x="46" y="68" width="108" height="18" rx="12" fill="rgba(255,255,255,0.04)" />
            <circle cx="60" cy="77" r="3" fill="#ef4444" />
            <circle cx="68" cy="77" r="3" fill="#fbbf24" />
            <circle cx="76" cy="77" r="3" fill="#22c55e" />

            {/* code lines */}
            <g strokeLinecap="round" strokeWidth="2">
              <line x1="60" y1="94" x2="120" y2="94" stroke="url(#neonBlue)" />
              <line x1="60" y1="104" x2="136" y2="104" stroke="url(#neonPink)" />
              <line x1="60" y1="114" x2="114" y2="114" stroke="#38bdf8" />
              <line x1="60" y1="124" x2="132" y2="124" stroke="#a855f7" />
            </g>
          </g>

          {/* laptop silhouette */}
          <g opacity="0.9">
            <rect x="70" y="118" width="60" height="8" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.08)" />
            <rect x="60" y="126" width="80" height="14" rx="6" fill="#0a101d" stroke="url(#neonBlue)" strokeWidth="1.2" />
            <rect x="76" y="132" width="48" height="4" rx="2" fill="#1f2937" />
          </g>

          {/* floating symbols */}
          <g fontFamily="'SF Mono', 'JetBrains Mono', monospace" fontSize="12" fontWeight="700" fill="#e2e8f0" opacity="0.85" filter="url(#glow)">
            <text x="34" y="110" fill="#22d3ee">{`{}`}</text>
            <text x="150" y="120" fill="#f472b6">{`</>`}</text>
            <text x="112" y="64" fill="#fbbf24">AI</text>
          </g>

          {/* signal arcs */}
          <g stroke="url(#neonPink)" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" filter="url(#glow)">
            <path d="M94 58 Q100 50 106 58" fill="none" />
            <path d="M90 54 Q100 42 110 54" fill="none" opacity="0.7" />
          </g>
        </g>

        {/* subtle grid */}
        <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.6">
          <path d="M100 14v172" />
          <path d="M14 100h172" />
          <path d="M42 32v136" />
          <path d="M158 32v136" />
        </g>

        {/* outer glow ring */}
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(124,58,237,0.16)" strokeWidth="2" />
      </svg>

      <style>{`
        div[style] { --mx: 0; --my: 0; }
        svg { transition: transform 240ms cubic-bezier(.18,.9,.32,1); transform-origin: 50% 50%; transform: perspective(700px) rotateX(calc(var(--my) * 6deg)) rotateY(calc(var(--mx) * 6deg)); }
      `}</style>
    </div>
  );
}
