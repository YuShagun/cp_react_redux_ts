import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import receiptReducer from '../features/receipt/receiptSlice';
import receiptUploadReducer from '../features/receiptUpload/receiptUploadSlice';
import receiptFormReducer from '../features/receiptForm/receiptFormSlice';

export const store = configureStore({
  reducer: {
    receipt: receiptReducer,
    receiptUpload: receiptUploadReducer,
    receiptForm: receiptFormReducer,
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
