import React, { useCallback, useEffect } from 'react';
import { Button, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReceiptFormStatus, selectReceiptProducts, startSubmit } from '../../features/receiptForm/receiptFormSlice';
import { ControlButtonsProps } from './types';

export default function ControlButtons({
  onSubmit,
  onCancel
}: ControlButtonsProps) {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectReceiptProducts);
  const status = useAppSelector(selectReceiptFormStatus);

  useEffect(() => {
    status === 'submitting' && products && onSubmit(products);
  }, [status, onSubmit]);

  const saveReceipt = useCallback(() => {
    dispatch(startSubmit());
  }, [dispatch]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs='auto'>
        <Button variant='contained' onClick={saveReceipt}>Save</Button>
      </Grid>
      <Grid item xs='auto'>
        <Button variant='outlined' color="error" onClick={() => onCancel()}>Cancel</Button>
      </Grid>
    </Grid>
  )
}
