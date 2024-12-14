import { Task } from '../types';

export const storage = {
  getCurrentUser: () => localStorage.getItem('currentUser'),
  setCurrentUser: (user: string) => localStorage.setItem('currentUser', user),
  removeCurrentUser: () => localStorage.removeItem('currentUser'),
  
  getUsers: () => JSON.parse(localStorage.getItem('users') || '{}'),
  saveUser: (username: string, password: string) => {
    const users = storage.getUsers();
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  getTasks: (userId: string): Task[] => {
    const tasks = localStorage.getItem(`tasks_${userId}`);
    return tasks ? JSON.parse(tasks) : [];
  },
  saveTasks: (userId: string, tasks: Task[]) => {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
  },
};