import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../thunks/userThunk';

interface UserState {
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   data?: string;
   error?: string;
}

const initialState: UserState = {
   status: 'idle',
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.token;
         })
         .addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export default userSlice.reducer;
