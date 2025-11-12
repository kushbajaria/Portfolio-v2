import Landing from "./assets/Landing";
import ThemeToggle from "./assets/ThemeToggle";

function App() {
  return (
    <div className="absolute top-4 right-4"><ThemeToggle />
      <ThemeToggle />
    </div>,
    <div className="font-mono scroll-smooth">
      <Landing />
    </div>
  );
}

export default App;
