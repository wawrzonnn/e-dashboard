import React from 'react';
import styles from './Navigation.module.scss';
import { Container } from 'components/Container/Container';
import { Link } from 'nerdux-ui-system';
import { NavLink } from 'components/NavLink/NavLink';

export const Navigation = () => {
   return (
      <Container>
         <div className={styles.navigation__wrapper}>
            <div className={styles.navLink__wrapper}>
               <NavLink to={'/dashboard'}>Dashboard</NavLink>
               <NavLink to={'/leads'}>Leads</NavLink>
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
