import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { LoginForm } from './components/LoginForm';
import { TaskList } from './components/TaskList';
import { useAppSelector } from './hooks/useStore';

const AuthenticatedApp = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <TaskList /> : <LoginForm />;
};

function App() {
  return (
    <Provider store={store}>
      <AuthenticatedApp />
    </Provider>
  );
}

export default App;