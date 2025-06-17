import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthData } from '@entities/user/model';
import { authUser } from '@shared/api/auth';

interface LoginParams {
  username: string;
  password: string;
}

export const login = createAsyncThunk<void, LoginParams, { rejectValue: string }>(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const user = await authUser({ username, password });
      thunkAPI.dispatch(setAuthData(user.username));
    } catch (e) {
      return thunkAPI.rejectWithValue(e instanceof Error ? e.message : 'Неизвестная ошибка');
    }
  },
);
