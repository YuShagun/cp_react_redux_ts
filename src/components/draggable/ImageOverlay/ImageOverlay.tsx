import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectReceiptUploadPoints } from '../../../features/receiptUpload/receiptUploadSlice';

import { ImageOverlayProps } from './types';
import { computePathString, getPointStringWithShift } from './utils';
import styles from './ImageOverlay.module.css';
import { SHIFT_POINTS } from '../../../constants';

export default function ImageOverlay({
  width,
  height
}: ImageOverlayProps) {
  const points = useAppSelector(selectReceiptUploadPoints);

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svgBox}>
        <polygon
          points={`${getPointStringWithShift(points[0], SHIFT_POINTS[0])} ${getPointStringWithShift(points[1], SHIFT_POINTS[1])} ${getPointStringWithShift(points[3], SHIFT_POINTS[3])} ${getPointStringWithShift(points[2], SHIFT_POINTS[2])}`}
          fill='none'
          stroke='var(--dark-cornflower-blue)'
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
