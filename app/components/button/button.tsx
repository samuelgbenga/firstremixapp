import { Icon } from '~/components/icon';
import { Loader } from '~/components/loader';
import { Transition } from '~/components/transition';
import { Link } from '@remix-run/react';
import { forwardRef, ReactNode, HTMLProps } from 'react';
import { classes } from '~/utils/style';
import styles from './button.module.css';

// Utility function to check if the link is external
function isExternalLink(href?: string): boolean {
  return href?.includes('://') || false;
}

// Define the ButtonProps type, including all possible props
interface ButtonProps extends HTMLProps<HTMLAnchorElement | HTMLButtonElement> {
  href?: string;
  secondary?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: string;
  iconEnd?: string;
  iconHoverShift?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  rel?: string;
  target?: string;
  disabled?: boolean;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any; // Allow additional props
}

// Button component that decides between a regular button and a link
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ href, ...rest }, ref) => {
    if (isExternalLink(href) || !href) {
      return <ButtonContent href={href} ref={ref} {...rest} />;
    }

    return (
      <ButtonContent
        unstable_viewTransition
        as={Link}
        prefetch="intent"
        to={href}
        ref={ref}
        {...rest}
      />
    );
  }
);

// Define the ButtonContentProps type
interface ButtonContentProps extends ButtonProps {
  as?: keyof JSX.IntrinsicElements;
  icon?: string;
  iconEnd?: string;
  iconHoverShift?: boolean;
  iconOnly?: boolean;
  loadingText?: string;
  loading?: boolean;
}

const ButtonContent = forwardRef<HTMLAnchorElement | HTMLButtonElement  , ButtonContentProps>(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-icon={icon}
        href={href}
        rel={rel || isExternal ? 'noopener noreferrer' : undefined}
        target={target || isExternal ? '_blank' : undefined}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        <Transition unmount in={loading}>
          {({ visible, nodeRef }) => (
            <Loader
              ref={nodeRef}
              className={styles.loader}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  }
);

export { Button };
