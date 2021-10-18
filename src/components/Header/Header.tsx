import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

import VLine from '../VLine/VLine';

import styles from './Header.module.css';

export default function Header() {

  console.log(styles);

  return (
      <div className={`row justify-content-center ${styles.linkContainer}`}>
        <Link component={RouterLink} underline="none" className={styles.link} to="/">Home</Link>
        <VLine color="var(--dark-cornflower-blue)"/>
        <Link component={RouterLink} underline="none" className={styles.link} to="/about">About</Link>
        <VLine color="var(--dark-cornflower-blue)"/>
        <Link component={RouterLink} underline="none" className={styles.link} to="/app">App</Link>
      </div>
  )
}
