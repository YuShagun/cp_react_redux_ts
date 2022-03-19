import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import Image from '../components/Image/Image';
import Loading from '../components/Loading/Loading';
import ProductList from '../components/ProductList/ProductList';
import { deleteReceipt, selectReceipts, selectReceiptsStatus, setStatus } from '../features/receipt/receiptSlice';
import { ReceiptRouteParams } from '../types';

export default function ReceiptView() {
  const { id } = useParams<ReceiptRouteParams>();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const receipt = useAppSelector(selectReceipts)[id];
  const status = useAppSelector(selectReceiptsStatus);

  useEffect(() => {
    dispatch(setStatus('loading'));
    setTimeout(() => dispatch(setStatus('idle')), 4000);
  }, [dispatch]);


  const onEditClick = useCallback(() => {
    history.push(`/actions/edit?id=${id}`);
  }, [history, id]);

  const onDeleteClick = useCallback(() => {
    dispatch(deleteReceipt(id));
    history.push('/');
  }, [dispatch, id, history]);

  return status !== 'loading' ? (
    <Grid container marginTop='1rem' rowSpacing={2} justifyContent='center'>
      <Grid container xs={12} justifyContent='flex-end'>
        <Grid item >
          <Button variant='contained' onClick={onEditClick} style={{ margin: '0 0.5rem 0 1rem' }}>Edit</Button>
          <Button variant='outlined' color='error' onClick={onDeleteClick} style={{ margin: '0 2rem 0 0.5rem' }}>Delete</Button>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12} >
        <Image image={receipt?.image || `/photos/${receipt?.imagePath}`} />
      </Grid>

      <Grid item md={5} xs={10}>
        <ProductList products={receipt?.products} />
      </Grid>
    </Grid>
  )
    : <Grid container height="var(--page-content-height)">
      <Loading />
    </Grid>
}
