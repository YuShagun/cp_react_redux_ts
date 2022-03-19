import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { detectItems, postCorners, uploadImageForCornerDetection } from '../../../app/requests/receiptUpload';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ControlButtons from '../../../components/ControlButtons/ControlButtons';
import FormControlButtons from '../../../components/FormControlButtons/FormControlButtons';
import Image from '../../../components/Image/Image';
import ImageRegister from '../../../components/ImageRegister/ImageRegister';
import ReceiptForm from '../../../components/ReceiptForm/ReceiptForm';
import { endProcessing, resetImageState, selectReceiptUploadState, setImage, startProcessing } from '../../../features/receiptUpload/receiptUploadSlice';
import { addFields, clearForm, endSubmit } from '../../../features/receiptForm/receiptFormSlice';
import { addReceipt } from '../../../features/receipt/receiptSlice';
import { Product } from '../../../types';
import { mapItemsResonse, mapRequestImage, mapRequestPoints, readAsDataUrlAsync } from '../../../utils';

import styles from '../ReceiptActions.module.css';
import { mapPointsFromResponse } from './utils';

export default function Upload() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectReceiptUploadState);

  const showForm = status === 'processed';
  const register = data.image && !showForm;

  const onImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const img = event.target.files[0];
      const b64Url = await readAsDataUrlAsync(img);
      dispatch(setImage(b64Url));

      const uploadImage = async () => {
        const image = mapRequestImage(b64Url);
        if (image) {
          const response = await uploadImageForCornerDetection({ id: String(0) }, image);

          const points = mapPointsFromResponse(response.data.detection);
          dispatch(startProcessing(points));
        }
      }

      uploadImage();
    }
  }, [dispatch]);

  const submitCorners = useCallback(async () => {
    const image = mapRequestImage(data.image);
    const corners = mapRequestPoints(data.points, data.mul);
    if (image) {
      const response = await postCorners({ id: String(0) }, { image, corners })

      if (response.data.status === 'success') {
        dispatch(setImage(`data:image/${response.data.img.mime};base64,${response.data.img.data}`));
        dispatch(endProcessing());

        const itemsResponse = await detectItems({ id: String(0) }, response.data.img);

        itemsResponse.data.status === 'success' && dispatch(addFields(mapItemsResonse(itemsResponse.data.items)));
      }
    }
  }, [data, dispatch]);

  const submitReceipt = useCallback((products: Product[]) => {
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
    dispatch(resetImageState());
    dispatch(clearForm());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Grid container columnSpacing={2} justifyContent='space-between' marginBottom='1rem' paddingLeft='1rem' paddingRight='1rem'>
        <Grid item xs='auto'>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" multiple type="file" hidden value={data.image && ''} onChange={onImageChange} />
            <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
              Upload
            </Button>
          </label>
        </Grid>
        <Grid item xs='auto'>
          {showForm ?
            <FormControlButtons onSubmit={submitReceipt} onCancel={cancelUpload} />
            : data.image && <ControlButtons onSubmit={submitCorners} onCancel={cancelUpload} />
          }
        </Grid>
      </Grid>

      {register && <ImageRegister image={data.image} />}

      {showForm &&
        <Grid container spacing={2} justifyContent='center'>
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
