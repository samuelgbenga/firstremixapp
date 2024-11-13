import { useEffect, useState, RefObject } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {}

export function useInViewport(
  elementRef: RefObject<Element>,
  unobserveOnIntersect: boolean,
  options: IntersectionOptions = {},
  shouldObserve: boolean = true
): boolean {
  const [intersect, setIntersect] = useState<boolean>(false);
  const [isUnobserved, setIsUnobserved] = useState<boolean>(false);

  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry;

      setIntersect(isIntersecting);

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target);
        setIsUnobserved(true);
      }
    }, options);

    if (!isUnobserved && shouldObserve) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef, unobserveOnIntersect, options, isUnobserved, shouldObserve]);

  return intersect;
}
