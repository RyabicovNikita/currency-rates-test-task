import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@process/hooks';
import { selectCurrencyRates, selectRatesCodes } from '@process/selectors/currencySelectors';
import { FIAT_CURRENCIES } from '@features/constants';
import { Converter } from '@features/converter/ui/Converter';
import { currencyModel } from '@entities/currency';

export const ConverterPage = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(selectCurrencyRates);
  const ratesCodes = useAppSelector(selectRatesCodes);
  useEffect(() => {
    if (ratesCodes.length === 0) dispatch(currencyModel.loadRates());
  }, [ratesCodes, dispatch]);
  const currencies = ratesCodes.map((code) => ({
    code,
    label: code,
    isFiat: FIAT_CURRENCIES.includes(code),
  }));
  return currencies.length > 0 && <Converter rates={rates} currencies={currencies} />;
};
