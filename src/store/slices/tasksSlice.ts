import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';
import { storage } from '../../utils/storage';
import { logout } from './authSlice';

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
      storage.saveTasks(action.payload.userId, state.items);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        storage.saveTasks(task.userId, state.items);
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const task = state.items.find(t => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        storage.saveTasks(task.userId, state.items);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskIndex = state.items.findIndex(t => t.id === action.payload);
      if (taskIndex !== -1) {
        const userId = state.items[taskIndex].userId;
        state.items.splice(taskIndex, 1);
        storage.saveTasks(userId, state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.items = [];
    });
  },
});

export const { setTasks, addTask, toggleTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;