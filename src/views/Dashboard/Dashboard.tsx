import React from 'react';
import styles from './Dashboard.module.scss';
import { LeadsList } from 'components/LeadsList/LeadsList';

export const Dashboard = () => {
   return (
      <div className={styles.wrapper}>
         <h2>Dashboard</h2>
         <LeadsList />
      </div>
   );
};
