
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import VideoPlayer from '@/pages/VideoPlayer';
import SearchResultsPage from '@/pages/SearchResultsPage';
import ExplorePage from '@/pages/ExplorePage';
import ShortsPage from '@/pages/ShortsPage';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import CategoryPage from '@/pages/CategoryPage';
import LikedVideosPage from '@/pages/LikedVideosPage';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import SettingsPage from '@/pages/SettingsPage';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/watch/:videoId" element={<VideoPlayer />} />
              <Route path="/results" element={<SearchResultsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/shorts" element={<ShortsPage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/history" element={<CategoryPage />} />
              <Route path="/liked-videos" element={<LikedVideosPage />} />
              <Route path="/watch-later" element={<CategoryPage />} />
              <Route path="/your-videos" element={<CategoryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
