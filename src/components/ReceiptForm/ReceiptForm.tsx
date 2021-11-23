import React, { useCallback } from 'react'
import ReceiptFormGroup from '../ReceiptFormGroup/ReceiptFormGroup'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addField, selectReceiptFormFields } from '../../features/receiptForm/receiptFormSlice';

const commonStyles = {
  margin: 'auto'
};

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
    (field, index) => (
        <div style={commonStyles} key={index}>
          <ReceiptFormGroup index={field.key} field={field.value} />
        </div>
      ),
    [],
  );

  const mapFields = useCallback(
    () => fields.map(renderFormGroup),
    [fields, renderFormGroup],
  );

  return (
    <Stack>
      {mapFields()}
      <div style={commonStyles}>
        <IconButton onClick={addFieldGroup}>
          <AddIcon />
        </IconButton>
      </div>
    </Stack>
  )
}
