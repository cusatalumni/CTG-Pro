import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: Pick<User, 'email' | 'password'>) => boolean;
  logout: () => void;
  register: (credentials: Pick<User, 'name' | 'email' | 'password'>) => boolean;
  goPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
  }, []);
  
  const getUsers = (): User[] => {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return [];
    }
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (credentials: Pick<User, 'email' | 'password'>): boolean => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (foundUser) {
      const { password, ...userToSave } = foundUser; // Don't store password in currentUser
      localStorage.setItem('currentUser', JSON.stringify(userToSave));
      setCurrentUser(userToSave);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const register = (credentials: Pick<User, 'name' | 'email' | 'password'>): boolean => {
    const users = getUsers();
    if (users.find(u => u.email === credentials.email)) {
      alert('User with this email already exists.');
      return false;
    }
    const newUser: User = { ...credentials, isPro: false };
    users.push(newUser);
    saveUsers(users);
    
    const { password, ...userToSave } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(userToSave));
    setCurrentUser(userToSave);

    return true;
  };

  const goPro = () => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, isPro: true };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Also update the user in the main users list
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].isPro = true;
        saveUsers(users);
    }
  };
  
  const value = { user: currentUser, login, logout, register, goPro };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};