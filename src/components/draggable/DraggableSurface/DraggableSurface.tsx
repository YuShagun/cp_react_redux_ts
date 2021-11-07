import React, { useCallback, useRef, useEffect } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import draggablePointerStyles from '../DraggablePointer/DraggablePointer.module.css';
import DraggablePointer from '../DraggablePointer/DraggablePointer';
import ImageOverlay from '../ImageOverlay/ImageOverlay';

import { DraggableSurfaceProps } from './types';
import { getElPositionWithShift, getNewPositionWithinBounds, getPointerPosition } from './utils';
import styles from './DraggableSurface.module.css';
import { setPoints } from '../../../features/receiptUpload/receiptUploadSlice';
import { POINTER_SIZE } from '../../../constants';

export const DraggableSurface: React.FC<DraggableSurfaceProps> = ({
  width,
  height,
}) => {
  const moving = useRef(false);
  const oldPointerPosition = useRef({ x: 0, y: 0 });
  const target = useRef<HTMLElement | null>(null);
  const surfaceDiv = useRef<HTMLDivElement | null>(null);

  const topLeftRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

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

    const points = [topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current];
    dispatch(setPoints(points.map((el) => getElPositionWithShift(el, { top: POINTER_SIZE / 2, left: POINTER_SIZE / 2 }))));

    oldPointerPosition.current = position;
  }, [dispatch]);

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
        height,
      }}
      className={styles.draggableSurface}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseMove={drag}
      onMouseUp={endDrag}
      onTouchEnd={endDrag}
    >
      <ImageOverlay width={width} height={height} />
      <DraggablePointer ref={topLeftRef} top={30} left={30} />
      <DraggablePointer ref={topRightRef} top={30} left={width - 30} />
      <DraggablePointer ref={bottomLeftRef} top={height - 30} left={30} />
      <DraggablePointer ref={bottomRightRef} top={height - 30} left={width - 30} />
    </div>
  )
}

export default DraggableSurface