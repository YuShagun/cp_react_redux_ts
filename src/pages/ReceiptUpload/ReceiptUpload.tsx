import React from 'react';
import { Button, Grid } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReceiptUploadImage, setImage } from '../../features/receiptUpload/receiptUploadSlice';

import styles from './ReceiptUpload.module.css';
import ReceiptForm from '../../components/ReceiptForm/ReceiptForm';
import Image from '../../components/Image/Image';

export default function ReceiptUpload() {
  const dispatch = useAppDispatch();
  const image = useAppSelector(selectReceiptUploadImage);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const img = event.target.files[0];
      dispatch(setImage(URL.createObjectURL(img)));
    }
  };

  return (
    <div className={styles.receiptUpload}>
      <div className={styles.buttonContainer}>
        <label htmlFor="contained-button-file">
          <input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={onImageChange} />
          <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
            Upload
          </Button>
        </label>
      </div>

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
