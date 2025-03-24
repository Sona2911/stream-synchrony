
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchVideos } from '@/lib/api';
import { VideoProps } from '@/components/home/VideoCard';
import VideoCard from '@/components/home/VideoCard';
import { Loader2 } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract category from pathname
  const category = location.pathname.substring(1); // Remove the leading '/'
  
  // Get a user-friendly category name
  const getCategoryName = (): string => {
    // Convert kebab-case to title case (e.g., "watch-later" to "Watch Later")
    const parts = category.split('-');
    const titleCaseParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return titleCaseParts.join(' ');
  };

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      
      try {
        const fetchedVideos = await fetchVideos(category);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error(`Failed to fetch ${category} videos:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  }, [category]);

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">{getCategoryName()}</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-youtube-red" />
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No videos found in {getCategoryName()}
          </p>
          {(category === 'history' || category === 'watch-later' || category === 'liked-videos') && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Videos will appear here when you {
                category === 'history' ? 'watch them' 
                : category === 'watch-later' ? 'save them for later' 
                : 'like them'
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
