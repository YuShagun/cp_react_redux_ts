import React from 'react'
import { PriceTagProps } from './types'

export default function PriceTag({ price, currency = 'BYN' }: PriceTagProps) {
  return (
    <div style={{ fontWeight: 'bold' }}>
      {price} {currency}
    </div>
  )
}
