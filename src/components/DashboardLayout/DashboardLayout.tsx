import React, { PropsWithChildren } from 'react';
import { Container } from 'components/Container/Container';
import BorderLeft from '../../assets/borderLeft.png';
import BorderRight from '../../assets/borderRight.png';
import { Navigation } from 'components/Navigation/Navigation';
import { BorderAside } from 'components/BorderAside/BorderAside';
import styles from './DashboardLayout.module.scss';

export function DashboardLayout({ children }: PropsWithChildren<{}>) {
   return (
      <div className={styles.wrapper}>
         <BorderAside src={BorderLeft} alt="Border Left" />
         <div>
            <Navigation />
            {children}
         </div>
         <BorderAside src={BorderRight} alt="Border Right" />
      </div>
   );
}
