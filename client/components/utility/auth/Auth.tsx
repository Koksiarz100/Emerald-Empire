'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  updateUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username') || '');

      const handleStorageChange = () => {
        setUsername(localStorage.getItem('username') || '');
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  const updateUsername = (username: string) => {
    setUsername(username);
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', username);
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};