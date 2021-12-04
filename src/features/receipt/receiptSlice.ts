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

export interface EditReceiptPayload {
  id: string;
  fieldsToEdit: Partial<Receipt>;
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
    },
    editReceipt: (state, action: PayloadAction<EditReceiptPayload>) => {
      state.data[action.payload.id] = {
        ...state.data[action.payload.id],
        ...action.payload.fieldsToEdit
      }
    }
  },
});

export const { set, addReceipt, editReceipt } = receiptSlice.actions;

export const selectReceipts = (state: RootState) => state.receipt.data;

export default receiptSlice.reducer;
