import type { RootState } from '@process/store';

export const selectIsLoading = (state: RootState) => state.currency.isLoading;
export const selectError = (state: RootState) => state.currency.error;
export const selectRates = (state: RootState) => state.currency.rates;
export const selectCodes = (state: RootState) => state.currency.codes;
export const selectCurrencyRates = (state: RootState) => state.currency.rates;
export const selectRatesCodes = (state: RootState) => state.currency.codes;
