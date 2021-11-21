import React from 'react'
import ReceiptFormGroup from '../ReceiptFormGroup/ReceiptFormGroup'
import { IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const commonStyles = {
  margin: 'auto'
};

export default function ReceiptForm() {
  return (
    <Stack>
      <div style={commonStyles}>
        <ReceiptFormGroup />
      </div>
      <div style={commonStyles}>
        <ReceiptFormGroup />
      </div>
      <div style={commonStyles}>
        <IconButton>
          <AddIcon />
        </IconButton>
      </div>
    </Stack>
  )
}
