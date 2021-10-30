import React from 'react'
import { useAppSelector } from '../app/hooks';

import ReceiptListItem from '../components/ReceiptListItem/ReceiptListItem';
import { selectReceipts } from '../features/receipt/receiptSlice';

export default function Home() {
  const receipts = useAppSelector(selectReceipts);

  return (
    <div className='col' style={{
      maxWidth: '70%',
      margin: 'auto',
      alignItems: 'center'
    }}>
      {Array.from(Object.entries(receipts), (([ key, value ]) => <ReceiptListItem key={key} {...value} id={key}/>))}
    </div>
  )
}