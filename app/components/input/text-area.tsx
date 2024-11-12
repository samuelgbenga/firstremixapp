import { useEffect, useRef, useState, ChangeEvent, CSSProperties } from "react";
import { classes, cssProps } from "~/utils/style";
import styles from "./text-area.module.css";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  minRows?: number;
  maxRows?: number;
  style?: CSSProperties;
}

export const TextArea = ({
  className,
  resize = "none",
  value,
  onChange,
  minRows = 1,
  maxRows,
  ...rest
}: TextAreaProps) => {
  const [rows, setRows] = useState(minRows);
  const [textareaDimensions, setTextareaDimensions] = useState<{
    lineHeight: number;
    paddingHeight: number;
  }>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const style = getComputedStyle(textareaRef.current);
      const lineHeight = parseInt(style.lineHeight, 10);
      const paddingHeight =
        parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10);
      setTextareaDimensions({ lineHeight, paddingHeight });
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
     // Call onChange only if it is defined
     if (onChange) {
        onChange(event);
      }

    if (textareaDimensions) {
      const { lineHeight, paddingHeight } = textareaDimensions;
      const previousRows = event.target.rows;
      event.target.rows = minRows;

      const currentRows = Math.floor((event.target.scrollHeight - paddingHeight) / lineHeight);

      if (currentRows === previousRows) {
        event.target.rows = currentRows;
      }

      if (maxRows && currentRows >= maxRows) {
        event.target.rows = maxRows;
        event.target.scrollTop = event.target.scrollHeight;
      }

      setRows(maxRows && currentRows > maxRows ? maxRows : currentRows);
    }
  };

  return (
    <textarea
      className={classes(styles.textarea, className)}
      ref={textareaRef}
      onChange={handleChange}
      style={cssProps({ resize }, {})}
      rows={rows}
      value={value}
      {...rest}
    />
  );
};
