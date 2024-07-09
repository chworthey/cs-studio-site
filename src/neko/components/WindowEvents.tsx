import { useEffect, useRef } from "react";

export function useAnimate(animateFunc: (deltaTime: number) => void) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const animate = (time: DOMHighResTimeStamp) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      animateFunc(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
};

export interface IPointerLocation {
  X: number | undefined;
  Y: number | undefined;
};

export function useMouseMove() {
  const pointerLocation = useRef<IPointerLocation>({
    X: undefined,
    Y: undefined,
  });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      pointerLocation.current = {
        X: e.pageX - 50 - 1,
        Y: e.pageY - 50 + 3,
      };
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
    }
  }, []);

  return pointerLocation;
};

export function useMouseDown() {
  const mouseDown = useRef<boolean>(false);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (e.button === 0) {
        mouseDown.current = true;
      }
    }
    function handleMouseUp(e: MouseEvent) {
      if (e.button === 0) {
        mouseDown.current = false;
      }
    }
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, []);

  return mouseDown;
};
