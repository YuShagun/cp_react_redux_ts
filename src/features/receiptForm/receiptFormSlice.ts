import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ReceiptField {
  name: string;
  quantity: number;
  // TODO: replace with enum
  type: string;
};

export interface ReceiptFormState {
  data: ReceiptField[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptFormState = {
  data: [],
  status: 'idle',
};

export const receiptFormSlice = createSlice({
  name: 'receipt/form',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<ReceiptField>) => {
      state.data.push(action.payload);
    },
    deleteField: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
  },
});

export const { addField, deleteField } = receiptFormSlice.actions;

export const selectReceiptFormFields = (state: RootState) => state.receiptForm.data;

export const selectReceiptFormFieldsByIndex = (state: RootState, index: number) => state.receiptForm.data[index];

export default receiptFormSlice.reducer;
