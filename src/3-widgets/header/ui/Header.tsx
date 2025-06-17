import { LogoutIcon, UpdateIcon } from '@assets/icons';

import { useAppDispatch, useAppSelector } from '@process/hooks';
import { NavItem } from '@features/navigation/ui';
import { currencyModel } from '@entities/currency';
import { logout } from '@entities/user/model';
import { Button } from '@shared/ui';
import { AuthRequired } from '@shared/ui/AuthRequired';

import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <header className={styles.header}>
      <AuthRequired isAuth={isUserAuth}>
        <div onClick={() => dispatch(currencyModel.loadRates())}>
          <UpdateIcon className={styles.header__icon} />
          <Button className={styles.header__button}>Update currency rates</Button>
        </div>
      </AuthRequired>

      <h1 className={styles.title}>Rates</h1>
      <AuthRequired isAuth={isUserAuth}>
        <nav className={styles.header__nav}>
          <NavItem to="/rates" label="Rates" />
          <NavItem to="/convert" label="Convert" />
        </nav>
        <div onClick={() => dispatch(logout())}>
          <LogoutIcon className={styles.header__icon} />
          <Button className={styles.header__button}>Logout</Button>
        </div>
      </AuthRequired>
    </header>
  );
};
