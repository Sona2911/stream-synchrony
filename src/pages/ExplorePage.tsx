
import React from 'react';
import { fetchVideos } from '@/lib/api';
import { useEffect, useState } from 'react';
import VideoCard, { VideoProps } from '@/components/home/VideoCard';
import CategoryPills from '@/components/home/CategoryPills';
import { categories } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const ExplorePage = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        const fetchedVideos = await fetchVideos(selectedCategory);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Explore</h1>
      
      <div className="mb-6">
        <CategoryPills
          categories={categories}
          selectedCategoryId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-36 w-full rounded-xl" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
