import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectReceiptUploadPoints } from '../../../features/receiptUpload/receiptUploadSlice';

import { ImageOverlayProps } from './types';
import { computePathString, getPointString } from './utils';
import styles from './ImageOverlay.module.css';

export default function ImageOverlay({
  width,
  height
}: ImageOverlayProps) {
  const points = useAppSelector(selectReceiptUploadPoints);

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svgBox}>
        <polygon
          points={`${getPointString(points[0])} ${getPointString(points[1])} ${getPointString(points[3])} ${getPointString(points[2])}`}
          fill='none'
          stroke='var(--manatee)'
          strokeWidth='3'
        />
      </svg>
      <div
        style={{
          width,
          height,
          background: 'rgba(0, 0, 0, 0.5)',
          clipPath: computePathString(width, height, points)
        }}
      />
    </>
  )
}
