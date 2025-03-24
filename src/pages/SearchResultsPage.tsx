
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '@/lib/api';
import { VideoProps } from '@/components/home/VideoCard';
import VideoCard from '@/components/home/VideoCard';
import { Loader2 } from 'lucide-react';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const results = await searchVideos(query);
        setVideos(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setVideos([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Search results for: <span className="text-youtube-red">{query}</span>
      </h1>

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
            No videos found matching "{query}"
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Try different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
