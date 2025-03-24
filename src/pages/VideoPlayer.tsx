
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  MessageSquare,
  Copy,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Mail,
  UserCircle,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import CommentSection from '@/components/video/CommentSection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
  const [hasSaved, setHasSaved] = useState(false);
  const [subscriberCount] = useState(Math.floor(Math.random() * 10000000));
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      if (!videoId) return;
      
      setIsLoading(true);
      try {
        const fetchedVideo = await fetchVideo(videoId);
        setVideo(fetchedVideo);
        document.title = `${fetchedVideo.title} - YouTube Clone`;
        
        const fetchedRelatedVideos = await fetchVideos();
        setRelatedVideos(fetchedRelatedVideos.slice(0, 10).filter(v => v.id !== videoId));
      } catch (error) {
        console.error('Failed to fetch video:', error);
        navigate('/not-found');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
    setHasLiked(false);
    setHasDisliked(false);
    setIsSubscribed(false);
    setHasSaved(false);
    setLikeCount(Math.floor(Math.random() * 100000));
    setDislikeCount(Math.floor(Math.random() * 10000));
  }, [videoId, navigate]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Video play error:", error);
          toast({
            title: "Video Error",
            description: "There was an error playing this video.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleVideoEvents = () => {
      const video = videoRef.current;
      if (!video) return;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    };

    const cleanup = handleVideoEvents();
    return cleanup;
  }, [videoRef]);

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like videos",
        variant: "destructive"
      });
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
      
      toast({
        title: "Liked",
        description: "Video has been added to your liked videos"
      });
    }
  };

  const handleDislike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to dislike videos",
        variant: "destructive"
      });
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
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubscribed(!isSubscribed);
    
    toast({
      title: isSubscribed ? "Unsubscribed" : "Subscribed",
      description: isSubscribed 
        ? `Unsubscribed from ${video?.channelName}` 
        : `Subscribed to ${video?.channelName}`
    });
  };

  const handleSaveVideo = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save videos",
        variant: "destructive"
      });
      return;
    }
    
    setHasSaved(!hasSaved);
    
    toast({
      title: hasSaved ? "Removed from saved videos" : "Added to saved videos",
      description: hasSaved 
        ? "Video has been removed from your saved videos" 
        : "Video has been saved for later viewing"
    });
  };

  const handleShare = (platform?: string) => {
    const videoUrl = window.location.href;
    
    if (platform) {
      let shareUrl = '';
      
      switch (platform) {
        case 'copy':
          navigator.clipboard.writeText(videoUrl);
          toast({
            title: "Link copied",
            description: "Video URL has been copied to clipboard"
          });
          return;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(video?.title || 'Check out this video')}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(video?.title || 'Check out this video')}&body=${encodeURIComponent(`I thought you might like this video: ${videoUrl}`)}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank');
      }
    } else {
      if (navigator.share) {
        navigator.share({
          title: video?.title,
          url: videoUrl
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(videoUrl);
        toast({
          title: "Link copied",
          description: "Video URL has been copied to clipboard"
        });
      }
    }
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

  // Generate a video URL based on the video ID to simulate playback
  const videoUrl = `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 pb-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 space-y-4">
          <div className="aspect-video bg-black w-full rounded-xl overflow-hidden shadow-lg relative">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={video.thumbnail}
              className="w-full h-full object-contain"
              controls
              onClick={handlePlayPause}
            />
          </div>
          
          <h1 className="text-xl md:text-2xl font-bold dark:text-white mt-2">{video.title}</h1>
          
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
                  {formatViews(subscriberCount)} subscribers
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
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full px-4 gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium mb-2">Share via</h4>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => handleShare('copy')}>
                      <Copy className="h-4 w-4" />
                      <span>Copy link</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => handleShare('facebook')}>
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => handleShare('twitter')}>
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => handleShare('email')}>
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-full px-4 gap-2 ${hasSaved ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                onClick={handleSaveVideo}
              >
                <Bookmark className={`h-4 w-4 ${hasSaved ? 'fill-current' : ''}`} />
                <span>{hasSaved ? 'Saved' : 'Save'}</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full px-3">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem>Add to playlist</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Don't recommend channel</DropdownMenuItem>
                  <DropdownMenuItem>Not interested</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
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
          
          <CommentSection videoId={videoId} />
        </div>
        
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
