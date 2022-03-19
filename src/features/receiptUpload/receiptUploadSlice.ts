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
    mul: Point;
  };
  status: ReceiptUploadStatus;
};

const initialState: ReceiptUploadState = {
  data: {
    image: '',
    points: DEFAULT_POINTS,
    mul: {
      top: 1,
      left: 1
    },
  },
  status: 'idle',
};

const scalePointsToNatural = (points: Point[], scaleFactor: Point): Point[] => {
  return points.map(val => ({
    left: val.left * scaleFactor.left,
    top: val.top * scaleFactor.top,
  }));
}

const scalePointsFromNatural = (points: Point[], scaleFactor: Point): Point[] => {
  return points.map(val => ({
    left: val.left / scaleFactor.left,
    top: val.top / scaleFactor.top,
  }));
}

export const receiptUploadSlice = createSlice({
  name: 'receipt/upload',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.data.image = action.payload;
      state.status = 'loading';
    },
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.data.points = action.payload;
    },
    setStatus: (state, action: PayloadAction<ReceiptUploadStatus>) => {
      state.status = action.payload;
    },
    setMul: (state, action: PayloadAction<Point>) => {
      const naturalPoints = scalePointsToNatural(state.data.points, state.data.mul);

      state.data.mul = action.payload;
      state.data.points = scalePointsFromNatural(naturalPoints, action.payload);
    },
    startProcessing: (state, action: PayloadAction<Point[]>) => {
      state.data.points = scalePointsFromNatural(action.payload, state.data.mul);
      state.status = 'processing';
    },
    endProcessing: (state) => {
      state.status = 'processed';
    },
    resetImageState: (state) => {
      state = initialState;
    }
  },
});

export const { setImage, setPoints, setStatus, setMul, startProcessing, endProcessing, resetImageState } = receiptUploadSlice.actions;

export const selectReceiptUploadState = (state: RootState): ReceiptUploadState => state.receiptUpload;

export const selectReceiptUploadPoints = (state: RootState) => state.receiptUpload.data.points;

export const selectReceiptUploadStatus = (state: RootState) => state.receiptUpload.status;

export default receiptUploadSlice.reducer;
