import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Receipt } from '../../types';

export interface ReceiptUploadState {
  data: {
    image?: string;
  };
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptUploadState = {
  data: {},
  status: 'idle',
};

export const receiptUploadSlice = createSlice({
  name: 'receipt/upload',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.data.image = action.payload;
    },
  },
});

export const { setImage } = receiptUploadSlice.actions;

export const selectReceiptUpload = (state: RootState) => state.receiptUpload.data;

export default receiptUploadSlice.reducer;
