import { useEffect } from 'react';
import Big from 'big.js';

import { useAppDispatch, useAppSelector } from '@process/hooks';
import {
  selectCurrencyRates,
  selectError,
  selectIsLoading,
  selectRatesCodes,
} from '@process/selectors/currencySelectors';
import { currencyModel, CurrencyRow } from '@entities/currency';
import { Loader } from '@shared/ui';

import styles from './CurrencyTable.module.css';

export const CurrencyTable = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(selectCurrencyRates);
  const ratesCodes = useAppSelector(selectRatesCodes);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const data = ratesCodes.map((code) => ({ code, value: Big(rates[code]).round(18) }));

  useEffect(() => {
    dispatch(currencyModel.loadRates());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(currencyModel.loadRates());
    }, 30000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.wrapper}>
      {data.map(({ code, value }) => (
        <CurrencyRow code={code} key={code} value={value} />
      ))}
    </div>
  );
};
