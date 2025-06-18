import { configureStore } from '@reduxjs/toolkit';

import { authReducer, saveUserInStorage } from '@features/auth/model';
import { paginationModel, savePaginationInStorage } from '@features/currencyPagination';
import { currencyModel } from '@entities/currency';
import { userReducer } from '@entities/user/model';

export const store = configureStore({
  reducer: {
    currency: currencyModel.currencyReducer,
    pagination: paginationModel.currencyPaginationReducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(savePaginationInStorage, saveUserInStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
