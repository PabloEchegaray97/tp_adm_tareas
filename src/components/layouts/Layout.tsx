import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar/Sidebar";
import Navbar from "../ui/NavBar/Navbar";

interface LayoutProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <div className="app">
      <Navbar onToggleTheme={onToggleTheme} isDarkMode={isDarkMode} />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
