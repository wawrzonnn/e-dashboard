import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Lead {
   _id: string;
   name: string;
   email: string;
   consentsAccepted: boolean;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

interface LeadsState {
   leads: Lead[];
   isLoading: boolean;
   error: string | null;
}

const initialState: LeadsState = {
   leads: [],
   isLoading: false,
   error: null,
};

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
   const response = await fetch('https://training.nerdbord.io/api/v1/leads');
   const data = await response.json();
   data.sort(
      (a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
   );
   return data;
});

export const leadsSlice = createSlice({
   name: 'leads',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchLeads.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(fetchLeads.fulfilled, (state, action) => {
            state.isLoading = false;
            state.leads = action.payload;
         })
         .addCase(fetchLeads.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
         });
   },
});

export const selectLeads = (state: { leads: LeadsState }) => state.leads.leads;

export default leadsSlice.reducer;
