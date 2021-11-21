import React from 'react';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useAppDispatch } from '../../app/hooks';
import { setImage } from '../../features/receiptUpload/receiptUploadSlice';
import ImageRegister from '../../components/ImageRegister/ImageRegister';

import styles from './ReceiptUpload.module.css';
import ReceiptForm from '../../components/ReceiptForm/ReceiptForm';

export default function ReceiptUpload() {
  const dispatch = useAppDispatch();

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

      <ImageRegister />

      <ReceiptForm />
    </div>
  )
}
