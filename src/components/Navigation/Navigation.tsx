import React from 'react';
import styles from './Navigation.module.scss';
import { Container } from 'components/Container/Container';
import { Link, Tabs, Tab, TabContent } from 'nerdux-ui-system';
export const Navigation = () => {
   return (
      <Container>
         <div className={styles.wrapper}>
            <div className={styles.tabs}>
               {/* <Tabs defaultOpenedId='1'>
                  <Tab id={'1'}>1</Tab>
                  <Tab id={'2'}>2</Tab>
            </Tabs> */}
            </div>
            <div className={styles.login}>
               <p>
                  Logged in as: <span>karolina@nerdbord.io</span>
               </p>
               <Link to={''}>Log out</Link>
            </div>
         </div>
      </Container>
   );
};
