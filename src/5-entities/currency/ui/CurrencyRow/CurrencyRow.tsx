import { joinClassNames } from '@shared/lib';
import type { CurrencyRateProps } from '@shared/types';

import styles from './CurrencyRow.module.scss';
interface CurrencyRowProps extends CurrencyRateProps {
  highlightClassName: string;
}

export const CurrencyRow = ({ name, value, highlightClassName }: CurrencyRowProps) => {
  if (!name || !value) return null;
  const rowClassName = joinClassNames(
    styles.row,
    highlightClassName ? styles[highlightClassName] : '',
  );

  return (
    <tr className={rowClassName}>
      <td className={styles.row__rate}>{name}</td>
      <td className={styles.row__value}>$ {value.toString()}</td>
    </tr>
  );
};
