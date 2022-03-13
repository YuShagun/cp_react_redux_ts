import React, { useCallback, useRef, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import draggablePointerStyles from '../DraggablePointer/DraggablePointer.module.css';
import DraggablePointer from '../DraggablePointer/DraggablePointer';
import ImageOverlay from '../ImageOverlay/ImageOverlay';

import { DraggableSurfaceProps } from './types';
import { getElPosition, getNewPositionWithinBounds, getPointerPosition } from './utils';
import styles from './DraggableSurface.module.css';
import { selectReceiptUploadPoints, setMul, setPoints } from '../../../features/receiptUpload/receiptUploadSlice';

export const DraggableSurface: React.FC<DraggableSurfaceProps> = ({
  width,
  height,
  naturalWidth,
  naturalHeight,
}) => {
  const pointerPositions = useAppSelector(selectReceiptUploadPoints);

  const moving = useRef(false);
  const oldPointerPosition = useRef({ x: 0, y: 0 });
  const target = useRef<HTMLElement | null>(null);
  const surfaceDiv = useRef<HTMLDivElement | null>(null);

  const topLeftRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMul({
      top: naturalHeight / height,
      left: naturalWidth / width
    }));
  }, [width, height, naturalHeight, naturalWidth, dispatch]);

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

    dispatch(setPoints(points.map((el) => getElPosition(el))));

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
      className={styles.draggableSurface}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseMove={drag}
      onMouseUp={endDrag}
      onTouchEnd={endDrag}
    >
      <div
        ref={surfaceDiv}
        style={{ width, height }}
        className={styles.draggableInner}
      >
        <ImageOverlay width={width} height={height} />
        <DraggablePointer ref={topLeftRef} top={pointerPositions[0].top} left={pointerPositions[0].left} color='#f9bbbb' />
        <DraggablePointer ref={topRightRef} top={pointerPositions[1].top} left={pointerPositions[1].left} color='#93daf8' />
        <DraggablePointer ref={bottomLeftRef} top={pointerPositions[2].top} left={pointerPositions[2].left} color='#c9e5bd' />
        <DraggablePointer ref={bottomRightRef} top={pointerPositions[3].top} left={pointerPositions[3].left} color='#e2c7e0' />
      </div>
    </div>
  )
}

export default DraggableSurface