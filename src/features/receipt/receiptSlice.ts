import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Receipt } from '../../types';

import data from '../../data.json';

interface ReceiptStateData {
  [key: string]: Receipt;
};

export interface ReceiptState {
  data: ReceiptStateData;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptState = {
  data,
  status: 'idle',
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ReceiptStateData>) => {
      state.data = action.payload;
    },
    addReceipt: (state, action: PayloadAction<Receipt>) => {
      state.data[`${Number(Object.keys(state.data).pop() || 0) + 1}`] = action.payload;
    }
  },
});

export const { set, addReceipt } = receiptSlice.actions;

export const selectReceipts = (state: RootState) => state.receipt.data;

export default receiptSlice.reducer;
