import React from 'react';
import { Grid } from '@mui/material';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';

import styles from './Loading.module.css';
import { LoadingProps } from './types';

export default function Loading({ overlay = false }: LoadingProps) {
  return (
    <Grid container direction="column" height="100%" justifyContent="center" alignItems="center" position="relative" top={0}>
      {overlay && <div className={styles.overlay}/> }
      <div className={styles['animated-container']}>
      <div className={styles.slider} />
      <div className={styles.rectangle} />
      <ArticleSharpIcon className={styles.icon} />
      <div className={styles['background-animated']} />
      <div className={styles.background} />
    </div>
    </Grid>
  )
}
