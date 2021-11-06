import React, { MutableRefObject } from 'react';
import { DraggablePointerProps } from './types';

import styles from './DraggablePointer.module.css';
import { POINTER_SIZE } from '../../../constants';

const DraggablePointer = React.forwardRef<HTMLElement, DraggablePointerProps>(({ left, top }, ref) => {

  return <span ref={ref} className={styles.draggable} style={{
    top,
    left,
    width: POINTER_SIZE,
    height: POINTER_SIZE
  }} />;
});

export default DraggablePointer;