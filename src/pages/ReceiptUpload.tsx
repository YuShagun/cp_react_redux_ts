import React from 'react';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectReceiptUpload, setImage } from '../features/receiptUpload/receiptUploadSlice';

export default function ReceiptUpload() {
  const { image } = useAppSelector(selectReceiptUpload);
  const dispatch = useAppDispatch();

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target.files[0]) {
      const img = event.target.files[0];
      dispatch(setImage(URL.createObjectURL(img)));
    }
  };

  return (
    <div>
      { image && <img src={image} /> }
      <label htmlFor="contained-button-file">
        <input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={onImageChange} />
        <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
          Upload
        </Button>
      </label>
    </div>
  )
}
