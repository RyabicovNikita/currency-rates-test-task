import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { AUTH_DATA } from '@shared/constants';

interface UserState {
  username: string | null;
  isAuth: boolean;
}

const savedUserName = Cookies.get(AUTH_DATA) || null;

const initialState: UserState = {
  username: savedUserName,
  isAuth: !!savedUserName,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.username = null;
      state.isAuth = false;
    },
  },
});

export const { setAuthData, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
