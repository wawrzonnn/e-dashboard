import React from 'react';
import styles from './Dashboard.module.scss';
import { LeadsList } from 'components/LeadsList/LeadsList';
import { LeadsChart } from 'components/LeadsChart/LeadsChart';

export const Dashboard = () => {
   return (
      <div className={styles.wrapper}>
         <h2>Dashboard</h2>
         <div className={styles.leads__wrapper}>
            <div className={styles.leadslist__wrapper}>
               <LeadsList />
            </div>
            <LeadsChart />
         </div>
      </div>
   );
};
