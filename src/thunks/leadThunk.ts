import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLeads } from '../slices/leadSlice';

export const fetchLeads = createAsyncThunk('leads/fetch', async () => {
   const response = await fetch('https://training.nerdbord.io/api/v1/leads');
   const data = await response.json();
   return data;
});

export const loadLeads = () => async (dispatch: any) => {
   try {
      const leads = await dispatch(fetchLeads());
      dispatch(setLeads(leads.payload));
   } catch (error) {
      console.error('Error loading leads:', error);
   }
};
