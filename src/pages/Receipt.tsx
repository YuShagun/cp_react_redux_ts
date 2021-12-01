import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Loading from '../components/Loading/Loading';
import ProductList from '../components/ProductList/ProductList';
import { selectReceipts, selectReceiptsStatus, setStatus } from '../features/receipt/receiptSlice';
import { ReceiptRouteParams } from '../types';

export default function ReceiptView() {
  const { id } = useParams<ReceiptRouteParams>();

  const dispatch = useAppDispatch();

  const receipt = useAppSelector(selectReceipts)[id];
  const status = useAppSelector(selectReceiptsStatus);

  useEffect(() => {
    dispatch(setStatus('loading'));
    setTimeout(() => dispatch(setStatus('idle')), 4000);
  }, [dispatch]);


  return status !== 'loading' ? (
    <div className='col' style={{
      maxWidth: '70%',
      margin: 'auto',
      alignItems: 'center'
    }}>
      <div className='row' style={{ margin: '1.5rem' }}>
        <div className='col'>
          <img src={receipt?.image || `/photos/${receipt?.imagePath}`} style={{ maxHeight: '85vh' }} alt="Receipt"></img>
        </div>
        <ProductList products={receipt?.products} />
      </div >
    </div>

  )
    : <Loading />
}
