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
   sortKey: 'name' | 'email' | 'date' | 'consentsAccepted';
   sortOrder: 'asc' | 'desc';
}

const initialState: LeadsState = {
   leads: [],
   isLoading: false,
   error: null,
   sortKey: 'date',
   sortOrder: 'desc',
};

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
   const response = await fetch('https://training.nerdbord.io/api/v1/leads');
   const data = await response.json();
   return data;
});

export const sortLeadsByColumn = createAsyncThunk(
   'leads/sortLeadsByColumn',
   async (column: 'name' | 'email' | 'date' | 'consentsAccepted', { getState, dispatch }) => {
      const { leads, sortKey, sortOrder } = (getState() as { leads: LeadsState }).leads;
      let sortedLeads = [...leads];

      if (column === sortKey) {
         sortedLeads.reverse();
      } else {
         sortedLeads.sort((a, b) => {
            if (column === 'name') {
               return sortOrder === 'asc'
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name);
            } else if (column === 'email') {
               return sortOrder === 'asc'
                  ? a.email.localeCompare(b.email)
                  : b.email.localeCompare(a.email);
            } else if (column === 'date') {
               const dateA = new Date(a.createdAt).getTime();
               const dateB = new Date(b.createdAt).getTime();

               if (dateA < dateB) {
                  return sortOrder === 'asc' ? -1 : 1;
               } else if (dateA > dateB) {
                  return sortOrder === 'asc' ? 1 : -1;
               } else {
                  return 0;
               }
            } else if (column === 'consentsAccepted') {
               return sortOrder === 'asc'
                  ? Number(a.consentsAccepted) - Number(b.consentsAccepted)
                  : Number(b.consentsAccepted) - Number(a.consentsAccepted);
            }

            return 0;
         });
      }

      dispatch(setSortKey(column));
      return sortedLeads;
   },
);

export const leadsSlice = createSlice({
   name: 'leads',
   initialState,
   reducers: {
      setSortKey: (state, action) => {
         state.sortKey = action.payload;
      },
   },
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
         })
         .addCase(sortLeadsByColumn.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(sortLeadsByColumn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.leads = action.payload;
         })
         .addCase(sortLeadsByColumn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
         });
   },
});

export const { setSortKey } = leadsSlice.actions;

export const selectLeads = (state: { leads: LeadsState }) => state.leads.leads;
export const selectSortKey = (state: { leads: LeadsState }) => state.leads.sortKey;

export default leadsSlice.reducer;
