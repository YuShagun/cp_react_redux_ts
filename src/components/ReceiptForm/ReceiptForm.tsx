import React, { useCallback } from 'react'
import ReceiptFormGroup from '../ReceiptFormGroup/ReceiptFormGroup'
import { Grid, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addField, selectReceiptFormFields } from '../../features/receiptForm/receiptFormSlice';

export default function ReceiptForm() {
  const fields = useAppSelector(selectReceiptFormFields);
  const dispatch = useAppDispatch();

  const addFieldGroup = useCallback(
    () => {
      dispatch(addField());
    },
    [dispatch],
  );

  const renderFormGroup = useCallback(
    ([key, value]) => (
      <Grid item xs={12} key={key}>
        <ReceiptFormGroup fieldKey={key} field={value} />
      </Grid>
    ),
    [],
  );

  const mapFields = useCallback(
    () => fields.map(renderFormGroup),
    [fields, renderFormGroup],
  );

  return (
    <>
      <Grid container rowSpacing={3}>
        {mapFields()}
      </Grid>
      <Grid
        container
        sx={{
          marginTop: '1rem',
          justifyContent: 'center'
        }}
      >
        <IconButton onClick={addFieldGroup}>
          <AddIcon />
        </IconButton>
      </Grid>
    </>
  )
}
