import { ConverterIcon, RatesIcon } from '@assets/icons';

import { NavItem } from '@features/navigation/ui';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.mobileNav}>
        <NavItem to="/rates" icon={<RatesIcon />} label="Rates" />
        <NavItem to="/convert" icon={<ConverterIcon />} label="Convert" />
      </div>
      <div className={styles.desktopInfo}>Rates App, 2025</div>
    </footer>
  );
};
