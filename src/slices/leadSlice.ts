import { createSlice } from '@reduxjs/toolkit';

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
