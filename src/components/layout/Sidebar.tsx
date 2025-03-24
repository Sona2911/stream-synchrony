import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  History, 
  UserRound, 
  Film, 
  Flame, 
  Music2, 
  Gamepad2, 
  Newspaper, 
  Trophy, 
  Shirt 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type SidebarProps = {
  isExpanded: boolean;
  isLoggedIn: boolean;
};

const navItems = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Explore', icon: Compass, path: '/explore' },
  { name: 'Shorts', icon: PlaySquare, path: '/shorts' },
  { name: 'Subscriptions', icon: UserRound, path: '/subscriptions' },
];

const libraryItems = [
  { name: 'History', icon: History, path: '/history' },
  { name: 'Your Videos', icon: Film, path: '/your-videos' },
  { name: 'Watch Later', icon: Clock, path: '/watch-later' },
  { name: 'Liked Videos', icon: ThumbsUp, path: '/liked-videos' },
];

const exploreItems = [
  { name: 'Trending', icon: Flame, path: '/trending' },
  { name: 'Music', icon: Music2, path: '/music' },
  { name: 'Gaming', icon: Gamepad2, path: '/gaming' },
  { name: 'News', icon: Newspaper, path: '/news' },
  { name: 'Sports', icon: Trophy, path: '/sports' },
  { name: 'Fashion', icon: Shirt, path: '/fashion' },
];

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, isLoggedIn }) => {
  const renderNavItem = (item: { name: string; icon: any; path: string }) => {
    const Icon = item.icon;
    
    return (
      <NavLink
        key={item.name}
        to={item.path}
        className={({ isActive }) =>
          cn(
            'sidebar-item group',
            isActive && 'active',
            !isExpanded && 'justify-center'
          )
        }
      >
        <Icon className={cn('h-5 w-5', !isExpanded && 'h-6 w-6')} />
        {isExpanded && <span className="text-sm">{item.name}</span>}
        {!isExpanded && (
          <div className="absolute left-full ml-2 rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {item.name}
          </div>
        )}
      </NavLink>
    );
  };

  const renderSection = (
    title: string,
    items: { name: string; icon: any; path: string }[],
    requiresAuth: boolean = false
  ) => {
    if (requiresAuth && !isLoggedIn) return null;
    
    return (
      <div className="mb-4">
        {isExpanded && (
          <h3 className="px-3 mb-1 text-xs font-semibold text-gray-500 uppercase">
            {title}
          </h3>
        )}
        <div className="space-y-1">{items.map(renderNavItem)}</div>
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-14 h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out z-40 bg-white dark:bg-youtube-black border-r border-gray-200 dark:border-gray-800',
        isExpanded ? 'w-56' : 'w-16'
      )}
    >
      <ScrollArea className="h-full py-2">
        <div className={cn('px-2', isExpanded ? 'w-56' : 'w-16')}>
          {renderSection('', navItems)}
          {renderSection('Library', libraryItems, true)}
          {renderSection('Explore', exploreItems)}
          
          {!isLoggedIn && isExpanded && (
            <div className="px-4 py-4 mt-2 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm mb-3">
                Sign in to like videos, comment, and subscribe.
              </p>
              <NavLink
                to="/login"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-youtube-red hover:bg-youtube-darkred text-white rounded-full transition-colors text-sm"
              >
                <UserRound className="h-4 w-4" />
                <span>Sign in</span>
              </NavLink>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
