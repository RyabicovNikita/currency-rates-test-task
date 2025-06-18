import { CurrencyTable } from '@widgets/currency-table';
import { Pagination } from '@features/currencyPagination';

import styles from './CurrencyPage.module.css';

export const CurrencyPage = () => {
  return (
    <div className={styles.page}>
      <Pagination />
      <CurrencyTable />
    </div>
  );
};
