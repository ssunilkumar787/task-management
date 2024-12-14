import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { useAuth } from '../hooks/useAuth';
import { setFilter } from '../store/slices/filterSlice';
import { Check, Trash2, Edit2, LogOut, Plus } from 'lucide-react';

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { tasks, filter, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const { logout } = useAuth();
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingText(title);
  };

  const handleEditSubmit = (id: string) => {
    if (editingText.trim()) {
      editTask(id, editingText.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto pt-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user}</span>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Task
              </button>
            </div>
          </form>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => dispatch(setFilter('all'))}
              className={`px-3 py-1 rounded-md ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => dispatch(setFilter('active'))}
              className={`px-3 py-1 rounded-md ${
                filter === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => dispatch(setFilter('completed'))}
              className={`px-3 py-1 rounded-md ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed
            </button>
          </div>

          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  } flex items-center justify-center`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleEditSubmit(task.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(task.id)}
                    className="flex-1 rounded-md border-gray-300"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-1 ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                )}

                <button
                  onClick={() => handleEdit(task.id, task.title)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};