import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { startSubmit } from '../../features/receiptForm/receiptFormSlice';
import { selectReceiptUploadState } from '../../features/receiptUpload/receiptUploadSlice';
import ControlButtons from '../ControlButtons/ControlButtons';
import { ControlButtonsProps } from '../ControlButtons/types'

export default function FormControlButtons(props: ControlButtonsProps) {
  const dispatch = useAppDispatch();

  const {data, status} = useAppSelector(selectReceiptUploadState);

  useEffect(() => {
    status === 'processing' && data.points && props.onSubmit(data.points);
  }, [data, status, props]);

  const saveReceipt = useCallback(() => {
    dispatch(startSubmit());
  }, [dispatch]);

  return (
    <ControlButtons {...props} onSubmit={saveReceipt} />
  )
}
