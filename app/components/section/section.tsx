import { forwardRef, ReactNode, ElementType } from 'react';
import { classes } from '~/utils/style';
import styles from './section.module.css';

// Define the type for the props of the Section component
interface SectionProps {
  as?: ElementType; // The type for the 'as' prop, which allows rendering a different HTML element
  children: ReactNode; // The children that will be rendered inside the component
  className?: string; // Optional className for additional styling
  [key: string]: any; // This allows other props to be passed down (e.g., data attributes, event handlers)
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classes(styles.section, className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
);
