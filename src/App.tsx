import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import MainContent from './components/MainContent';
import Navbar from './layouts/Navbar';
import './styles/theme.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
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
