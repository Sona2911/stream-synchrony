
import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
      <form 
        onSubmit={handleSearch} 
        className={`relative flex-1 flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-youtube-red/50' : ''
        }`}
      >
        <div className="relative w-full flex">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none focus:ring-0 focus:border-gray-400 dark:focus:border-gray-600 bg-white dark:bg-gray-800 pr-10"
          />
          <Button 
            type="submit" 
            className="rounded-l-none rounded-r-full px-5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-700"
          >
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      </form>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Search with voice"
      >
        <Mic className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </Button>
    </div>
  );
};

export default SearchBar;
