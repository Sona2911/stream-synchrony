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

// Mock video titles by category
const videoTitlesByCategory = {
  trending: [
    'What Everyone is Watching Right Now: 2023 Trends',
    'The Viral Challenge Everyone Is Doing',
    'Breaking News: Major Scientific Discovery',
    'This Celebrity Interview Is Breaking The Internet',
    'New Technology That Will Change Everything',
  ],
  music: [
    'Top 10 Music Hits of 2023',
    'Live Concert: Symphony Orchestra Performs Classics',
    'Behind The Scenes With Famous Music Producer',
    'How To Play Guitar: Beginner Tutorial',
    'Music Theory Explained Simply',
  ],
  gaming: [
    'Gameplay Walkthrough: Latest RPG Release',
    'Pro Gaming Tips & Tricks',
    'Building The Ultimate Gaming PC',
    'ESports Tournament Highlights',
    'Retro Gaming: Classics Revisited',
  ],
  cooking: [
    'Easy 15-Minute Recipes for Busy Professionals',
    '5 Delicious Pasta Recipes Anyone Can Make',
    'Baking Perfect Bread: Step by Step Guide',
    'Healthy Meal Prep for the Week',
    'Authentic Italian Cooking at Home',
  ],
  news: [
    'Morning News Roundup: What You Need To Know',
    'Breaking Financial News and Market Updates',
    'Technology News: Latest Innovations',
    'Political Analysis: Current Events',
    'Global Issues Explained',
  ],
  sports: [
    'Highlights From Yesterday\'s Big Game',
    'Sports Analysis: Championship Predictions',
    'Training Like a Pro Athlete',
    'Amazing Sports Moments Caught on Camera',
    'Behind The Scenes of Professional Sports',
  ],
  fashion: [
    'Spring Fashion Trends 2023',
    'How To Style: Wardrobe Basics',
    'Sustainable Fashion Brands to Support',
    'Celebrity Style Breakdown',
    'Fashion Week Highlights',
  ],
  general: [
    'Ultimate Guide to React Hooks: Everything You Need to Know',
    'Top 10 Travel Destinations You Must Visit in 2023',
    'How to Master the Art of Public Speaking',
    'The Science Behind Effective Workouts',
    'Understanding Quantum Computing: Simplified',
    'Mastering Digital Photography: Tips and Tricks',
    'How to Build a Successful Online Business from Scratch',
    'The Psychology of Productivity: Work Smarter, Not Harder',
    'A Beginner\'s Guide to Machine Learning',
    'The Evolution of Electric Vehicles: Past, Present, and Future',
    'Mindfulness Meditation: A Path to Inner Peace',
  ],
};

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

// Helper to get titles based on category
const getTitlesForCategory = (category: string): string[] => {
  const categoryTitles = videoTitlesByCategory[category as keyof typeof videoTitlesByCategory];
  return categoryTitles || videoTitlesByCategory.general;
};

