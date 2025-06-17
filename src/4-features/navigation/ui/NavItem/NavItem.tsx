import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';

interface NavItemProps {
  to: string;
  icon?: ReactNode;
  label?: string;
  showLabel?: boolean;
}

export const NavItem = ({ to, icon, label, showLabel = true }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && showLabel && <span className={styles.label}>{label}</span>}
    </NavLink>
  );
};
