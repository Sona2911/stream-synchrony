
// Mock data for the YouTube clone
import { VideoProps } from '@/components/home/VideoCard';

// Mock avatar image URLs
const avatarUrls = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
];

// Mock thumbnail image URLs
const thumbnailUrls = [
  'https://i.picsum.photos/id/1/640/360.jpg',
  'https://i.picsum.photos/id/20/640/360.jpg',
  'https://i.picsum.photos/id/30/640/360.jpg',
  'https://i.picsum.photos/id/40/640/360.jpg',
  'https://i.picsum.photos/id/50/640/360.jpg',
  'https://i.picsum.photos/id/60/640/360.jpg',
  'https://i.picsum.photos/id/70/640/360.jpg',
  'https://i.picsum.photos/id/80/640/360.jpg',
];

// Mock channels
const channels = [
  { name: 'TechGuru', avatar: avatarUrls[0] },
  { name: 'MusicMaster', avatar: avatarUrls[1] },
  { name: 'GamingPro', avatar: avatarUrls[2] },
  { name: 'CookingWithJoy', avatar: avatarUrls[3] },
  { name: 'FitnessFreak', avatar: avatarUrls[4] },
  { name: 'TravelBuddy', avatar: avatarUrls[5] },
  { name: 'ScienceExplorer', avatar: avatarUrls[6] },
  { name: 'ArtisticVision', avatar: avatarUrls[7] },
];

// Mock video titles
const videoTitles = [
  'Ultimate Guide to React Hooks: Everything You Need to Know',
  'Top 10 Travel Destinations You Must Visit in 2023',
  'How to Master the Art of Public Speaking',
  'The Science Behind Effective Workouts',
  'Easy 15-Minute Recipes for Busy Professionals',
  'Understanding Quantum Computing: Simplified',
  'Mastering Digital Photography: Tips and Tricks',
  'How to Build a Successful Online Business from Scratch',
  'The Psychology of Productivity: Work Smarter, Not Harder',
  'A Beginner\'s Guide to Machine Learning',
  'The Evolution of Electric Vehicles: Past, Present, and Future',
  'Mindfulness Meditation: A Path to Inner Peace',
];

// Mock video durations
const videoDurations = [
  '5:45', '10:23', '7:18', '15:32', '8:56', '12:42',
  '6:15', '9:37', '14:08', '11:29', '3:52', '17:15',
];

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random number in range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random date within last 2 years
const getRandomDate = (): Date => {
  const now = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(now.getFullYear() - 2);
  
  return new Date(
    twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime())
  );
};

// Generate mock videos
export const generateMockVideos = (count: number = 24): VideoProps[] => {
  const videos: VideoProps[] = [];
  
  for (let i = 0; i < count; i++) {
    const channel = getRandomItem(channels);
    const isLive = Math.random() > 0.85; // About 15% chance of being live
    
    videos.push({
      id: `video-${i}`,
      title: getRandomItem(videoTitles),
      thumbnail: `https://picsum.photos/seed/${i}/640/360`,
      channelName: channel.name,
      channelAvatar: channel.avatar,
      views: getRandomNumber(100, 10000000),
      uploadedAt: getRandomDate(),
      duration: isLive ? '' : getRandomItem(videoDurations),
      isLive,
    });
  }
  
  return videos;
};

// Mock categories
export const categories = [
  { id: 'all', name: 'All' },
  { id: 'music', name: 'Music' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'news', name: 'News' },
  { id: 'live', name: 'Live' },
  { id: 'coding', name: 'Coding' },
  { id: 'react', name: 'React' },
  { id: 'recently-uploaded', name: 'Recently uploaded' },
  { id: 'watched', name: 'Watched' },
  { id: 'new-to-you', name: 'New to you' },
  { id: 'cars', name: 'Cars' },
  { id: 'stock-market', name: 'Stock market' },
  { id: 'cooking', name: 'Cooking' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'technology', name: 'Technology' },
];

// Simulate fetching videos with delay
export const fetchVideos = async (categoryId: string = 'all'): Promise<VideoProps[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const videos = generateMockVideos();
  
  if (categoryId === 'all') {
    return videos;
  }
  
  // For demo purposes, we're just returning a random subset for different categories
  return videos.slice(0, getRandomNumber(8, 16));
};

// Simulate fetching a specific video
export const fetchVideo = async (videoId: string): Promise<VideoProps> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a specific video (in a real app, this would fetch from API)
  const channel = getRandomItem(channels);
  
  return {
    id: videoId,
    title: getRandomItem(videoTitles),
    thumbnail: `https://picsum.photos/seed/${videoId}/640/360`,
    channelName: channel.name,
    channelAvatar: channel.avatar,
    views: getRandomNumber(100, 10000000),
    uploadedAt: getRandomDate(),
    duration: getRandomItem(videoDurations),
    isLive: Math.random() > 0.9,
  };
};
