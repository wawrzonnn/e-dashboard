import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button } from 'nerdux-ui-system';
import { BorderAside } from '../../components/BorderAside/BorderAside';
import styles from './Login.module.scss';
import borderLeftImage from '../../assets/borderLeft.png';
import welcomeGraphicImage from '../../assets/welcomeGraphic.png';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../thunks/userThunk';

interface FormValues {
   email: string;
   password: string;
}

export const Login = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const signIn = useSignIn();

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
         try {
            const user = await dispatch(loginUser(values));
            if (user.payload) {
               const userPayload = user.payload as { token: string; email: string };
               signIn({
                  token: userPayload.token,
                  expiresIn: 3600,
                  tokenType: 'Bearer',
               });
               navigate('/dashboard');
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
                  <Button type={'submit'} variant={'primary'} onClick={() => console.log('error')}>
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
