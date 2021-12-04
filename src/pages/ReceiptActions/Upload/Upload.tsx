import React, { useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectReceiptUploadImage, setImage } from '../../../features/receiptUpload/receiptUploadSlice';

import ReceiptForm from '../../../components/ReceiptForm/ReceiptForm';
import Image from '../../../components/Image/Image';
import ControlButtons from '../../../components/ControlButtons/ControlButtons';
import { Product } from '../../../types';
import styles from '../ReceiptActions.module.css';
import { clearForm, endSubmit } from '../../../features/receiptForm/receiptFormSlice';
import { addReceipt } from '../../../features/receipt/receiptSlice';
import { useHistory } from 'react-router';

export default function Upload() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const image = useAppSelector(selectReceiptUploadImage);

  const onImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const img = event.target.files[0];
      dispatch(setImage(URL.createObjectURL(img)));
    }
  }, [dispatch]);

  const onSubmit = useCallback((products: Product[]) => {
    const receipt = {
      imagePath: '',
      shopName: '',
      date: new Date().toLocaleDateString("ru-RU", { day: '2-digit', month: '2-digit', year: 'numeric'}).replaceAll('.', '-'),
      total: `${products.reduce((price, value) => price + Number(value.price), 0).toFixed(2)}`,
      products,
      image
    };

    dispatch(addReceipt(receipt));
    dispatch(endSubmit());

    history.push('/');
  }, [image, dispatch, history]);

  const cancelUpload = useCallback(() => {
    dispatch(setImage(''));
    dispatch(clearForm());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Grid container columnSpacing={2} justifyContent='space-between' marginBottom='1rem'>
        <Grid item xs='auto'>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" multiple type="file" hidden value={image && ''} onChange={onImageChange} />
            <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
              Upload
            </Button>
          </label>
        </Grid>
        {image &&
          <Grid item xs='auto'>
            <ControlButtons onSubmit={onSubmit} onCancel={cancelUpload} />
          </Grid>
        }
      </Grid>

      {image &&
        <Grid container>
          <Grid item xs={6}>
            <Image image={image} />
          </Grid>

          <Grid item xs={4}>
            <ReceiptForm />
          </Grid>
        </Grid>
      }
    </div>
  )
}
