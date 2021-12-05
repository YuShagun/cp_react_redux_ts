import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
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
    <div className='col' style={{
      margin: 'auto',
      alignItems: 'center'
    }}>
      <div className="row" style={{ margin: '1rem', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={onEditClick} style={{ margin: '0 0.5rem 0 1rem' }}>Edit</Button>
        <Button variant='outlined' color='error' onClick={onDeleteClick} style={{ margin: '0 2rem 0 0.5rem' }}>Delete</Button>
      </div>
      <div className='row'>
        <div className='col'>
          <img
            src={receipt?.image || `/photos/${receipt?.imagePath}`}
            style={{
              display: 'block',
              maxWidth: 'max(200px, 60%)',
              width: 'auto',
              height: 'auto',
              maxHeight: 'calc(100vh - 11rem)',
              margin: 'auto',
            }}
            alt="Receipt"/>
        </div>
        <ProductList products={receipt?.products} />
      </div >
    </div>

  )
    : <Loading />
}
