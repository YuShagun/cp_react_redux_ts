import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector, useQuery } from '../../../app/hooks';

import ReceiptForm from '../../../components/ReceiptForm/ReceiptForm';
import Image from '../../../components/Image/Image';
import ControlButtons from '../../../components/ControlButtons/ControlButtons';
import { Product } from '../../../types';
import styles from '../ReceiptActions.module.css';
import { clearForm, endSubmit } from '../../../features/receiptForm/receiptFormSlice';
import { editReceipt, selectReceipts } from '../../../features/receipt/receiptSlice';

export default function Edit() {
  const id = useQuery().get('id') || '';
  const dispatch = useAppDispatch();
  const receipt = useAppSelector(selectReceipts)[id];

  console.log(id);

  useEffect(() => {
    dispatch(clearForm());
  }, [dispatch]);

  const onSubmit = useCallback((products: Product[]) => {
    const fieldsToEdit = {
      total: `${products.reduce((price, value) => price + Number(value.price), 0)}`,
      products
    };

    console.log(fieldsToEdit);

    dispatch(editReceipt({
      id,
      fieldsToEdit
    }));
    dispatch(endSubmit());
  }, [dispatch, id]);

  const cancelUpload = useCallback(() => {
    dispatch(clearForm());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ControlButtons onSubmit={onSubmit} onCancel={cancelUpload} justifyContent='flex-end' />

      <Grid container marginTop='1rem'>
        <Grid item xs={6}>
          <Image image={`/photos/${receipt?.imagePath}`} />
        </Grid>

        <Grid item xs={4}>
          <ReceiptForm />
        </Grid>
      </Grid>
    </div>
  )
}
