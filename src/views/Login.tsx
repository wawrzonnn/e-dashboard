import React from 'react';
import { useFormik } from 'formik';
import { Container } from '../components/Container/Container';
import { TextField, Button } from 'nerdux-ui-system';
import { BorderAside } from 'components/BorderAside/BorderAside';
import styles from './Login.module.scss';
import borderLeftImage from '../assets/borderLeft.png';
import welcomeGraphicImage from '../assets/welcomeGraphic.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues {
   email: string;
   password: string;
}

const apiUrl: string = 'https://training.nerdbord.io/api/v1/leads';

export const Login = () => {
   const navigate = useNavigate();

   const formik = useFormik<FormValues>({
      initialValues: {
         email: '',
         password: '',
      },
      validate: (values) => {
         const errors: Partial<FormValues> = {};

         if (!values.email.trim().length) {
            errors.email = 'Email is required';
         } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email.trim())) {
            errors.email = 'Invalid email format';
         }

         return errors;
      },
      onSubmit: async (values) => {
         navigate('/dashboard');
         try {
            console.log('values:', values);
            const response = await axios.post(
               apiUrl,
               {
                  email: values.email,
                  password: values.password,
               },
               {
                  headers: {
                     Authorization: 'secret_token',
                     'Content-Type': 'application/json',
                  },
               },
            );
            console.log('response.status:', response.status);
            console.log('response.statusText:', response.statusText);
            if (response.status >= 200 && response.status < 300) {
               // navigate('/dashboard');
            } else if (response.status >= 400 && response.status < 500) {
               console.log('response.statusText:', response.statusText);
            }
         } catch (error) {
            console.log('error:', error);
         }
      },
   });

   return (
      <div className={styles.wrapper}>
         <aside>
            <BorderAside src={borderLeftImage} alt={'Border left'} />
         </aside>
         <main className={styles.main__wrapper}>
            <header className={styles.header__wrapper}>
               <h1>Welcome back</h1>
               <span>Login to continue.</span>
            </header>
            <form className={styles.form__wrapper} onSubmit={formik.handleSubmit}>
               <TextField
                  placeholder={'Your email'}
                  label={'Email'}
                  name={'email'}
                  id={'email'}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                     formik.touched.email && formik.errors.email ? formik.errors.email : undefined
                  }
               />
               <TextField
                  placeholder={'Your password'}
                  label={'Password'}
                  name={'password'}
                  id={'password'}
                  type={'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
               />

               <div className={styles.submit__button}>
                  <Button type={'submit'} variant={'primary'}>
                     Login
                  </Button>
               </div>
            </form>
         </main>
         <aside>
            <BorderAside src={welcomeGraphicImage} alt={'Welcome graphic'} />
         </aside>
      </div>
   );
};
