
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AuthModal from "./components/auth/AuthModal";

// Pages
import Index from "./pages/Index";
import VideoPlayer from "./pages/VideoPlayer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";

const queryClient = new QueryClient();

const AppLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, login, register, logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const toggleAuthModalMode = () => {
    setAuthModalMode(authModalMode === 'login' ? 'register' : 'login');
  };

  // Hide sidebar on video player page
  const isVideoPlayerPage = location.pathname.startsWith('/watch/');
  const shouldShowSidebar = !isVideoPlayerPage;

  return (
    <div className="min-h-screen bg-white dark:bg-youtube-black">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isLoggedIn={isAuthenticated} 
        onLogin={openLoginModal}
        onLogout={logout}
      />
      
      <div className="flex">
        {shouldShowSidebar && (
          <Sidebar isExpanded={isSidebarExpanded} isLoggedIn={isAuthenticated} />
        )}
        
        <main 
          className={`flex-1 transition-all duration-300 ${
            shouldShowSidebar 
              ? (isSidebarExpanded ? 'ml-56' : 'ml-16') 
              : 'ml-0'
          }`}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watch/:videoId" element={<VideoPlayer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Simplified Routes */}
            <Route path="/history" element={<CategoryPage />} />
            <Route path="/your-videos" element={<CategoryPage />} />
            <Route path="/watch-later" element={<CategoryPage />} />
            <Route path="/liked-videos" element={<CategoryPage />} />
            <Route path="/trending" element={<CategoryPage />} />
            <Route path="/music" element={<CategoryPage />} />
            <Route path="/gaming" element={<CategoryPage />} />
            <Route path="/news" element={<CategoryPage />} />
            <Route path="/sports" element={<CategoryPage />} />
            <Route path="/fashion" element={<CategoryPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        mode={authModalMode}
        onToggleMode={toggleAuthModalMode}
        onLogin={login}
        onRegister={register}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
