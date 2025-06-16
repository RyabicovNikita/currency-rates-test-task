import type { StringRecord } from '@shared/api/types';

import type { CurrencyRatesBundle } from '../model/types';

export const mapRates = (data: StringRecord): CurrencyRatesBundle => {
  const rates: StringRecord = {};
  const codes: string[] = [];
  for (const [currency, rate] of Object.entries(data)) {
    rates[currency] = rate;
    codes.push(currency);
  }
  return { rates, codes };
};
