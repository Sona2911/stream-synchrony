
import React, { useState, useEffect } from 'react';
import { getLikedVideos } from '@/lib/api';
import { VideoProps } from '@/components/home/VideoCard';
import VideoCard from '@/components/home/VideoCard';
import { Loader2, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LikedVideosPage: React.FC = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      
      try {
        const fetchedVideos = getLikedVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Failed to fetch liked videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      loadVideos();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2 dark:text-white flex items-center gap-2">
        <Heart className="h-6 w-6 text-youtube-red" />
        Liked Videos
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Videos you've liked will appear here</p>
      
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
          <Heart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No liked videos yet
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Videos you like will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedVideosPage;
