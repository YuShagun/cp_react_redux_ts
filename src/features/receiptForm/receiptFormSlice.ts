import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ReceiptField {
  name: string;
  quantity: number;
  type: number;
};

export interface EditFieldPayload {
  key: string;
  value: ReceiptField;
};

export interface ReceiptFormState {
  data: {[key: string]: ReceiptField};
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptFormState = {
  data: {'1': { name: '', quantity: 1, type: 0 }},
  status: 'idle',
};

export const receiptFormSlice = createSlice({
  name: 'receipt/form',
  initialState,
  reducers: {
    addField: (state) => {
      state.data[`${Number(Object.keys(state.data).pop() || 0) + 1}`] = { name: '', quantity: 1, type: 0 };
    },
    editField: (state, action: PayloadAction<EditFieldPayload>) => {
      console.log(action.payload.value);
      state.data[action.payload.key] = action.payload.value;
    },
    deleteField: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
  },
});

export const { addField, editField, deleteField } = receiptFormSlice.actions;

export const selectReceiptFormFields = (state: RootState) => Object.entries(state.receiptForm.data);

export const selectReceiptFormFieldsByIndex = (state: RootState, key: string) => state.receiptForm.data[key];

export default receiptFormSlice.reducer;
