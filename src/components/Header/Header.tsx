import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link'

import styles from './Header.module.css';

export default function Header() {
  return (
      <div className='row justify-content-center'>
        <Link component={RouterLink} underline="none" className={styles.link} to="/">Home</Link>
        <Link component={RouterLink} underline="none" className={styles.link} to="/about">About</Link>
        <Link component={RouterLink} underline="none" className={styles.link} to="/app">App</Link>
      </div>
  )
}
