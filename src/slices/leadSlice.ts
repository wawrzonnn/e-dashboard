import { createSlice } from '@reduxjs/toolkit';
import { LeadDto } from 'data/dto/Lead.dto';
const leadSlice = createSlice({
   name: 'leads',
   initialState: {
      leads: [] as LeadDto[],
      filteredLeads: [] as LeadDto[],
   },
   reducers: {
      setLeads: (state, action) => {
         state.leads = action.payload;
      },
      setFilteredLeads: (state, action) => {
         state.filteredLeads = action.payload;
      },
   },
});

export const { setLeads, setFilteredLeads } = leadSlice.actions;
export default leadSlice.reducer;
