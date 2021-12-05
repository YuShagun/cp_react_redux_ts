import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import VLine from '../VLine/VLine';

import styles from './Header.module.css';

export default function Header() {

  return (
    <div className={`row justify-content-end align-items-center ${styles.linkContainer}`}>
          <Link component={RouterLink} underline="none" className={styles.link} to="/">Home</Link>
          <Button variant="outlined" color='inherit' component={RouterLink} to='/actions/upload' style={{ marginRight: '2rem' }}>Upload receipt</Button>
    </div>
  )
}
