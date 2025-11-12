// src/App.jsx
import React from "react";
import Navbar from "./assets/Navbar";
import Hero from "./assets/Hero";
import About from "./assets/About";
import Projects from "./assets/Projects";
import Contact from "./assets/Contact";
import Footer from "./assets/Footer";

function App() {
  return (
    <div className="bg-black text-white font-mono scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-16">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-16 bg-gray-900">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-16">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
