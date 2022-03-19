import React, { useEffect } from 'react'
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import Loading from '../components/Loading/Loading';

import ReceiptListItem from '../components/ReceiptListItem/ReceiptListItem';
import { selectReceipts, selectReceiptsStatus, setStatus } from '../features/receipt/receiptSlice';

export default function Home() {
  const dispatch = useAppDispatch();

  const receipts = useAppSelector(selectReceipts);
  const status = useAppSelector(selectReceiptsStatus);

  useEffect(() => {
    dispatch(setStatus('loading'));
    setTimeout(() => dispatch(setStatus('idle')), 4000);
  }, [dispatch]);

  return (
    <>
      {
        status === 'loading'
          ? <Grid container height="var(--page-content-height)">
            <Loading />
          </Grid>
          : <div className='col' style={{
            maxWidth: '70%',
            margin: 'auto',
            alignItems: 'center'
          }}>
            {Array.from(Object.entries(receipts), (([key, value]) => <ReceiptListItem key={key} {...value} id={key} />))}
          </div>
      }
    </>
  )
}