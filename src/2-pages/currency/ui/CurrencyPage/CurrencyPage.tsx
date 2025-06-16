import { CurrencyTable } from '@widgets/currency-table';

import styles from './CurrencyPage.module.css';

export const CurrencyPage = () => {
  return (
    <div className={styles.page}>
      <CurrencyTable />
    </div>
  );
};
