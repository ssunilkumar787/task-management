import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setAuth({ user, isAuthenticated: true });
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username] === password) {
      localStorage.setItem('currentUser', username);
      setAuth({ user: username, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      return false;
    }
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};