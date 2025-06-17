import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

export const InputField = ({ label, id, ...rest }: Props) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.input} {...rest} />
    </div>
  );
};
