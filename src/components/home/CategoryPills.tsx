
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = {
  id: string;
  name: string;
};

type CategoryPillsProps = {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
};

const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategoryId,
  onSelect,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target;
      if (!container) return;
      
      updateArrows();
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const updateArrows = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const { clientWidth } = containerRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
    
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    updateArrows();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg">
        <button
          onClick={() => scroll('left')}
          className={cn(
            'h-8 w-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-opacity',
            showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      
      <div
        ref={containerRef}
        className="flex items-center gap-3 overflow-x-auto pb-2 pt-2 scrollbar-none"
        onScroll={handleScroll}
      >
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors animate-fade-in',
              selectedCategoryId === category.id
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-lg">
        <button
          onClick={() => scroll('right')}
          className={cn(
            'h-8 w-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-opacity',
            showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CategoryPills;
