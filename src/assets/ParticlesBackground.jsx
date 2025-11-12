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
      PARTICLE_COUNT = Math.max(30, base);
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
        });
      }
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function onLeave() {
      mouse.current.x = null;
      mouse.current.y = null;
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // subtle radial gradient background
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "rgba(2,6,23,0.7)");
      g.addColorStop(0.5, "rgba(8,16,40,0.6)");
      g.addColorStop(1, "rgba(2,6,23,0.7)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

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
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw particles as subtle dots with glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = "rgba(34,211,238,0.9)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseleave", onLeave);

    start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseleave", onLeave);
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
