
import React from 'react';
import { useEffect, useState } from 'react';
import { fetchVideos } from '@/lib/api';
import { VideoProps } from '@/components/home/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Share2, MoreVertical } from 'lucide-react';

const ShortsPage = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadShorts = async () => {
      setIsLoading(true);
      try {
        // Fetch videos and filter to a smaller set for shorts
        const allVideos = await fetchVideos();
        // Take a random subset for shorts (they're typically shorter videos)
        const shortsVideos = allVideos
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
          
        setVideos(shortsVideos);
      } catch (error) {
        console.error('Failed to fetch shorts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShorts();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Shorts</h1>
      
      {isLoading ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[70vh] w-full rounded-xl max-w-md mx-auto" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {videos.map((video) => (
            <div key={video.id} className="max-w-md mx-auto">
              <div className="rounded-xl overflow-hidden bg-black relative aspect-[9/16] shadow-lg">
                <Link to={`/watch/${video.id}`}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-medium line-clamp-2">{video.title}</h3>
                  <Link to={`/channel/${video.channelName}`} className="text-white/80 text-sm">
                    {video.channelName}
                  </Link>
                </div>
                
                <div className="absolute right-3 bottom-20 flex flex-col gap-6 items-center">
                  <button className="text-white flex flex-col items-center gap-1">
                    <div className="bg-black/50 p-2 rounded-full">
                      <ThumbsUp className="h-6 w-6" />
                    </div>
                    <span className="text-xs">{Math.floor(Math.random() * 100)}K</span>
                  </button>
                  
                  <button className="text-white flex flex-col items-center gap-1">
                    <div className="bg-black/50 p-2 rounded-full">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <span className="text-xs">{Math.floor(Math.random() * 10)}K</span>
                  </button>
                  
                  <button className="text-white flex flex-col items-center gap-1">
                    <div className="bg-black/50 p-2 rounded-full">
                      <Share2 className="h-6 w-6" />
                    </div>
                    <span className="text-xs">Share</span>
                  </button>
                  
                  <button className="text-white">
                    <div className="bg-black/50 p-2 rounded-full">
                      <MoreVertical className="h-6 w-6" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortsPage;
