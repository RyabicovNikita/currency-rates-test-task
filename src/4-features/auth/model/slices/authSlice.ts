import { createSlice } from '@reduxjs/toolkit';

import { login } from '../thunks/auth';

interface AuthState {
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'authByLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неверные данные';
      });
  },
});

export const authReducer = authSlice.reducer;
