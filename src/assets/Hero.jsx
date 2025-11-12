import ParticlesBackground from "./ParticlesBackground";
import IntroGreeting from "./IntroGreeting";

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      {/* intro rendered inside hero so it doesn't cover the whole page */}
      <IntroGreeting />
    </div>
  );
}