import { ConverterIcon, RatesIcon } from '@assets/icons';

import { useAppSelector } from '@process/hooks';
import { NavItem } from '@features/navigation/ui';
import { AuthRequired, MgContainer } from '@shared/ui';

import styles from './Footer.module.scss';

export const Footer = () => {
  const isUserAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <AuthRequired isAuth={isUserAuth}>
      <footer className={styles.footer}>
        <MgContainer className={styles.footer__container}>
          <div className={styles.mobileNav}>
            <NavItem to="/rates" icon={<RatesIcon />} label="Rates" />
            <NavItem to="/convert" icon={<ConverterIcon />} label="Convert" />
          </div>
          <div className={styles.desktopInfo}>Rates App, 2025</div>
        </MgContainer>
      </footer>
    </AuthRequired>
  );
};
