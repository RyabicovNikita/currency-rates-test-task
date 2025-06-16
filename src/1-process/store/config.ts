import { configureStore } from '@reduxjs/toolkit';

import { currencyModel } from '@entities/currency';

export const store = configureStore({
  reducer: {
    currency: currencyModel.currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
