import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/userThunk';

interface UserState {
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   data?: {
      token: string;
      email: string;
   };
   isTokenValid?: boolean;
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
         .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = {
               token: action.payload.token,
               email: action.payload.email,
            };
            state.isTokenValid = action.payload.isTokenValid;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export default userSlice.reducer;
