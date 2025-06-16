import { createAsyncThunk } from '@reduxjs/toolkit';

import { mapRates } from '@entities/currency/lib/mapRates';
import { fetchRates } from '@shared/api/rates';

export const loadRates = createAsyncThunk('currency/getRates', async () => {
  const rates = await fetchRates();
  return mapRates(rates);
});
