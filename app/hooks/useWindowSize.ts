import { useCallback, useEffect, useRef, useState } from 'react';

interface DimensionsProps {
    w: number;
    h: number;
  }

export function useWindowSize() {
    const dimensions = useRef<DimensionsProps>({ w: 1280, h: 800 });

  const createRuler = useCallback(() => {
    // Create a ruler element
    let ruler: HTMLDivElement | null = document.createElement('div');
  
    ruler.style.position = 'fixed';
    ruler.style.height = '100vh';
    ruler.style.width = '0';
    ruler.style.top = '0';
  
    document.documentElement.appendChild(ruler);
  
    // Update dimensions cache with the current width and height
    if (ruler) {
      dimensions.current.w = window.innerWidth;
      dimensions.current.h = ruler.offsetHeight;
    }
  
    // Clean up after ourselves
    document.documentElement.removeChild(ruler);
    ruler = null;
  }, []);
  

  // Get the actual height on iOS Safari
  const getHeight = useCallback(() => {
    const isIOS = navigator?.userAgent.match(/iphone|ipod|ipad/i);

    if (isIOS) {
      createRuler();
      return dimensions.current.h;
    }

    return window.innerHeight;
  }, [createRuler]);

  const getSize = (): DimensionsProps => ({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(dimensions.current);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize]);

  return windowSize;
}
