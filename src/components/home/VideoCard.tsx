
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MoreVertical } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface VideoProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  uploadedAt: Date;
  duration: string;
  isLive?: boolean;
  className?: string;
}

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

const VideoCard: React.FC<VideoProps> = ({
  id,
  title,
  thumbnail,
  channelName,
  channelAvatar,
  views,
  uploadedAt,
  duration,
  isLive = false,
  className,
}) => {
  return (
    <div className={cn('video-card-hover animate-fade-in', className)}>
      <Link to={`/watch/${id}`} className="block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            loading="lazy"
          />
          {!isLive && (
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              {duration}
            </div>
          )}
          {isLive && (
            <div className="absolute bottom-1 right-1 bg-youtube-red text-white text-xs px-1.5 py-0.5 rounded-sm font-medium">
              LIVE
            </div>
          )}
        </div>
      </Link>
      <div className="flex mt-3 gap-3">
        <Link to={`/channel/${channelName}`} className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              src={channelAvatar}
              alt={channelName}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            <Link to={`/watch/${id}`} className="block group">
              <h3 className="font-medium text-sm sm:text-base line-clamp-2 group-hover:text-youtube-red dark:text-white">
                {title}
              </h3>
            </Link>
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                    <MoreVertical className="h-4 w-4 text-gray-700 dark:text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Add to queue</DropdownMenuItem>
                  <DropdownMenuItem>Save to playlist</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Not interested</DropdownMenuItem>
                  <DropdownMenuItem>Don't recommend channel</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Link to={`/channel/${channelName}`} className="block">
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hover:text-gray-700 dark:hover:text-gray-300">
              {channelName}
            </p>
          </Link>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{formatViews(views)} views</span>
            <span className="mx-1">•</span>
            <span>{formatDistanceToNow(uploadedAt, { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
