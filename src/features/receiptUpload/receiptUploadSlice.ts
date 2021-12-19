import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DEFAULT_POINTS } from '../../constants';

export interface Point {
  top: number;
  left: number;
};

type ReceiptUploadStatus = 'idle' | 'loading' | 'processing' | 'processed' | 'failed';

export interface ReceiptUploadState {
  data: {
    image: string;
    points: Point[];
  };
  status: ReceiptUploadStatus;
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
    setStatus: (state, action: PayloadAction<ReceiptUploadStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setImage, setPoints, setStatus } = receiptUploadSlice.actions;

export const selectReceiptUploadState = (state: RootState): ReceiptUploadState => state.receiptUpload;

export const selectReceiptUploadPoints = (state: RootState) => state.receiptUpload.data.points;

export default receiptUploadSlice.reducer;
