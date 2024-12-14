import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`tasks_${user}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = (title: string) => {
    if (!user) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      userId: user,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, title: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      toggleTask, 
      deleteTask, 
      editTask,
      filter,
      setFilter
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};