import type { ReactNode } from 'react';

import styles from './MgContainer.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const MgContainer = ({ children, className }: ContainerProps) => {
  return <div className={`${styles.mgContainer} ${className ?? ''}`}>{children}</div>;
};
