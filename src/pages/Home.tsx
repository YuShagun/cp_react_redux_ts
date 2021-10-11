import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';

import ReceiptListItem from '../components/ReceiptListItem/ReceiptListItem';
import { selectReceipts } from '../features/receipt/receiptSlice';

export default function Home() {
  const receipts = useAppSelector(selectReceipts);
  const dispatch = useAppDispatch();

  return (
    <div className='col' style={{
      maxWidth: '70%',
      margin: 'auto',
      alignItems: 'center'
    }}>
      {Array.from(receipts.values(), (value => <ReceiptListItem {...value}/>))}
    </div>
  )
}