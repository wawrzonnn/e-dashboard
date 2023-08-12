import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { checkToken } from '../utils/checkToken';
import Cookies from 'js-cookie';

interface DecodedToken {
   email: string;
}

const decodeToken = (token: string): DecodedToken => {
   return jwt_decode(token);
};
export const loginUser = createAsyncThunk(
   'user/fetchUser',
   async (userData: { email: string; password: string }, { dispatch }) => {
      const response = await axios.post(
         'https://training.nerdbord.io/api/v1/auth/login',
         {
            email: userData.email,
            password: userData.password,
         },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         },
      );
      Cookies.set('token', response.data.token, { expires: 7 });
      const decoded = decodeToken(response.data.token);
      const isTokenValid = await checkToken(response.data.token);
      return { token: response.data.token, email: decoded.email, isTokenValid };
   },
);
