import type { RootState } from '@process/store';

export const selectUserAuth = (state: RootState) => state.user.isAuth;
export const selectUserName = (state: RootState) => state.user.username;