// Generate mock videos for a specific category
export const generateMockVideosForCategory = (category: string, count: number = 12): VideoProps[] => {
  const videos: VideoProps[] = [];
  const titles = getTitlesForCategory(category);
  
  for (let i = 0; i < count; i++) {
    const channel = getRandomItem(channels);
    const isLive = Math.random() > 0.85; // About 15% chance of being live
    
    videos.push({
      id: `${category}-${i}`,
      title: getRandomItem(titles),
      thumbnail: `https://picsum.photos/seed/${category}${i}/640/360`,
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

// Generate mock videos
export const generateMockVideos = (count: number = 24): VideoProps[] => {
  const videos: VideoProps[] = [];
  
  for (let i = 0; i < count; i++) {
    const channel = getRandomItem(channels);
    const isLive = Math.random() > 0.85; // About 15% chance of being live
    
    videos.push({
      id: `video-${i}`,
      title: getRandomItem(videoTitlesByCategory.general),
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
  { id: 'cooking', name: 'Cooking' },
  { id: 'watched', name: 'Watched' },
  { id: 'new-to-you', name: 'New to you' },
  { id: 'cars', name: 'Cars' },
  { id: 'stock-market', name: 'Stock market' },
  { id: 'sports', name: 'Sports' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'technology', name: 'Technology' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'trending', name: 'Trending' },
];

// Simulate fetching videos with delay
export const fetchVideos = async (categoryId: string = 'all'): Promise<VideoProps[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Special handling for history and watch later
  if (categoryId === 'history') {
    return getHistoryVideos();
  }
  
  if (categoryId === 'watch-later') {
    return getWatchLaterVideos();
  }
  
  if (categoryId === 'your-videos') {
    return getYourVideos();
  }
  
  if (categoryId === 'liked-videos') {
    return getLikedVideos();
  }
  
  // Check if this is a specific category
  if (categoryId !== 'all' && categoryId !== 'watched' && categoryId !== 'new-to-you') {
    return generateMockVideosForCategory(categoryId, getRandomNumber(8, 16));
  }
  
  // Default: return general videos
  const videos = generateMockVideos();
  
  if (categoryId === 'watched') {
    // For "watched" category, return a subset that looks like watched videos
    return videos.slice(0, 8).map(video => ({
      ...video,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * getRandomNumber(1, 7)) // Within last week
    }));
  }
  
  if (categoryId === 'new-to-you') {
    // For "new to you" category, return videos with very recent dates
    return videos.slice(8, 16).map(video => ({
      ...video,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * getRandomNumber(1, 24)) // Within last 24 hours
    }));
  }
  
  return videos;
};

// Simulate fetching a specific video
export const fetchVideo = async (videoId: string): Promise<VideoProps> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if this video has a category prefix
  const parts = videoId.split('-');
  const possibleCategory = parts[0];
  const isSpecialCategory = categories.some(cat => cat.id === possibleCategory);
  
  let channel = getRandomItem(channels);
  let title = '';
  
  if (isSpecialCategory) {
    const titles = getTitlesForCategory(possibleCategory);
    title = getRandomItem(titles);
  } else {
    title = getRandomItem(videoTitlesByCategory.general);
  }
  
  return {
    id: videoId,
    title: title,
    thumbnail: `https://picsum.photos/seed/${videoId}/640/360`,
    channelName: channel.name,
    channelAvatar: channel.avatar,
    views: getRandomNumber(100, 10000000),
    uploadedAt: getRandomDate(),
    duration: getRandomItem(videoDurations),
    isLive: Math.random() > 0.9,
  };
};

// Store history in localStorage
export const addToHistory = (video: VideoProps): void => {
  const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
  
  // Check if video is already in history
  const existingIndex = history.findIndex((v: VideoProps) => v.id === video.id);
  
  if (existingIndex >= 0) {
    // If it exists, remove it so we can add it to the top
    history.splice(existingIndex, 1);
  }
  
  // Add to the beginning of the array
  history.unshift({
    ...video,
    viewedAt: new Date().toISOString()
  });
  
  // Keep only the last 50 videos to prevent localStorage from getting too large
  const trimmedHistory = history.slice(0, 50);
  
  localStorage.setItem('videoHistory', JSON.stringify(trimmedHistory));
};

// Get history from localStorage
export const getHistoryVideos = (): VideoProps[] => {
  return JSON.parse(localStorage.getItem('videoHistory') || '[]');
};

// Get watch later videos from localStorage
export const getWatchLaterVideos = (): VideoProps[] => {
  return JSON.parse(localStorage.getItem('watchLater') || '[]');
};

// Get user's videos (for demonstration purposes)
export const getYourVideos = (): VideoProps[] => {
  // In a real app, this would fetch from a server
  // For now, we'll return a small set of mock videos
  return generateMockVideos(5).map(video => ({
    ...video,
    id: `your-${video.id}`,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * getRandomNumber(30, 365)) // Within last year
  }));
};

// Get liked videos
export const getLikedVideos = (): VideoProps[] => {
  return JSON.parse(localStorage.getItem('likedVideos') || '[]');
};

// Function to search videos by query
export const searchVideos = async (query: string): Promise<VideoProps[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!query || query.trim() === '') {
    return [];
  }
  
  query = query.toLowerCase();
  
  // Generate a larger pool of videos to search through
  const allVideos = [
    ...generateMockVideosForCategory('cooking', 10),
    ...generateMockVideosForCategory('gaming', 10),
    ...generateMockVideosForCategory('music', 10),
    ...generateMockVideosForCategory('news', 10),
    ...generateMockVideosForCategory('sports', 10),
    ...generateMockVideosForCategory('fashion', 10),
    ...generateMockVideosForCategory('trending', 10),
    ...generateMockVideos(30)
  ];
  
  // Filter videos that match the search query in title or channel name
  return allVideos.filter(
    video => 
      video.title.toLowerCase().includes(query) || 
      video.channelName.toLowerCase().includes(query)
  );
};
