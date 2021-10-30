import React, { useCallback, useEffect, useRef, useState } from 'react';

import DraggablePointer from '../draggable/DraggablePointer/DraggablePointer';
import DraggableSurface from '../draggable/DraggableSurface/DraggableSurface';
import { useAppSelector } from '../../app/hooks';
import { selectReceiptUpload } from '../../features/receiptUpload/receiptUploadSlice';

import styles from './ImageRegister.module.css';

export default function ImageRegister() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 100, height: 100 });
  const { image } = useAppSelector(selectReceiptUpload);

  const onImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => setSize({
    width: event.currentTarget.naturalWidth || 0,
    height: event.currentTarget.naturalHeight || 0
  }), [setSize]);

  return (
    <>
      {
        image && <>
          <DraggableSurface {...size} >
            <DraggablePointer id="topRightCorner" top={10} left={size.width - 20} />
            <DraggablePointer id="topLeftCorner" top={10} left={10} />
            <DraggablePointer id="bottomLeftCorner" top={size.height - 20} left={10} />
            <DraggablePointer id="bottomRightCorner" top={size.height - 20} left={size.width - 20} />
          </DraggableSurface>
          <img ref={imageRef} src={image} onLoad={onImageLoad} alt="Receipt" className={styles.image} />
        </>
      }
    </>
  )
}
