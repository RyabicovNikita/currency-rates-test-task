import type { StringRecord } from '@shared/api/types';

export interface CurrencyRatesBundle {
  rates: StringRecord;
  codes: string[];
}

export interface CurrencyState extends CurrencyRatesBundle {
  isLoading: boolean;
  error: string | null;
}
