import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchRates } from '@shared/api/rates';

export const loadRates = createAsyncThunk('currency/getRates', async (_, { rejectWithValue }) => {
  try {
    const rates = await fetchRates();
    return { rates, codes: Object.keys(rates) };
  } catch (_) {
    return rejectWithValue('Ошибка при загрузке курсов валют.');
  }
});
