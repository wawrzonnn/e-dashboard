import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button } from 'nerdux-ui-system';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../thunks/userThunk';
import styles from './Login.module.scss';

interface FormValues {
   email: string;
   password: string;
}

export const LoginForm = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const signIn = useSignIn();

   const [isLoading, setIsLoading] = useState(false);
   const [loginError, setLoginError] = useState<string | undefined>(undefined);

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
         setIsLoading(true);
         const action = await dispatch(loginUser(values));
         if (loginUser.fulfilled.match(action)) {
            const userPayload = action.payload as { token: string; email: string };
            signIn({
               token: userPayload.token,
               expiresIn: 3600,
               tokenType: 'Bearer',
            });
            setIsLoading(false);
            navigate('/dashboard');
         } else {
            if (action.error) {
               setLoginError('Invalid email or password');
            } else {
               setLoginError('An unknown error occurred.');
            }
            setIsLoading(false);
         }
      },
   });

   return (
      <form className={styles.form__wrapper} onSubmit={formik.handleSubmit}>
         <TextField
            placeholder={'Your email'}
            label={'Email'}
            name={'email'}
            id={'email'}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
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
            error={
               formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : loginError
            }
         />
         <div className={styles.submit__button}>
            <Button
               type={'submit'}
               variant={'primary'}
               isLoading={isLoading}
               onClick={() => console.log('error')}
            >
               Login
            </Button>
         </div>
      </form>
   );
};
