export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
}