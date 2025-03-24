
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  email: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (username: string, bio?: string, avatarUrl?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Simulate checking for existing session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check for an existing token and fetch user data
        const storedUser = localStorage.getItem('youtube_clone_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to your backend
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, we're creating a mock user
      const mockUser = {
        id: '123456',
        email,
        username: email.split('@')[0],
      };
      
      setUser(mockUser);
      localStorage.setItem('youtube_clone_user', JSON.stringify(mockUser));
      
      toast({
        title: 'Success',
        description: 'You have been logged in',
        variant: 'default',
      });
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to your backend
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, we're creating a mock user
      const mockUser = {
        id: '123456',
        email,
        username,
      };
      
      setUser(mockUser);
      localStorage.setItem('youtube_clone_user', JSON.stringify(mockUser));
      
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (username: string, bio?: string, avatarUrl?: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = {
          ...user,
          username,
          bio,
          avatarUrl
        };
        
        setUser(updatedUser);
        localStorage.setItem('youtube_clone_user', JSON.stringify(updatedUser));
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully',
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('youtube_clone_user');
    
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
      variant: 'default',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
