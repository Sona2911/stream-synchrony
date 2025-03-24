
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  videoId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: { 
        name: 'Jane Smith', 
        avatar: 'https://i.pravatar.cc/150?img=1' 
      },
      text: 'Great video! I learned a lot from this.',
      timestamp: new Date(Date.now() - 86400000 * 3),
      likes: 245,
      isLiked: false
    },
    {
      id: '2',
      user: { 
        name: 'Mike Johnson', 
        avatar: 'https://i.pravatar.cc/150?img=2' 
      },
      text: 'This is exactly what I was looking for. Could you make a follow-up video about this topic?',
      timestamp: new Date(Date.now() - 86400000 * 7),
      likes: 123,
      isLiked: false
    },
    {
      id: '3',
      user: { 
        name: 'Sarah Williams', 
        avatar: 'https://i.pravatar.cc/150?img=3' 
      },
      text: 'I disagree with some points, but overall a good explanation.',
      timestamp: new Date(Date.now() - 86400000 * 14),
      likes: 56,
      isLiked: false
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }
    
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        user: {
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        text: commentText,
        timestamp: new Date(),
        likes: 0,
        isLiked: false
      };
      
      setComments([newComment, ...comments]);
      setCommentText('');
      setIsSubmitting(false);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully"
      });
    }, 500);
  };

  const handleLikeComment = (commentId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like comments",
        variant: "destructive"
      });
      return;
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const isCurrentlyLiked = comment.isLiked;
        return {
          ...comment,
          likes: isCurrentlyLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !isCurrentlyLiked
        };
      }
      return comment;
    }));
  };

  const commentsCount = comments.length;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4 dark:text-white">{commentsCount} Comments</h3>
      
      {isAuthenticated ? (
        <div className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
            <span className="text-white font-medium text-sm">YU</span>
          </div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full min-h-[80px] border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 px-1 focus:outline-none focus:border-gray-500 dark:focus:border-gray-500 dark:text-white"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button 
                variant="ghost" 
                onClick={() => setCommentText('')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddComment}
                disabled={!commentText.trim() || isSubmitting}
                className="bg-youtube-red hover:bg-youtube-darkred disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <p className="dark:text-gray-300">Please sign in to comment on this video</p>
        </div>
      )}
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={comment.user.avatar} 
                alt={`${comment.user.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm dark:text-white">{comment.user.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm mt-1 dark:text-gray-200">
                {comment.text}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 mr-1 ${comment.isLiked ? 'fill-current text-blue-500' : ''}`} />
                  <span className="text-xs">{comment.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  Reply
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 ml-auto">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Block user</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
