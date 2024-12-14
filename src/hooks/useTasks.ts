import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { setTasks, addTask, toggleTask, editTask, deleteTask } from '../store/slices/tasksSlice';
import { storage } from '../utils/storage';
import { Task } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const tasks = useAppSelector(state => state.tasks.items);
  const filter = useAppSelector(state => state.filter.value);

  useEffect(() => {
    if (user) {
      const userTasks = storage.getTasks(user);
      dispatch(setTasks(userTasks));
    }
  }, [user, dispatch]);

  const handleAddTask = useCallback((title: string) => {
    if (!user) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      userId: user,
    };
    dispatch(addTask(newTask));
  }, [dispatch, user]);

  const handleToggleTask = useCallback((id: string) => {
    dispatch(toggleTask(id));
  }, [dispatch]);

  const handleEditTask = useCallback((id: string, title: string) => {
    dispatch(editTask({ id, title }));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: string) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  return {
    tasks,
    filter,
    addTask: handleAddTask,
    toggleTask: handleToggleTask,
    editTask: handleEditTask,
    deleteTask: handleDeleteTask,
  };
};