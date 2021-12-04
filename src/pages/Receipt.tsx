import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import Loading from '../components/Loading/Loading';
import ProductList from '../components/ProductList/ProductList';
import { selectReceipts, selectReceiptsStatus, setStatus } from '../features/receipt/receiptSlice';
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
  }, [history]);

  return status !== 'loading' ? (
    <div className='col' style={{
      margin: 'auto',
      alignItems: 'center'
    }}>
      <div className="row" style={{ margin: '1rem', flexDirection: 'row-reverse' }}>
        <Button variant='outlined' onClick={onEditClick} style={{ margin: '0 2rem' }}>Edit</Button>
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
              maxHeight: '80vh',
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
