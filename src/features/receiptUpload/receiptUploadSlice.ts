import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DEFAULT_POINTS } from '../../constants';

export interface Point {
  top: number;
  left: number;
};

export interface ReceiptUploadState {
  data: {
    image: string;
    points: Point[];
  };
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ReceiptUploadState = {
  data: {
    image: '',
    points: DEFAULT_POINTS,
  },
  status: 'idle',
};

export const receiptUploadSlice = createSlice({
  name: 'receipt/upload',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.data.image = action.payload;
    },
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.data.points = action.payload;
    },
  },
});

export const { setImage, setPoints } = receiptUploadSlice.actions;

export const selectReceiptUploadImage = (state: RootState) => state.receiptUpload.data.image;

export const selectReceiptUploadPoints = (state: RootState) => state.receiptUpload.data.points;

export default receiptUploadSlice.reducer;
