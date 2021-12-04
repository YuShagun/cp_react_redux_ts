import React from 'react';
import { Grid } from '@mui/material';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';

import styles from './Loading.module.css';

export default function Loading() {
  return (
    <Grid container direction="column" height="80vh" justifyContent="center" alignItems="center">
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
