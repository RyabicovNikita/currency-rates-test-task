import { useEffect, useMemo } from 'react';
import Big from 'big.js';

import { useAppDispatch, useAppSelector } from '@process/hooks';
import {
  selectCurrencyRates,
  selectError,
  selectIsLoading,
  selectRatesCodes,
} from '@process/selectors/currencySelectors';
import { selectCurrencyPage, selectCurrencyPageSize } from '@process/selectors/paginationSelectors';
import { currencyModel, CurrencyRow } from '@entities/currency';
import { Loader } from '@shared/ui';

import styles from './CurrencyTable.module.css';

export const CurrencyTable = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(selectCurrencyRates);
  const ratesCodes = useAppSelector(selectRatesCodes);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const page = useAppSelector(selectCurrencyPage);
  const pageSize = useAppSelector(selectCurrencyPageSize);

  const visibleData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return ratesCodes
      .slice(start, end)
      .map((code) => ({ code, value: Big(rates[code]).round(18) }));
  }, [page, pageSize, ratesCodes, rates]);

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
      {visibleData.map(({ code, value }) => (
        <CurrencyRow code={code} key={code} value={value} />
      ))}
    </div>
  );
};
