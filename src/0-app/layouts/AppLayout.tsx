import type { ReactNode } from 'react';

import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';
import { MgContainer } from '@shared/ui';

import styles from './AppLayout.module.css';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <MgContainer>{children}</MgContainer>
      </main>
      <Footer />
    </>
  );
};
