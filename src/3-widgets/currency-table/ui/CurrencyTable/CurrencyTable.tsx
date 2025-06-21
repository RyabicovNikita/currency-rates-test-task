import { useEffect, useMemo, useState } from 'react';
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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const visibleData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return ratesCodes
      .slice(start, end)
      .sort((a, b) => {
        const rateA = Big(rates[a]);
        const rateB = Big(rates[b]);
        return sortDirection === 'asc' ? rateA.cmp(rateB) : rateB.cmp(rateA);
      })
      .map((name) => ({ name, value: Big(rates[name]).round(18) }));
  }, [page, pageSize, sortDirection, ratesCodes, rates]);

  useEffect(() => {
    dispatch(currencyModel.loadRates());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(currencyModel.loadRates());
    }, 30000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleSort = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <table className={styles.curencyTable}>
      <thead className={styles.thead}>
        <tr className={styles.thead__row}>
          <th className={styles.thead__row_name}>Name</th>
          <th className={styles.thead__row_rate} onClick={handleSort}>
            Rate
          </th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {visibleData.map(({ name, value }) => (
          <CurrencyRow name={name} key={name} value={value} />
        ))}
      </tbody>
    </table>
  );
};
