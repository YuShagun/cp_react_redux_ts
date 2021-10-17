import React from 'react';

import PriceTag from '../PriceTag/PriceTag';
import { ProductProps } from './types';
import styles from './Product.module.css';

export default function Product({ product }: ProductProps) {
  return (
    <div style={{ margin: '1rem' }}>
      <div>{product.product_name}</div>
      <div className='row'>
        <div className='col'>
          <PriceTag price={product.price}/>
        </div>
        <div className='col'>
          <div className={styles.category}>
            {product.category}
          </div>
        </div>
      </div>
    </div>
  )
}
