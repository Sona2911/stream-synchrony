
import React, { useState, useEffect } from 'react';
import VideoCard from '@/components/home/VideoCard';
import CategoryPills from '@/components/home/CategoryPills';
import { fetchVideos, categories } from '@/lib/api';
import { VideoProps } from '@/components/home/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="pb-6 animate-fade-in">
      <div className="sticky top-14 z-10 bg-white dark:bg-youtube-black pt-3 pb-2 px-4 md:px-6 mb-4">
        <CategoryPills
          categories={categories}
          selectedCategoryId={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </div>

      <div className="px-4 md:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <div className="flex gap-3">
                  <Skeleton className="rounded-full h-10 w-10" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
