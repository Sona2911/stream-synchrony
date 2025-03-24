
import React from 'react';
import { fetchVideos } from '@/lib/api';
import { useEffect, useState } from 'react';
import VideoCard, { VideoProps } from '@/components/home/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SubscriptionsPage = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadVideos = async () => {
      if (!isAuthenticated) return;
      
      setIsLoading(true);
      try {
        // For demo purposes, we're just loading regular videos
        // In a real app, this would fetch videos from subscribed channels
        const fetchedVideos = await fetchVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Failed to fetch subscription videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Subscriptions</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to see updates from your favorite YouTube channels</p>
        
        <Link to="/login">
          <Button className="bg-youtube-red hover:bg-youtube-darkred">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Subscriptions</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
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

export default SubscriptionsPage;
