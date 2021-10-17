import React from 'react'
import Product from '../Product/Product'
import { ProductListProps } from './types'

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className='col'>
      {products.map(val => <Product product={val} />)}
    </div>
  )
}
