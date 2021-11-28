import React from 'react'

import { ImageProps } from './types'

export default function Image({
  image
}: ImageProps) {

  return (
    <img
      src={image}
      style={{
        display: 'block',
        height: 'auto',
        maxHeight: '85vh',
        margin: 'auto'
      }}
      alt="Receipt"
    />
  )
}
