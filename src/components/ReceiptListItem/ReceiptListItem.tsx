import React from 'react';
import { Link } from 'react-router-dom';

import { ReceiptListItemProps } from './types';
import styles from './ReceiptListItem.module.css';
import PriceTag from '../PriceTag/PriceTag';

export default function ReceiptListItem({
  id,
  imagePath,
  date,
  total,
  image,
}: ReceiptListItemProps) {

  return (
    <Link to={`/receipt/${id}`} className={`row ${styles.receiptListItem}`}>
      <img src={image || `/photos/${imagePath}`} className={styles.receiptListImage} alt="Receipt"></img>
      <div className={`col ${styles.receiptListData}`}>
        <div className='row'>{date}</div>
        <div className='row'>Place</div>
        <div className='row'>
          <PriceTag price={total} />
        </div>
      </div>
    </Link>
  );
}
