import { createSlice } from '@reduxjs/toolkit';

export interface Leads {
   _id: string;
   name: string;
   email: string;
   consentsAccepted: boolean;
   createdAt: string;
}

const leadSlice = createSlice({
   name: 'leads',
   initialState: [],
   reducers: {
      setLeads: (state, action) => {
         return action.payload;
      },
   },
});

export const { setLeads } = leadSlice.actions;
export default leadSlice.reducer;
