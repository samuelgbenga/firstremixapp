import { classes } from '~/utils/style';
import styles from './text.module.css';

interface TextProps<T extends React.ElementType> {
  children: React.ReactNode;
  size?: 's' | 'm' | 'l' | 'xl';
  as?: T;
  align?: 'auto' | 'start' | 'center' | 'end';
  weight?: 'auto' | 'light' | 'bold' | 'medium' | 'regular'; 
  secondary?: boolean;
  className?: string;
}

export const Text = <T extends React.ElementType = 'span'>({
  children,
  size = 'm',
  as,
  align = 'auto',
  weight = 'auto',
  secondary = false,
  className,
  ...rest
}: TextProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as || 'span';
  return (
    <Component
      className={classes(styles.text, className)}
      data-align={align}
      data-size={size}
      data-weight={weight}
      data-secondary={secondary}
      {...rest}
    >
      {children}
    </Component>
  );
};
