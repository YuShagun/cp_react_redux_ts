import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import receiptReducer from '../features/receipt/receiptSlice';
import receiptUploadReducer from '../features/receiptUpload/receiptUploadSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    receipt: receiptReducer,
    receiptUpload: receiptUploadReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
