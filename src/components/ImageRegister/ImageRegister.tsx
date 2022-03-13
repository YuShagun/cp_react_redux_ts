import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';

import DraggableSurface from '../draggable/DraggableSurface/DraggableSurface';

import styles from './ImageRegister.module.css';
import { ImageRegisterProps } from './types';

export default function ImageRegister({ image }: ImageRegisterProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 100, height: 100, naturalWidth: 100, naturalHeight: 100 });

  const onImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setSize({
      width: event.currentTarget.width,
      height: event.currentTarget.height,
      naturalWidth: event.currentTarget.naturalWidth,
      naturalHeight: event.currentTarget.naturalHeight
    });
  }, [image, setSize]);

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Grid item xs={12} className={styles.gridItem}>
        {
          image && <>
            <DraggableSurface {...size} />
            <img ref={imageRef} src={image} onLoad={onImageLoad} alt="Receipt" className={styles.image} />
          </>
        }
      </Grid>
    </Grid>
  )
}
