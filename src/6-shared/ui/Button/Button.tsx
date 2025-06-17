import type { ButtonHTMLAttributes } from 'react';

import { joinClassNames } from '@shared/lib';

import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const classNames = joinClassNames(className, styles.button, styles[variant], styles[size]);
  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
};
