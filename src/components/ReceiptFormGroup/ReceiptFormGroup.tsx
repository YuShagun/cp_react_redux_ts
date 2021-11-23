import React from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import { ReceiptFormGroupProps } from './types';

export default function ReceiptFormGroup({
  index,
  field
}: ReceiptFormGroupProps) {
  return (
    <div>
      <TextField variant="outlined" margin="normal" fullWidth />
      <Select label='Type' value={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </div>
  )
}
