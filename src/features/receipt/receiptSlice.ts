import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Receipt } from '../../types';

import data from '../../data.json';

export interface ReceiptState {
  data: Map<string, Receipt>;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptState = {
  data: new Map(Object.entries(data)),
  status: 'idle',
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Map<string, Receipt>>) => {
      state.data = action.payload;
    },
  },
});

export const { set } = receiptSlice.actions;

export const selectReceipts = (state: RootState) => state.receipt.data;

export const selectReceiptById = (state: RootState, id: string) => state.receipt.data.get(id); 

export default receiptSlice.reducer;
