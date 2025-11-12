import React, { useEffect, useRef } from "react";

// Canvas-based interactive background inspired by benscott.dev
export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: null, y: null, vx: 0, vy: 0, down: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // particles grid
    const area = () => width * height;
    let PARTICLE_COUNT = 80;

    function computeCount() {
      const base = Math.min(140, Math.floor(area() / 9000));
      // reduce on narrow screens for performance
      const narrow = width < 600 ? Math.floor(base * 0.6) : base;
      PARTICLE_COUNT = Math.max(20, narrow);
    }

    const particles = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: 1 + Math.random() * 2,
          pz: (Math.random() - 0.5) * 0.8, // parallax depth
        });
      }
    }

    let lastMove = 0;
    function onMouseMove(e) {
      const now = Date.now();
      if (now - lastMove < 16) return; // ~60fps throttle
      lastMove = now;
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function onTouchMove(e) {
      const now = Date.now();
      if (now - lastMove < 16) return;
      lastMove = now;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches && e.touches[0];
      if (!t) return;
      mouse.current.x = t.clientX - rect.left;
      mouse.current.y = t.clientY - rect.top;
    }

    function onLeave() {
      mouse.current.x = null;
      mouse.current.y = null;
    }

    let lastScroll = window.scrollY || 0;
    function step() {
      ctx.clearRect(0, 0, width, height);

      // subtle gradient background (theme-aware)
      const isDark = document.documentElement.classList.contains("dark");
      const g = ctx.createLinearGradient(0, 0, width, height);
      if (isDark) {
        g.addColorStop(0, "rgba(6,10,20,0.7)");
        g.addColorStop(0.5, "rgba(12,18,34,0.6)");
        g.addColorStop(1, "rgba(6,10,20,0.7)");
      } else {
        g.addColorStop(0, "rgba(245,246,250,0.95)");
        g.addColorStop(0.5, "rgba(235,236,240,0.95)");
        g.addColorStop(1, "rgba(245,246,250,0.95)");
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

  // read time for color cycling
  const t = Date.now();
      // base greys - cycle lightness subtly
      const baseLight = isDark ? 140 : 170; // middle grey tones
      const baseDark = isDark ? 100 : 130;
      const pulse = Math.floor(8 * Math.sin(t / 2000));
      const c1 = Math.max(80, Math.min(220, baseDark + pulse));
      const c2 = Math.max(100, Math.min(240, baseLight - pulse));

      // update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // interaction with mouse
        if (mouse.current.x !== null) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 120;
          if (dist < max) {
            const force = (1 - dist / max) * 0.6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // basic movement and slight damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // draw connections
      ctx.lineWidth = 1;
  // parallax based on scroll
  const scrollY = window.scrollY || 0;
  const scrollDelta = scrollY - lastScroll;
  lastScroll = scrollY;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 140;
          if (dist < max) {
            const alpha = 0.6 * (1 - dist / max);
            // color blend between two greys
            const stroke = `rgba(${c2},${c2},${c2},${alpha * 0.9})`;
            ctx.save();
            ctx.strokeStyle = stroke;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${c2},${c2},${c2},${alpha * 0.8})`;
            ctx.beginPath();
            // parallax offset when drawing lines
            const ax = a.x + (scrollY * 0.02) * a.pz;
            const ay = a.y + (scrollY * 0.02) * a.pz;
            const bx = b.x + (scrollY * 0.02) * b.pz;
            const by = b.y + (scrollY * 0.02) * b.pz;
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // draw particles as subtle dots with glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.save();
        ctx.beginPath();
        const px = p.x + (scrollY * 0.02) * p.pz;
        const py = p.y + (scrollY * 0.02) * p.pz;
        const alpha = 0.9;
        ctx.fillStyle = `rgba(${c1},${c1},${c1},${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${c1},${c1},${c1},0.6)`;
        ctx.arc(px, py, p.r + (p.pz + 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    function start() {
      resize();
      computeCount();
      initParticles();
      step();
    }

    // events
    const ro = new ResizeObserver(() => {
      resize();
      computeCount();
      initParticles();
    });
    ro.observe(canvas);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchend", onLeave);

    start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
