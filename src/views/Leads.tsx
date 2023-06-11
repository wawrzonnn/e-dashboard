import React from 'react';
import { Container } from '../components/Container/Container';
import styles from './Leads.module.scss';
import { TextField, Button } from 'nerdux-ui-system';
import { LeadsTable } from 'components/LeadsTable/LeadsTable';

export const Leads = () => {
   return (
      <>
         <div className={styles.leadsHeader__wrapper}>
            <h2>Collected Leads</h2>
            <div className={styles.search__wrapper}>
               <TextField
                  value={''}
                  withIcon
                  placeholder={'Search'}
                  name={''}
                  id={''}
                  onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                     throw new Error('Function not implemented.');
                  }}
               ></TextField>
               <Button
                  onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                     throw new Error('Function not implemented.');
                  }}
                  variant={'primary'}
               >
                  Search
               </Button>
            </div>
         </div>
         <LeadsTable />
      </>
   );
};
