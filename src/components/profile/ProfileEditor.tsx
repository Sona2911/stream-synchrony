
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';

type ProfileEditorProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileEditor: React.FC<ProfileEditorProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API
      await updateProfile(username, bio, avatarUrl);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center my-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || undefined} alt={username} />
                <AvatarFallback className="text-2xl bg-youtube-red text-white">
                  {username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={() => setAvatarUrl('')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Label htmlFor="avatar-url">Profile Picture URL</Label>
            <Input
              id="avatar-url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a URL for your profile picture
            </p>
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="mt-1 min-h-24"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-youtube-red hover:bg-youtube-darkred"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditor;
