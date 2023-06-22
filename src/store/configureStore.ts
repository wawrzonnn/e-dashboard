import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import leadReducer from '../slices/leadSlice';

const store = configureStore({
   reducer: {
      leads: leadReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;

export default store;
