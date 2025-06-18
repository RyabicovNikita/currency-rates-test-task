import type { ButtonHTMLAttributes } from 'react';

import { joinClassNames } from '@shared/lib';

import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'default';
};

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  const classNames = joinClassNames(className, styles.button, styles[variant]);
  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
};
