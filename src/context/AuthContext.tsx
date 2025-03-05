
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'admin' | 'faculty' | 'student') => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating auth check. This would use Supabase auth in a real implementation
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - would use Supabase auth in real implementation
    setIsLoading(true);
    
    // Mock authentication for demo purposes
    setTimeout(() => {
      setUser({
        id: '123',
        email,
        role: 'student'
      });
      setIsLoading(false);
    }, 1000);
  };

  const register = async (email: string, password: string, role: 'admin' | 'faculty' | 'student') => {
    // Simulate registration - would use Supabase auth in real implementation
    setIsLoading(true);
    
    // Mock registration for demo purposes
    setTimeout(() => {
      setUser({
        id: '123',
        email,
        role
      });
      setIsLoading(false);
    }, 1000);
  };

  const logout = async () => {
    // Simulate logout - would use Supabase auth in real implementation
    setIsLoading(true);
    
    // Mock logout for demo purposes
    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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
