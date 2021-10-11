import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReceiptListItemProps } from './types';
import styles from './ReceiptListItem.module.css';

export default function ReceiptListItem({
  imagePath,
  date,
  total,
}: ReceiptListItemProps) {

  return (
    <Link to={`/about`} className={`row ${styles.receiptListItem}`}>
      <img src={`photos/${imagePath}`} className={styles.receiptListImage}></img>
      <div className={`col ${styles.receiptListData}`}>
        <div className='row'>{date}</div>
        <div className='row'>Place</div>
        <div className='row' style={{ fontWeight: 'bold' }}>{total} BYN</div>
      </div>
    </Link>
  );
}
