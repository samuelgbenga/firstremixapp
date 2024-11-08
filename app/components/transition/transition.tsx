import { AnimatePresence, usePresence } from 'framer-motion';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface TransitionProps {
  children: (props: { visible: boolean; status: string; nodeRef: React.RefObject<HTMLElement> }) => ReactNode;
  in: boolean;
  unmount?: boolean;
  initial?: boolean;
  timeout?: number | { enter: number; exit: number };
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  nodeRef?: React.RefObject<HTMLElement>;
}

export const Transition: React.FC<TransitionProps> = ({
  children,
  in: show,
  unmount = false,
  initial = true,
  ...props
}) => {
  const enterTimeout = useRef<number>();
  const exitTimeout = useRef<number>();

  useEffect(() => {
    if (show) {
      clearTimeout(enterTimeout.current);
    } else {
      clearTimeout(exitTimeout.current);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {(show || !unmount) && (
        <TransitionContent
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          in={show}
          initial={initial}
          {...props}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  );
};

interface TransitionContentProps extends TransitionProps {
  enterTimeout: React.MutableRefObject<number | undefined>;
  exitTimeout: React.MutableRefObject<number | undefined>;
  in: boolean;
}

const TransitionContent: React.FC<TransitionContentProps> = ({
  children,
  timeout = 0,
  enterTimeout,
  exitTimeout,
  onEnter,
  onEntered,
  onExit,
  onExited,
  initial,
  nodeRef: defaultNodeRef,
  in: show,
}) => {
  const [status, setStatus] = useState(initial ? 'exited' : 'entered');
  const [isPresent, safeToRemove] = usePresence();
  const [hasEntered, setHasEntered] = useState(!initial);
  const splitTimeout = typeof timeout === 'object';
  const internalNodeRef = useRef<HTMLElement>(null);
  const nodeRef = defaultNodeRef || internalNodeRef;
  const visible = hasEntered && show ? isPresent : false;

  useEffect(() => {
    if (hasEntered || !show) return;

    const actualTimeout = splitTimeout ? timeout.enter : (timeout as number);

    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);

    setHasEntered(true);
    setStatus('entering');
    onEnter?.();

    // Force reflow
    nodeRef.current?.offsetHeight;

    enterTimeout.current = window.setTimeout(() => {
      setStatus('entered');
      onEntered?.();
    }, actualTimeout);
  }, [onEnter, onEntered, timeout, status, show, enterTimeout, hasEntered, nodeRef, splitTimeout]);

  useEffect(() => {
    if (isPresent && show) return;

    const actualTimeout = splitTimeout ? timeout.exit : (timeout as number);

    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);

    setStatus('exiting');
    onExit?.();

    // Force reflow
    nodeRef.current?.offsetHeight;

    exitTimeout.current = window.setTimeout(() => {
      setStatus('exited');
      safeToRemove?.();
      onExited?.();
    }, actualTimeout);
  }, [isPresent, onExit, safeToRemove, timeout, onExited, show, exitTimeout, nodeRef, splitTimeout]);

  return children({ visible, status, nodeRef });
};
