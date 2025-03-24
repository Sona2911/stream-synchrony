
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVideo, fetchVideos } from '@/lib/api';
import { VideoProps } from '@/components/home/VideoCard';
import VideoCard from '@/components/home/VideoCard';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Bell,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

const VideoPlayer = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<VideoProps | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100000));
  const [dislikeCount, setDislikeCount] = useState(Math.floor(Math.random() * 10000));
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [commentsCount] = useState(Math.floor(Math.random() * 5000));
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadVideo = async () => {
      if (!videoId) return;
      
      setIsLoading(true);
      try {
        const fetchedVideo = await fetchVideo(videoId);
        setVideo(fetchedVideo);
        
        // Fetch related videos
        const fetchedRelatedVideos = await fetchVideos();
        setRelatedVideos(fetchedRelatedVideos.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
    // Reset state when navigating between videos
    setHasLiked(false);
    setHasDisliked(false);
    setIsSubscribed(false);
  }, [videoId]);

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('Please sign in to like videos');
      return;
    }

    if (hasLiked) {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
      
      if (hasDisliked) {
        setDislikeCount(dislikeCount - 1);
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!isAuthenticated) {
      alert('Please sign in to dislike videos');
      return;
    }

    if (hasDisliked) {
      setDislikeCount(dislikeCount - 1);
      setHasDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setHasDisliked(true);
      
      if (hasLiked) {
        setLikeCount(likeCount - 1);
        setHasLiked(false);
      }
    }
  };

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      alert('Please sign in to subscribe');
      return;
    }
    
    setIsSubscribed(!isSubscribed);
  };

  if (isLoading || !video) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4 space-y-4">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="h-8 w-3/4" />
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="lg:w-1/4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-2">
                <Skeleton className="aspect-video w-40 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 pb-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 space-y-4">
          {/* Video Player */}
          <div className="aspect-video bg-black w-full rounded-xl overflow-hidden shadow-lg">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Video Title */}
          <h1 className="text-xl md:text-2xl font-bold dark:text-white mt-2">{video.title}</h1>
          
          {/* Video Info */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/channel/${video.channelName}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={video.channelAvatar} 
                    alt={video.channelName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div>
                <Link to={`/channel/${video.channelName}`} className="font-medium hover:text-youtube-red dark:text-white">
                  {video.channelName}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatViews(Math.floor(Math.random() * 10000000))} subscribers
                </p>
              </div>
              <Button
                variant={isSubscribed ? "outline" : "default"}
                size="sm"
                className={isSubscribed 
                  ? "ml-4 rounded-full border border-gray-300 dark:border-gray-700" 
                  : "ml-4 rounded-full bg-youtube-red hover:bg-youtube-darkred"
                }
                onClick={handleSubscribe}
              >
                {isSubscribed ? (
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Subscribed</span>
                  </div>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-none px-4 gap-2 ${hasLiked ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{formatViews(likeCount)}</span>
                </Button>
                <Separator orientation="vertical" className="h-8 my-auto" />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-none px-4 ${hasDisliked ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown className={`h-4 w-4 ${hasDisliked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" className="rounded-full px-4 gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="rounded-full px-4 gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full px-3">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem>Clip</DropdownMenuItem>
                  <DropdownMenuItem>Add to playlist</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Video Description */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mt-4">
            <div className="flex gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{formatDistanceToNow(video.uploadedAt, { addSuffix: true })}</span>
            </div>
            <p className="text-sm dark:text-gray-200">
              {video.title}. This is an example description for the video. In a real application, this would contain the actual description of the video provided by the content creator.
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquet nisl, nec tincidunt nisl nisl vel nisl.
            </p>
          </div>
          
          {/* Comments Section */}
          <div className="mt-8">
            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="w-full justify-start mb-4 bg-transparent">
                <TabsTrigger value="comments" className="rounded-full data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{formatViews(commentsCount)} Comments</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="mt-0">
                {isAuthenticated ? (
                  <div className="flex gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">JD</span>
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 focus:outline-none focus:border-gray-500 dark:focus:border-gray-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                    <p className="dark:text-gray-300">Please sign in to comment on this video</p>
                  </div>
                )}
                
                {/* Mock Comments */}
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${10 + i}`} 
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm dark:text-white">User Name</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(Date.now() - i * 86400000), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm mt-1 dark:text-gray-200">
                          This is a great video! I really enjoyed watching it. Keep up the good work!
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">{Math.floor(Math.random() * 100)}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Videos */}
        <div className="lg:w-1/4">
          <h3 className="text-lg font-medium mb-3 dark:text-white">Related videos</h3>
          <ScrollArea className="h-[calc(100vh-150px)]">
            <div className="space-y-4 pr-4">
              {relatedVideos.map((relatedVideo) => (
                <div key={relatedVideo.id} className="flex flex-col sm:flex-row lg:flex-col gap-2">
                  <Link to={`/watch/${relatedVideo.id}`} className="sm:w-40 lg:w-full flex-shrink-0">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={relatedVideo.thumbnail} 
                        alt={relatedVideo.title}
                        className="w-full h-full object-cover"
                      />
                      {!relatedVideo.isLive && (
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                          {relatedVideo.duration}
                        </div>
                      )}
                      {relatedVideo.isLive && (
                        <div className="absolute bottom-1 right-1 bg-youtube-red text-white text-xs px-1.5 py-0.5 rounded-sm font-medium">
                          LIVE
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex-1">
                    <Link to={`/watch/${relatedVideo.id}`} className="block">
                      <h4 className="text-sm font-medium line-clamp-2 dark:text-white">
                        {relatedVideo.title}
                      </h4>
                    </Link>
                    <Link to={`/channel/${relatedVideo.channelName}`} className="block">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {relatedVideo.channelName}
                      </p>
                    </Link>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{formatViews(relatedVideo.views)} views</span>
                      <span className="mx-1">•</span>
                      <span>{formatDistanceToNow(relatedVideo.uploadedAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
