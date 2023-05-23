import React from 'react';
import styles from './Navigation.module.scss';
import { Container } from 'components/Container/Container';
import { Link, Tabs, Tab } from 'nerdux-ui-system';

export const Navigation = () => {
   return (
      <Container>
         <div className={styles.navigation__wrapper}>
            <div className={styles.navlink__wrapper}>
               <Tabs>
                  <Tab id={'1'}>Dashboard</Tab>
                  <Tab id={'2'}>Leads</Tab>
               </Tabs>
            </div>
            <div className={styles.login__wrapper}>
               <p>
                  Logged in as: <span>karolina@nerdbord.io</span>
               </p>
               <Link to={''}>Log out</Link>
            </div>
         </div>
      </Container>
   );
};
