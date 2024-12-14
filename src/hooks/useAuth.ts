import { useCallback } from 'react';
import { useAppDispatch } from './useStore';
import { loginSuccess, logout } from '../store/slices/authSlice';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const login = useCallback((username: string, password: string): boolean => {
    const users = storage.getUsers();
    if (users[username] && users[username] === password) {
      dispatch(loginSuccess(username));
      return true;
    }
    return false;
  }, [dispatch]);

  const register = useCallback((username: string, password: string): boolean => {
    const users = storage.getUsers();
    if (users[username]) {
      return false;
    }
    storage.saveUser(username, password);
    return true;
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return { login, register, logout: handleLogout };
};