
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut, Settings, Moon, Sun } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ProfileEditor from '../profile/ProfileEditor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

type NavbarProps = {
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isLoggedIn,
  onLogin,
  onLogout,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const openProfileEditor = () => {
    setIsProfileEditorOpen(true);
  };

  const closeProfileEditor = () => {
    setIsProfileEditorOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const getUserInitials = () => {
    if (!user || !user.username) return 'U';
    return user.username.slice(0, 2).toUpperCase();
  };

  const handleNotificationsClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to view notifications",
        variant: "default"
      });
      return;
    }
    
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
      variant: "default"
    });
  };

  return (
    <header className="w-full bg-white dark:bg-youtube-black border-b border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          <Link to="/" className="flex items-center gap-1">
            <div className="relative w-8 h-8 rounded-full bg-youtube-red flex items-center justify-center">
              <span className="absolute inset-0 bg-white w-3 h-3 m-auto rounded-sm" />
            </div>
            <span className="font-bold text-lg hidden sm:block dark:text-white">YouTube</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="w-full max-w-2xl mx-4">
          <SearchBar />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Notifications"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full overflow-hidden"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                    <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.username}</span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={openProfileEditor} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={onLogin}
              className="bg-youtube-red hover:bg-youtube-darkred text-white"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
      
      {isProfileEditorOpen && (
        <ProfileEditor isOpen={isProfileEditorOpen} onClose={closeProfileEditor} />
      )}
    </header>
  );
};

export default Navbar;
