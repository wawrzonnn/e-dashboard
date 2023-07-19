import { configureStore } from '@reduxjs/toolkit';
import leadReducer from '../slices/leadSlice';
import userReducer from '../slices/userSlice';

export const store = configureStore({
   reducer: {
      leads: leadReducer,
      user: userReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
