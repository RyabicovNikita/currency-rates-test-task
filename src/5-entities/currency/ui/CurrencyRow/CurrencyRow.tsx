import { useEffect, useRef, useState } from 'react';
import type Big from 'big.js';

import { joinClassNames } from '@shared/lib';

import styles from './CurrencyRow.module.scss';
interface CurrencyRowProps {
  name: string;
  value: Big;
}

export const CurrencyRow = ({ name, value }: CurrencyRowProps) => {
  const prevValueRef = useRef<Big | null>(null);
  const [highlightRow, setHighlightRow] = useState<string>('');
  useEffect(() => {
    const prevValue = prevValueRef.current;
    if (prevValue && !value.eq(prevValue)) {
      setHighlightRow(value.gt(prevValue) ? styles.up : styles.down);
      const timeout = setTimeout(() => setHighlightRow(''), 1500);
      return () => clearTimeout(timeout);
    }
    prevValueRef.current = value;
  }, [value]);
  if (!name || !value) return null;
  const rowClassName = joinClassNames(styles.row, highlightRow);

  return (
    <tr className={rowClassName}>
      <td className={styles.row__rate}>{name}</td>
      <td className={styles.row__value}>${value.toString()}</td>
    </tr>
  );
};
