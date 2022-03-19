import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReceiptUploadStatus, setMul } from '../../features/receiptUpload/receiptUploadSlice';
import DraggableSurface from '../draggable/DraggableSurface/DraggableSurface';
import Loading from '../Loading/Loading';

import styles from './ImageRegister.module.css';
import { ImageRegisterProps } from './types';

export default function ImageRegister({ image }: ImageRegisterProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 100, height: 100 });

  const dispatch = useAppDispatch();
  
  const status = useAppSelector(selectReceiptUploadStatus);

  const loading = useMemo(() => {
    return status === 'loading';
  }, [status]);

  const onImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setSize({
      width: event.currentTarget.width,
      height: event.currentTarget.height,
    });

    dispatch(setMul({
      top: event.currentTarget.naturalHeight / event.currentTarget.height,
      left: event.currentTarget.naturalWidth / event.currentTarget.width
    }));
  }, [setSize, dispatch]);

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Grid item xs={12} className={styles.gridItem}>
        {
          image && <>
            {
              loading ?
                <Grid container position='absolute' width="var(--inner-size);" height="var(--inner-size);">
                  <Loading overlay />
                </Grid>
                :
                <DraggableSurface {...size} />
            }
            <img ref={imageRef} src={image} onLoad={onImageLoad} alt="Receipt" className={styles.image} />
          </>
        }
      </Grid>
    </Grid>
  )
}
