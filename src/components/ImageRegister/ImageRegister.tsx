import React, { useCallback, useRef, useState } from 'react';

import DraggableSurface from '../draggable/DraggableSurface/DraggableSurface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReceiptUploadImage, setPoints } from '../../features/receiptUpload/receiptUploadSlice';

import styles from './ImageRegister.module.css';

export default function ImageRegister() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 100, height: 100 });
  const image = useAppSelector(selectReceiptUploadImage);
  const dispatch = useAppDispatch();

  const onImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const width = event.currentTarget.naturalWidth || 0;
    const height = event.currentTarget.naturalHeight || 0;
    setSize({
      width,
      height
    });

    dispatch(setPoints([
      { top: 30, left: 30 },
      { top: 30, left: (width - 30) || 70 },
      { top: (height - 30) || 70, left: 30 },
      { top: (height - 30) || 70, left: (width - 30) || 70 }
    ]))
  }, [setSize]);

  return (
    <>
      {
        image && <>
          <DraggableSurface {...size} />
          <img ref={imageRef} src={image} onLoad={onImageLoad} alt="Receipt" className={styles.image} />
        </>
      }
    </>
  )
}
