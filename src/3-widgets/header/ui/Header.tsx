import { LogoutIcon, UpdateIcon } from '@assets/icons';

import { useAppDispatch } from '@process/hooks';
import { NavItem } from '@features/navigation/ui';
import { currencyModel } from '@entities/currency';
import { Button } from '@shared/ui';

import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div onClick={() => dispatch(currencyModel.loadRates())}>
        <UpdateIcon className={styles.header__icon} />
        <Button className={styles.header__button}>Update currency rates</Button>
      </div>
      <h1 className={styles.title}>Rates</h1>
      <nav className={styles.header__nav}>
        <NavItem to="/rates" label="Rates" />
        <NavItem to="/convert" label="Convert" />
      </nav>
      <div>
        <LogoutIcon className={styles.header__icon} />
        <Button className={styles.header__button}>Logout</Button>
      </div>
    </header>
  );
};
