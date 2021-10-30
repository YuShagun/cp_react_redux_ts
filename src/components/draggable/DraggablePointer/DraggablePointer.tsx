import React from 'react';
import { DraggablePointerProps } from './types';

import styles from './DraggablePointer.module.css';

export default function DraggablePointer({
  id,
  left,
  top
}: DraggablePointerProps) {

  return <span id={id} className={styles.draggable} style={{ top, left }} />;
}
