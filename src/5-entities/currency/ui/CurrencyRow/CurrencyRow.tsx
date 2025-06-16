import { useEffect, useRef, useState } from 'react';
import type Big from 'big.js';

import { joinClassNames } from '@shared/lib';

import styles from './CurrencyRow.module.css';
interface CurrencyRowProps {
  code: string;
  value: Big;
}

export const CurrencyRow = ({ code, value }: CurrencyRowProps) => {
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
  if (!code || !value) return null;
  const rowClassName = joinClassNames(styles.row, highlightRow);

  return (
    <div className={rowClassName}>
      <div className={styles.left}>
        {/* <img src={""} alt={code} className={styles.icon} /> */}
        <span className={styles.code}>{code}</span>
      </div>
      <div className={styles.value}>${value.toString()}</div>
    </div>
  );
};
