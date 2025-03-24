
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, User, LogOut, Upload, Settings, Moon, Sun } from 'lucide-react';
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-youtube-black border-b border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
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
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">JD</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Video</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
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
    </header>
  );
};

export default Navbar;
