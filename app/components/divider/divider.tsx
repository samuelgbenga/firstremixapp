import { CSSProperties, HTMLProps } from "react";
import { classes, cssProps, numToMs } from "~/utils/style";
import styles from "./divider.module.css";

// Define the types for the Divider component props
interface DividerProps extends HTMLProps<HTMLDivElement> {
  lineWidth?: string | number;
  lineHeight?: string | number;
  notchWidth?: string | number;
  notchHeight?: string | number;
  collapseDelay?: number;
  collapsed?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Divider = ({
  lineWidth = "100%",
  lineHeight = "2px",
  notchWidth = "90px",
  notchHeight = "10px",
  collapseDelay = 0,
  collapsed = false,
  className,
  style,
  ...rest
}: DividerProps) => (
  <div
    className={classes(styles.divider, className)}
    style={cssProps(
      {
        lineWidth: lineWidth,
        lineHeight: lineHeight,
        notchWidth: notchWidth,
        notchHeight: notchHeight,
        collapseDelay: numToMs(collapseDelay),
      },
      style
    )}
    {...rest}
  >
    <div className={styles.line} data-collapsed={collapsed} />
    <div
      className={styles.notch}
      data-collapsed={collapsed}
      style={cssProps({ collapseDelay: numToMs(collapseDelay + 160) }, {})}
    />
  </div>
);
