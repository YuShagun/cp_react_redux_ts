import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Receipt } from '../../types';

import data from '../../data.json';

interface ReceiptStateData {
  [key: string]: Receipt;
};

export type ReceiptStateStatus = 'idle' | 'loading' | 'failed';

export interface ReceiptState {
  data: ReceiptStateData;
  status: ReceiptStateStatus;
};

const initialState: ReceiptState = {
  data,
  status: 'loading',
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ReceiptStateData>) => {
      state.data = action.payload;
      state.status = 'idle';
    },
    setStatus: (state, action: PayloadAction<ReceiptStateStatus>) => {
      state.status = action.payload;
    },
    addReceipt: (state, action: PayloadAction<Receipt>) => {
      state.data[`${Number(Object.keys(state.data).pop() || 0) + 1}`] = action.payload;
    }
  },
});

export const { set, setStatus, addReceipt } = receiptSlice.actions;

export const selectReceipts = (state: RootState) => state.receipt.data;

export const selectReceiptsStatus = (state: RootState) => state.receipt.status;

export default receiptSlice.reducer;
