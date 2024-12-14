import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';
import { storage } from '../../utils/storage';

const initialState: AuthState = {
  user: storage.getCurrentUser(),
  isAuthenticated: !!storage.getCurrentUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      storage.setCurrentUser(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      storage.removeCurrentUser();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;