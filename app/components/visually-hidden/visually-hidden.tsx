import React, { forwardRef, ElementType, ReactNode } from 'react';
import { classes } from '~/utils/style';
import styles from './visually-hidden.module.css';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  showOnFocus?: boolean;
  as?: ElementType;
  children: ReactNode;
  visible?: boolean;
}

export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  (
    { className, showOnFocus = false, as: Component = 'span', children, visible = false, ...rest },
    ref
  ) => {
    return (
      <Component
        className={classes(styles.hidden, className)}
        data-hidden={!visible && !showOnFocus}
        data-show-on-focus={showOnFocus}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';
