import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Big from 'big.js';

import { currencyModel } from '@entities/currency';

import type { CurrencyState } from '../types';

const initialState: CurrencyState = {
  rates: {},
  codes: [],
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    sortRates(state, action: PayloadAction<'asc' | 'desc'>) {
      const order = action.payload;
      state.codes.sort((a, b) => {
        const rateA = Big(state.rates[a]);
        const rateB = Big(state.rates[b]);
        return order === 'asc' ? rateA.cmp(rateB) : rateB.cmp(rateA);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currencyModel.loadRates.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(currencyModel.loadRates.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.codes = action.payload.codes;
        state.isLoading = false;
      })
      .addCase(currencyModel.loadRates.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при загрузке курсов валют';
        state.isLoading = false;
      });
  },
});

export const { sortRates } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
