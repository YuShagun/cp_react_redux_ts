import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ReceiptField {
  name: string;
  quantity: number;
  // TODO: replace with enum
  type: string;
};

export interface ReceiptFormState {
  data: {[key: string]: ReceiptField};
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptFormState = {
  data: {'1': {} as ReceiptField},
  status: 'idle',
};

export const receiptFormSlice = createSlice({
  name: 'receipt/form',
  initialState,
  reducers: {
    addField: (state) => {
      state.data[`${Number(Object.keys(state.data).pop()) + 1}`] = {} as ReceiptField;
    },
    deleteField: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
  },
});

export const { addField, deleteField } = receiptFormSlice.actions;

export const selectReceiptFormFields = (state: RootState) => Object.entries(state.receiptForm.data);

export const selectReceiptFormFieldsByIndex = (state: RootState, key: string) => state.receiptForm.data[key];

export default receiptFormSlice.reducer;
