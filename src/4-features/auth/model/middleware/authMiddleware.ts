import type { Middleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { logout, setAuthData } from '@entities/user/model';
import { AUTH_DATA } from '@shared/constants';

export const authMiddleware: Middleware = (_) => (next) => (action) => {
  if (setAuthData.match(action)) {
    Cookies.set(AUTH_DATA, action.payload, { expires: 1 });
  }

  if (logout.match(action)) {
    Cookies.remove(AUTH_DATA);
  }

  return next(action);
};
