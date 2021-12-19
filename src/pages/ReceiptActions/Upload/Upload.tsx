import { Button, Grid } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectReceiptUploadState, setImage, setPoints, setStatus } from '../../../features/receiptUpload/receiptUploadSlice';
import ReceiptForm from '../../../components/ReceiptForm/ReceiptForm';
import Image from '../../../components/Image/Image';
import ControlButtons from '../../../components/ControlButtons/ControlButtons';
import { Product } from '../../../types';
import { readAsDataUrlAsync } from '../../../utils';
import { clearForm, endSubmit } from '../../../features/receiptForm/receiptFormSlice';
import { addReceipt } from '../../../features/receipt/receiptSlice';

import styles from '../ReceiptActions.module.css';
import { mapPointsFromResponse } from './utils';
import ImageRegister from '../../../components/ImageRegister/ImageRegister';

export default function Upload() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectReceiptUploadState);

  const showForm = status === 'processed';
  const detectCorners = status === 'processing';

  const onImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const img = event.target.files[0];
      dispatch(setImage(URL.createObjectURL(img)));
      const b64Url = await readAsDataUrlAsync(img);
      const matches = b64Url.match('data:(.+);base64,(.+)');
      if (matches) {
        const response = await axios.post('http://localhost:5000/user/0/image', {
          image: {
            mime: matches[1],
            data: matches[2]
          }
        });

        const points = mapPointsFromResponse(response.data.detection);
        console.log(points)

        dispatch(setPoints(points));
        dispatch(setStatus('processing'))
      }
    }
  }, [dispatch]);

  const onSubmit = useCallback((products: Product[]) => {
    const receipt = {
      imagePath: '',
      shopName: '',
      date: new Date().toLocaleDateString("ru-RU", { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('.', '-'),
      total: `${products.reduce((price, value) => price + Number(value.price), 0).toFixed(2)}`,
      products,
      image: data.image
    };

    dispatch(addReceipt(receipt));
    dispatch(endSubmit());

    history.push('/');
  }, [data, dispatch, history]);

  const cancelUpload = useCallback(() => {
    dispatch(setImage(''));
    dispatch(clearForm());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Grid container columnSpacing={2} justifyContent='space-between' marginBottom='1rem'>
        <Grid item xs='auto'>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" multiple type="file" hidden value={data.image && ''} onChange={onImageChange} />
            <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
              Upload
            </Button>
          </label>
        </Grid>
        {showForm &&
          <Grid item xs='auto'>
            <ControlButtons onSubmit={onSubmit} onCancel={cancelUpload} />
          </Grid>
        }
      </Grid>

      {detectCorners && <ImageRegister image={data.image} />}

      {showForm &&
        <Grid container rowSpacing={2} justifyContent='center'>
          <Grid item md={6} xs={12}>
            <Image image={data.image} />
          </Grid>

          <Grid item md={5} lg={4} xs={10}>
            <ReceiptForm />
          </Grid>
        </Grid>
      }
    </div>
  )
}
