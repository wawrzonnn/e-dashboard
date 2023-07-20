import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadLeads } from '../../thunks/leadThunk';
import { setFilteredLeads } from '../../slices/leadSlice';
import { filterLeads } from 'utils/filteredLeads';

// This hook manages table-related effects (loading and filtering leads).
export const useTableEffects = (searchValue: string) => {
   const leads = useAppSelector((state) => state.leads.leads);
   const user = useAppSelector((state) => state.user.data);
   const dispatch = useAppDispatch();

   // Load leads if user is authenticated.
   useEffect(() => {
      if (user?.token) {
         dispatch(loadLeads(user.token));
      }
   }, [dispatch, user]);

   // Filter leads based on search value.
   useEffect(() => {
      const filtered = filterLeads(leads, searchValue);
      dispatch(setFilteredLeads(filtered));
   }, [leads, searchValue, dispatch]);
};
