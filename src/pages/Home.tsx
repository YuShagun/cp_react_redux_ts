import React from 'react'

import ReceiptListItem from '../components/ReceiptListItem/ReceiptListItem';
import data from '../data.json';

export default function Home() {
  return (
    <div className='col' style={{
      maxWidth: '70%',
      margin: 'auto',
      alignItems: 'center'
    }}>
      {data.map(value => <ReceiptListItem {...value}/>)}
    </div>
  )
}