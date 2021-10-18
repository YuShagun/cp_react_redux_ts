import React from 'react';

import { VLineProps } from './types';
import styles from './VLine.module.css';

export default function VLine({ color }: VLineProps) {
  return <div className={styles.vline} style={{ color }}/>
}
