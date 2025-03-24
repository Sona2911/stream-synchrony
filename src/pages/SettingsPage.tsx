
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User, Lock, Bell, Shield, LogOut } from 'lucide-react';
import ProfileEditor from '@/components/profile/ProfileEditor';

const SettingsPage: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  
  // Redirect to home if not logged in
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Settings</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">You need to be signed in to access settings.</p>
        <Button 
          onClick={() => navigate('/login')}
          className="bg-youtube-red hover:bg-youtube-darkred"
        >
          Sign In
        </Button>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
      
      <Tabs defaultValue="account" className="w-full md:max-w-4xl mx-auto">
        <TabsList className="w-full justify-start mb-8 overflow-x-auto pb-px">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" />
            <span>Privacy</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="space-y-1">
                    <p className="font-medium dark:text-white">{user?.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <Button 
                    onClick={() => setIsProfileEditorOpen(true)}
                    variant="outline"
                    className="ml-auto"
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Videos</CardTitle>
                <CardDescription>Manage your uploaded videos</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate('/your-videos')}
                  variant="outline"
                >
                  View Your Videos
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sign Out</CardTitle>
                <CardDescription>Sign out from your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleLogout}
                  variant="destructive"
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Security settings are coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Notification settings are coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Privacy settings are coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {isProfileEditorOpen && (
        <ProfileEditor 
          isOpen={isProfileEditorOpen} 
          onClose={() => setIsProfileEditorOpen(false)} 
        />
      )}
    </div>
  );
};

export default SettingsPage;
