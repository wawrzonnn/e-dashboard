import React from 'react';
import { Container } from '../components/Container/Container';
import { TextField, Button } from 'nerdux-ui-system';
import { BorderAside } from 'components/BorderAside';
import styles from './Login.module.scss';
import borderLeftImage from '../assets/borderLeft.png';
import welcomeGraphicImage from '../assets/welcomeGraphic.png';

export const Login = () => {
   return (
      <Container>
         <aside>
            <BorderAside src={borderLeftImage} alt={'Border left'} />
         </aside>
         <main className={styles.main__wrapper}>
            <header className={styles.header__wrapper}>
               <h1>Welcome back</h1>
               <span>Login to continue.</span>
            </header>
            <form className={styles.form__wrapper}>
               <TextField
                  placeholder={'Your email'}
                  label={'Email'}
                  value={''}
                  name={'email'}
                  id={''}
                  onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                     throw new Error('Function not implemented.');
                  }}
               />
               <TextField
                  placeholder={'Your password'}
                  label={'Password'}
                  value={''}
                  name={'password'}
                  id={''}
                  onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                     throw new Error('Function not implemented.');
                  }}
               />
               <div className={styles.submit__button}>
                  <Button
                     onClick={function (
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                     ): void {
                        throw new Error('Function not implemented.');
                     }}
                     variant={'primary'}
                     type={'submit'}
                  >
                     Login
                  </Button>
               </div>
            </form>
         </main>
         <aside>
            <BorderAside src={welcomeGraphicImage} alt={'Welcome graphic'} />
         </aside>
      </Container>
   );
};
