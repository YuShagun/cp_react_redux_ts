import React from 'react';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function ReceiptUpload() {
  return (
    <div>
      <label htmlFor="contained-button-file">
        <input accept="image/*" id="contained-button-file" multiple type="file" hidden />
        <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
          Upload
        </Button>
      </label>
    </div>
  )
}
