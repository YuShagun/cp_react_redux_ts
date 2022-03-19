import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DEFAULT_TYPES } from '../../constants';

export interface ReceiptField {
  name: string;
  price: string;
  type: number;
};

export interface EditFieldPayload {
  key: string;
  value: ReceiptField;
};

export interface ReceiptFormStateData {
  [key: string]: ReceiptField;
};

export interface ReceiptFormState {
  data: ReceiptFormStateData;
  status: 'idle' | 'loading' | 'failed' | 'submitting';
};

const initialState: ReceiptFormState = {
  data: { '1': { name: '', price: '', type: 0 } },
  status: 'idle',
};

export const receiptFormSlice = createSlice({
  name: 'receipt/form',
  initialState,
  reducers: {
    addField: (state) => {
      state.data[`${Number(Object.keys(state.data).pop() || 0) + 1}`] = { name: '', price: '', type: 0 };
      state.status = 'idle';
    },
    addFields: (state, action: PayloadAction<ReceiptFormStateData>) => {
      state.data = action.payload;
    },
    editField: (state, action: PayloadAction<EditFieldPayload>) => {
      state.data[action.payload.key] = action.payload.value;
      state.status = 'idle';
    },
    deleteField: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
      state.status = 'idle';
    },
    clearForm: () => initialState,
    startSubmit: state => {
      state.status = 'submitting';
    },
    endSubmit: state => {
      state.status = 'idle';
    },
  },
});

export const { addField, addFields, editField, deleteField, clearForm, startSubmit, endSubmit } = receiptFormSlice.actions;

export const selectReceiptFormFields = (state: RootState) => Object.entries(state.receiptForm.data);

export const selectReceiptFormFieldsByIndex = (state: RootState, key: string) => state.receiptForm.data[key];

export const selectReceiptProducts = (state: RootState) => {
  if (state.receiptForm.status !== 'submitting') {
    return null;
  }
  const fields = Object.values(state.receiptForm.data);

  return fields.map(value => ({
    price: value.price,
    category: DEFAULT_TYPES[value.type].name,
    product_name: value.name
  }));
};

export const selectReceiptFormStatus = (state: RootState) => state.receiptForm.status;

export default receiptFormSlice.reducer;
