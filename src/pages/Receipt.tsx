import React from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../app/hooks';
import ProductList from '../components/ProductList/ProductList';
import { selectReceipts } from '../features/receipt/receiptSlice';
import { ReceiptRouteParams } from '../types';

export default function ReceiptView() {
  const { id } = useParams<ReceiptRouteParams>();

  const receipt = useAppSelector(selectReceipts).get(id);

  return receipt ? (
    <div className='col' style={{
      maxWidth: '70%',
      margin: 'auto',
      alignItems: 'center'
    }}>
      <div className='row' style={{ margin: '1.5rem' }}>
        <div className='col' style={{ maxWidth: 400 }}>
          <img src={`/photos/${receipt?.imagePath}`} style={{ maxWidth: '100%' }}></img>
        </div>
        <ProductList products={receipt?.products} />
      </div >
    </div>

  )
    : <div>Loading</div>
}
