import React from 'react';
import { Button, Grid } from '@mui/material';

import { ControlButtonsProps } from './types';

export default function ControlButtons({
  onSubmit,
  onCancel,
  justifyContent,
}: ControlButtonsProps) {
  return (
    <Grid container columnSpacing={2} justifyContent={justifyContent}>
      <Grid item xs='auto'>
        <Button variant='contained' onClick={() => onSubmit()}>Save</Button>
      </Grid>
      <Grid item xs='auto'>
        <Button variant='outlined' color="error" onClick={() => onCancel()}>Cancel</Button>
      </Grid>
    </Grid>
  )
}
