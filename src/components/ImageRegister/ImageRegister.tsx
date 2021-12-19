import React, { useCallback, useRef, useState } from 'react';

import DraggableSurface from '../draggable/DraggableSurface/DraggableSurface';

import styles from './ImageRegister.module.css';
import { DOUBLE_INSET, INSET } from '../../constants';
import { ImageRegisterProps } from './types';

export default function ImageRegister({ image }: ImageRegisterProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 100, height: 100 });

  const onImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const width = (event.currentTarget.naturalWidth || 0) + DOUBLE_INSET;
    const height = (event.currentTarget.naturalHeight || 0) + DOUBLE_INSET;
    setSize({
      width,
      height
    });
  }, [setSize]);

  return (
    <>
      {
        image && <>
          <DraggableSurface {...size} />
          <img ref={imageRef} src={image} onLoad={onImageLoad} alt="Receipt" className={styles.image} style={{ margin: INSET }} />
        </>
      }
    </>
  )
}
