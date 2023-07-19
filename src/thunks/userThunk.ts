import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
   email: string;
}

const decodeToken = (token: string): DecodedToken => {
   return jwt_decode(token);
};
export const loginUser = createAsyncThunk(
   'user/fetchUser',
   async (userData: { email: string; password: string }) => {
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
      const decoded = decodeToken(response.data.token);
      return { token: response.data.token, email: decoded.email };
   },
);

export default loginUser;
