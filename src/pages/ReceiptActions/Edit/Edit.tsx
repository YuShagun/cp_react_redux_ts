import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector, useQuery } from '../../../app/hooks';

import ReceiptForm from '../../../components/ReceiptForm/ReceiptForm';
import Image from '../../../components/Image/Image';
import ControlButtons from '../../../components/ControlButtons/ControlButtons';
import { Product } from '../../../types';
import styles from '../ReceiptActions.module.css';
import { addFields, clearForm, endSubmit, ReceiptFormStateData } from '../../../features/receiptForm/receiptFormSlice';
import { editReceipt, selectReceipts } from '../../../features/receipt/receiptSlice';
import { DEFAULT_TYPES } from '../../../constants';
import { useHistory } from 'react-router';

export default function Edit() {
  const history = useHistory();
  const id = useQuery().get('id') || '';
  const dispatch = useAppDispatch();
  const receipt = useAppSelector(selectReceipts)[id];

  useEffect(() => {
    const fields = receipt.products.reduce<ReceiptFormStateData>((res, value, index) => {
      res[`${index}`] = {
        name: value.product_name,
        price: value.price,
        type: DEFAULT_TYPES.find((productType) => productType.name === value.category)?.value || 0,
      };
      return res;
    }, {} as ReceiptFormStateData);

    dispatch(addFields(fields));
  }, [dispatch, receipt]);

  const onSubmit = useCallback((products: Product[]) => {
    const fieldsToEdit = {
      total: `${products.reduce((price, value) => price + Number(value.price), 0).toFixed(2)}`,
      products
    };

    dispatch(editReceipt({
      id,
      fieldsToEdit
    }));
    dispatch(endSubmit());
    history.push(`/receipt/${id}`);
  }, [dispatch, id, history]);

  const cancelUpload = useCallback(() => {
    dispatch(clearForm());
    history.push(`/receipt/${id}`);
  }, [dispatch, history, id]);

  return (
    <div className={styles.container}>
      <ControlButtons onSubmit={onSubmit} onCancel={cancelUpload} justifyContent='flex-end' />

      <Grid container marginTop='1rem' spacing={2} justifyContent='center'>
        <Grid item md={6} xs={12} >
          <Image image={receipt?.image || `/photos/${receipt?.imagePath}`} />
        </Grid>

        <Grid item md={4} xs={10}>
          <ReceiptForm />
        </Grid>
      </Grid>
    </div>
  )
}
