import { configureStore } from '@reduxjs/toolkit';
import leadReducer from '../slices/leadSlice';

export default configureStore({
   reducer: {
      leads: leadReducer,
   },
});
