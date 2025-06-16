import { LoadingIcon } from '@assets/icons';

import styles from './Loader.module.css';
export const Loader = () => (
  <div className={styles.loader}>
    <LoadingIcon className={styles.icon} />
    <span>Rates loading...</span>
  </div>
);
