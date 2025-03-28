import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  preferences?: {
    dietType?: string;
    allergies?: string[];
    calorieGoal?: number;
  };
  healthMetrics?: {
    weight?: number;
    height?: number;
    bmi?: number;
    age?: number;
    gender?: string;
    activityLevel?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (email.trim() === '' || password.trim() === '') {
        throw new Error('Please enter both email and password');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        preferences: {
          dietType: 'balanced',
          allergies: [],
          calorieGoal: 2000,
        },
        healthMetrics: {
          weight: 70,
          height: 175,
          bmi: 22.9,
          age: 30,
          gender: 'not specified',
          activityLevel: 'moderate',
        },
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success("Login successful");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to login");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        throw new Error('Please fill in all fields');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        preferences: {
          dietType: 'balanced',
          allergies: [],
          calorieGoal: 2000,
        },
        healthMetrics: {},
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success("Registration successful");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to register");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("Logged out successfully");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
    }}>
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
