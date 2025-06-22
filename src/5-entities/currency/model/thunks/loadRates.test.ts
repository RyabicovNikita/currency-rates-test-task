import { expect, test, vi } from 'vitest';

import * as api from '@shared/api/rates';

import { loadRates } from './loadRates';

test('Загрузка курсов валют', async () => {
  const mockData = { USD: '1.0', EUR: '0.8677' };
  vi.spyOn(api, 'fetchRates').mockResolvedValueOnce(mockData);
  const result = await loadRates()(vi.fn(), vi.fn(), undefined);
  expect(result.type).toBe('currency/getRates/fulfilled');
  expect(result.payload).toEqual({
    rates: mockData,
    codes: ['USD', 'EUR'],
  });
});
