import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export default function Header() {
  return (
      <div className='row justify-content-center'>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/app">App</Link>
      </div>
  )
}
