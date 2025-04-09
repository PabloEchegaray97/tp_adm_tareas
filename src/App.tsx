import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/screens/MainContent/MainContent";
import "./styles/theme.css";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import Navbar from "./components/ui/NavBar/Navbar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark"
    );
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <div className="app-content">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
