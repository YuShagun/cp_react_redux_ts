import React, { useCallback } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { ReceiptFormGroupProps } from './types';
import { useAppDispatch } from '../../app/hooks';
import { DEFAULT_TYPES } from '../../constants';
import { deleteField, editField } from '../../features/receiptForm/receiptFormSlice';

export default function ReceiptFormGroup({
  fieldKey,
  field
}: ReceiptFormGroupProps) {
  const dispatch = useAppDispatch();

  const removeFieldGroup = useCallback(() => dispatch(deleteField(fieldKey)), [dispatch, fieldKey]);

  const mapOptions = useCallback(() => DEFAULT_TYPES.map(value => (
    <MenuItem key={value.value} value={value.value}>{value.name}</MenuItem>
  )), []);

  const editReceiptField = useCallback(value => dispatch(editField({
    key: fieldKey,
    value: {
      ...field,
      ...value
    }
  })), [dispatch, fieldKey, field]);

  const textFieldOnChange = useCallback(event => editReceiptField({
    name: event.target.value
  }), [editReceiptField]);

  const selectOnChange = useCallback(event => editReceiptField({
    type: event.target.value
  }), [editReceiptField]);

  const numberOnChange = useCallback(event => editReceiptField({
    quantity: event.target.value
  }), [editReceiptField]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={11}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Name" fullWidth value={field.name} onChange={textFieldOnChange} />
          </Grid>
          <Grid item xs="auto">
            <FormControl margin="normal">
              <InputLabel id={`select-${fieldKey}-label`}>Type</InputLabel>
              <Select
                label='Type'
                labelId={`select-${fieldKey}-label`}
                id={`select-${fieldKey}`}
                autoWidth={false}
                fullWidth
                value={field.type}
                onChange={selectOnChange}
              >
                {mapOptions()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField variant="outlined" type="number" label="Quantity" margin="normal" value={field.quantity} onChange={numberOnChange} />
          </Grid>
        </Grid>
      </Grid>


      <Grid item xs={1} sx={{ position: 'relative' }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
          onClick={removeFieldGroup}
        >
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid >
  )
}
