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
        maxHeight: 'calc(100vh - 11rem)',
        margin: 'auto',
        maxWidth: '100%'
      }}
      alt="Receipt"
    />
  )
}
