import Landing from "./assets/Landing";
import ThemeToggle from "./assets/ThemeToggle";

function App() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="font-mono scroll-smooth">
        <Landing />
      </div>
    </>
  );
}

export default App;
