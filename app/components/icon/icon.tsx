import { classes } from '~/utils/style';
import styles from './icon.module.css';
import { forwardRef, SVGProps } from 'react';
import sprites from './icons.svg';

// Define the props for the Icon component
interface IconProps extends SVGProps<SVGSVGElement> {
  icon: string;      // The name of the icon from the sprite
  className?: string; // Optional className for custom styles
  size?: number;     // Optional size for the icon (width and height)
}

// Define the Icon component with forwardRef
const Icon = forwardRef<SVGSVGElement, IconProps>(({ icon, className, size, ...rest }, ref) => {
  return (
    <svg
      aria-hidden
      ref={ref}
      className={classes(styles.icon, className)}
      width={size || 24}
      height={size || 24}
      {...rest}
    >
      <use href={`${sprites}#${icon}`} />
    </svg>
  );
});

export default Icon;
