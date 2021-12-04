import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import VLine from '../VLine/VLine';

import styles from './Header.module.css';

export default function Header() {

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <div className={`row justify-content-center ${styles.linkContainer}`}>
          <Link component={RouterLink} underline="none" className={styles.link} to="/">Home</Link>
          <VLine color="var(--dark-cornflower-blue)" />
          <Link component={RouterLink} underline="none" className={styles.link} to="/about">About</Link>
          <VLine color="var(--dark-cornflower-blue)" />
          <Link component={RouterLink} underline="none" className={styles.link} to="/app">App</Link>

        </div>
      </div>
      <div className="col">
        <div className="row justify-content-end align-items-center">
          <Button variant="outlined" component={RouterLink} to='/actions/upload' style={{ marginRight: '0.5rem' }}>Upload receipt</Button>
        </div>
      </div>
    </div>
  )
}
