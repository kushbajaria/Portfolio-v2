import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
        fullScreen: false,
        background: { color: "#000000" },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" }, // ← interactive hover
            onClick: { enable: true, mode: "push" },  // ← add particles on click
            resize: true,
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.5 } }, 
            push: { quantity: 4 },
          },
        },
        particles: {
          color: { value: "#00ffff" },
          links: { color: "#00ffff", distance: 120, enable: true, opacity: 0.4, width: 1 },
          move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
          number: { value: 70, density: { enable: true, area: 900 } },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
