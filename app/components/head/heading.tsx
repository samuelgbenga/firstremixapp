import { Fragment, ReactNode, ElementType } from "react";
import { classes } from "~/utils/style";
import styles from "./heading.module.css";

interface HeadingProps<T extends React.ElementType> {
  children: ReactNode;
  level?: number;
  as?: T; // This allows the `as` prop to be any valid React component or element type
  align?: "auto" | "start" | "center" | "end";
  weight?: "auto" | "light" | "bold" | "medium" | "regular";
  className?: string;
}

export const Heading = <T extends React.ElementType>({
  children,
  level = 1,
  as,
  align = "auto",
  weight = "medium",
  className,
  ...rest
}: HeadingProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const clampedLevel = Math.min(Math.max(level, 0), 5);
  const Component = as || (`h${Math.max(clampedLevel, 1)}` as ElementType);

  return (
    <Fragment>
      <Component
        className={classes(styles.heading, className)}
        data-align={align}
        data-weight={weight}
        data-level={clampedLevel}
        {...rest}
      >
        {children}
      </Component>
    </Fragment>
  );
};
