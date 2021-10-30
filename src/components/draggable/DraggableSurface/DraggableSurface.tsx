import React, { useCallback, useRef, useEffect } from 'react';

import { DraggableSurfaceProps } from './types';
import { getNewPositionWithinBounds, getPointerPosition } from './utils';

import styles from './DraggableSurface.module.css';
import draggablePointerStyles from '../DraggablePointer/DraggablePointer.module.css';

export const DraggableSurface: React.FC<DraggableSurfaceProps> = ({
  width,
  height,
  children
}) => {
  const moving = useRef(false);
  const oldPointerPosition = useRef({ x: 0, y: 0 });
  const target = useRef<HTMLElement | null>(null);
  const surfaceDiv = useRef<HTMLDivElement | null>(null);


  const startDrag = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    const curTarget = event.target as HTMLElement;
    if (!curTarget.classList.contains(draggablePointerStyles.draggable)) {
      return;
    }

    moving.current = true;
    oldPointerPosition.current = getPointerPosition(event);
    target.current = curTarget;
  }, [])

  const drag = useCallback((event: React.MouseEvent | React.TouchEvent | TouchEvent) => {
    if (!moving.current || !target.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation()

    const position = getPointerPosition(event);
    const distance = {
      x: position.x - oldPointerPosition.current.x,
      y: position.y - oldPointerPosition.current.y,
    };

    const rect = surfaceDiv.current ? surfaceDiv.current.getBoundingClientRect() : new DOMRect();

    const newPosition = getNewPositionWithinBounds(target.current.style, distance, target.current.getBoundingClientRect(), rect);

    target.current.style.left = `${newPosition.left}px`;
    target.current.style.top = `${newPosition.top}px`;

    oldPointerPosition.current = position;
  }, []);

  const endDrag = useCallback(() => {
    moving.current = false;
    target.current = null;
    oldPointerPosition.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const div = surfaceDiv?.current;
    div?.addEventListener('touchmove', drag, { passive: false });

    return () => div?.removeEventListener('touchmove', drag);
  }, [drag]);

  return (
    <div
      ref={surfaceDiv}
      style={{
        width,
        height
      }}
      className={styles.draggableSurface}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseMove={drag}
      onMouseUp={endDrag}
      onTouchEnd={endDrag}
    >
      {children}
    </div>
  )
}

export default DraggableSurface