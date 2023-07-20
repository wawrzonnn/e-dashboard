import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLeads } from '../slices/leadSlice';
import { AppThunk } from '../store/configureStore';

export const fetchLeads = createAsyncThunk('leads/fetch', async (token: string) => {
   const response = await axios.get('https://training.nerdbord.io/api/v1/leads', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return response.data;
});

export const loadLeads =
   (token: string): AppThunk =>
   async (dispatch) => {
      try {
         const response = await axios.get('https://training.nerdbord.io/api/v1/leads', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         dispatch(setLeads(response.data));
      } catch (error) {
         console.error('Error loading leads:', error);
      }
   };
