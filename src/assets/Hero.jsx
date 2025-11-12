import React from "react";
import ParticleEffect from "./ParticleEffect";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-screen px-4">
      {/* Animated background */}
      <ParticleEffect />

      {/* Hero content */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cyan-400 hover:scale-105 transition duration-300">
        Kush Bajaria
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        Software Developer • Innovator • Problem Solver
      </p>

      <div className="flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition duration-300"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition duration-300"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
