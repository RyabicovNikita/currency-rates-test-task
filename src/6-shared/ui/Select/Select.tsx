import styles from './Select.module.css';

type Option = {
  value: string | number;
  label: string;
};

interface SelectProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
}

export const Select = ({ label, value, onChange, options }: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={value}
          id={label}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className={styles.arrow} />
      </div>
    </div>
  );
};
