
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isLoggedIn={isAuthenticated} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <div className="flex flex-1 overflow-hidden">
        <div className={`${sidebarExpanded ? 'w-56' : 'w-16'} transition-all duration-300`}>
          <Sidebar isExpanded={sidebarExpanded} isLoggedIn={isAuthenticated} />
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
