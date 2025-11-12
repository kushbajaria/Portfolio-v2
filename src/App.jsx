import Navbar from "./assets/Navbar";
import Hero from "./assets/Hero";
import About from "./assets/About";
import Projects from "./assets/Projects";
import Contact from "./assets/Contact";
import Footer from "./assets/Footer";

function App() {
  return (
    <div className="bg-black text-white font-mono scroll-smooth">
      <Navbar />
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <Hero />
      </section>
      {/* Other sections */}
    </div>
  );
}

export default App;
