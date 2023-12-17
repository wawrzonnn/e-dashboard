import React from 'react';
import { BorderAside } from '../../components/BorderAside/BorderAside';
import styles from './Login.module.scss';
import borderLeftImage from '../../assets/borderLeft.png';
import welcomeGraphicImage from '../../assets/welcomeGraphic.png';
import { LoginForm } from './LoginForm';

export const Login = () => {
   return (
      <div className={styles.wrapper}>
         <aside>
            <BorderAside src={borderLeftImage} alt={'Border left'} />
         </aside>
         <main className={styles.main__wrapper}>
            <div className={styles.dev__info_wrapper}>
               <span>login: dev@nerdbord.io</span>
               <span>password: catsanddogs</span>
            </div>
            <header className={styles.header__wrapper}>
               <h1>Welcome back</h1>
               <span>Login to continue.</span>
               <div className={styles.mobile__message}>
                  Note: This app is designed for desktop use only.
               </div>
            </header>
            <LoginForm />
         </main>
         <aside>
            <BorderAside src={welcomeGraphicImage} alt={'Welcome graphic'} />
         </aside>
      </div>
   );
};
