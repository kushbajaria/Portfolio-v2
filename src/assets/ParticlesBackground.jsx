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

    // performance-sensitive particle count calculation
    const area = () => width * height;
    let PARTICLE_COUNT = 60;

    function computeCount() {
      const areaBase = Math.floor(area() / 10000);
      const deviceMemory = navigator.deviceMemory || 4;
      const hw = navigator.hardwareConcurrency || 4;
      const reducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // base scales with area, clamped
      let base = Math.min(120, Math.max(20, areaBase));
      // reduce aggressively on low memory or reduced motion
      if (deviceMemory <= 2 || hw <= 2 || reducedMotion) base = Math.floor(base * 0.45);
      // reduce on narrow screens
      if (width < 600) base = Math.floor(base * 0.6);

      PARTICLE_COUNT = Math.max(12, base);
    }

    const particles = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 0.8 + Math.random() * 1.6,
          pz: (Math.random() - 0.5) * 0.6, // parallax depth
        });
      }
    }

    let lastMove = 0;
    function onMouseMove(e) {
      const now = Date.now();
      if (now - lastMove < 32) return; // throttle pointer updates to ~30fps
      lastMove = now;
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function onTouchMove(e) {
      const now = Date.now();
      if (now - lastMove < 32) return;
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
    let paused = false;
    function onVisibility() {
      paused = document.hidden;
      if (!paused) {
        // restart animation loop
        rafRef.current = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(rafRef.current);
      }
    }

    function step() {
      if (document.hidden) return;
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
          const dist2 = dx * dx + dy * dy;
          const max = 120;
          const max2 = max * max;
          if (dist2 < max2 && dist2 > 0.0001) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / max) * 0.5;
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

      // draw connections (limited per-particle to reduce O(n^2) cost)
      ctx.lineWidth = 1;
      const scrollY = window.scrollY || 0;
      lastScroll = scrollY;
      const maxLink = 100;
      const maxLink2 = maxLink * maxLink;
      const maxPerParticle = 3;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        let links = 0;
        for (let j = i + 1; j < particles.length && links < maxPerParticle; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < maxLink2) {
            links++;
            const alpha = 0.45 * (1 - dist2 / maxLink2);
            ctx.strokeStyle = `rgba(${c2},${c2},${c2},${alpha})`;
            // parallax offset when drawing lines (small)
            const ax = a.x + (scrollY * 0.01) * a.pz;
            const ay = a.y + (scrollY * 0.01) * a.pz;
            const bx = b.x + (scrollY * 0.01) * b.pz;
            const by = b.y + (scrollY * 0.01) * b.pz;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // draw particles as subtle dots (no heavy shadow)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const px = p.x + (scrollY * 0.01) * p.pz;
        const py = p.y + (scrollY * 0.01) * p.pz;
        const alpha = 0.9;
        ctx.fillStyle = `rgba(${c1},${c1},${c1},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r + (p.pz + 0.4), 0, Math.PI * 2);
        ctx.fill();
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
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
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
