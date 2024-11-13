import { useNavigation } from '@remix-run/react';
import { useRef, useEffect, useState } from 'react';
import styles from './progress.module.css';

export function Progress() {
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { state } = useNavigation();
  const progressRef = useRef<HTMLDivElement | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (state !== 'idle') {
      timeout.current = setTimeout(() => {
        setVisible(true);
      }, 500);
    } else if (animationComplete) {
      timeout.current = setTimeout(() => {
        setVisible(false);
      }, 300);
    }
  }, [state, animationComplete]);

  useEffect(() => {
    if (!progressRef.current) return;

    const controller = new AbortController();

    if (state !== 'idle') {
      setAnimationComplete(false);
      return;
    }

    Promise.all(
      progressRef.current
        .getAnimations({ subtree: true })
        .map(animation => animation.finished)
    ).then(() => {
      if (controller.signal.aborted) return;
      setAnimationComplete(true);
    });

    return () => {
      controller.abort();
    };
  }, [state]);

  return (
    <div
      className={styles.progress}
      data-status={state}
      data-visible={visible}
      data-complete={animationComplete}
      ref={progressRef}
    />
  );
}