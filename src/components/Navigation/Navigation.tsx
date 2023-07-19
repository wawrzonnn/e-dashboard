import React from 'react';
import styles from './Navigation.module.scss';
import { Container } from 'components/Container/Container';
import { Link } from 'nerdux-ui-system';
import { NavLink } from 'components/NavLink/NavLink';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

export const Navigation = () => {
   // const userEmail = localStorage.getItem('userEmail');
   const userEmail = useAppSelector((state) => state.user.data?.email);
   const signOut = useSignOut();
   localStorage.removeItem('userEmail');
   const navigate = useNavigate();

   const handleLogout = () => {
      signOut();
      navigate('/');
   };

   return (
      <Container>
         <div className={styles.navigation__wrapper}>
            <div className={styles.navLink__wrapper}>
               <NavLink to={'/dashboard'}>Dashboard</NavLink>
               <NavLink to={'/leads'}>Leads</NavLink>
            </div>
            <div className={styles.login__wrapper}>
               <p>
                  Logged in as: <span>{userEmail ? userEmail : 'unknown'}</span>
                  {/* Logged in as: <span>{userEmail ? userEmail : 'dupa'}</span> */}
               </p>
               <button onClick={handleLogout}>
                  <Link onClick={handleLogout} to={''} target="_self">
                     Log out
                  </Link>
               </button>
            </div>
         </div>
      </Container>
   );
};
