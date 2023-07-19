import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      return response.data;
   },
);

export default loginUser;
