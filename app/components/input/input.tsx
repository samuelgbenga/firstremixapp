import { useId, useRef, useState, FocusEvent, ChangeEvent, CSSProperties } from "react";
import { Icon } from "~/components/icon";
import { Transition } from "~/components/transition";
import { classes, cssProps, msToNum } from "~/utils/style";
import { TextArea } from "./text-area";
import styles from "./input.module.css";
import { tokens } from "../theme/theme";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  value?: string;
  multiline?: boolean;
  className?: string;
  style?: CSSProperties;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
  type?: string;
  name?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = ({
  id,
  label,
  value,
  multiline,
  className,
  style,
  error,
  onBlur,
  autoComplete,
  required,
  maxLength,
  type,
  name,
  onChange,
  ...rest
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const errorRef = useRef<HTMLDivElement>(null);
  const inputId = id || `${generatedId}input`;
  const labelId = `${inputId}-label`;
  const errorId = `${inputId}-error`;
  const InputElement = multiline ? TextArea : "input";

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div
      className={classes(styles.container, className)}
      data-error={!!error}
      style={style}
      {...rest}
    >
      <div className={styles.content}>
        <label
          className={styles.label}
          data-focused={focused}
          data-filled={!!value}
          id={labelId}
          htmlFor={inputId}
        >
          {label}
        </label>
        <InputElement
          className={styles.input}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          type={type}
          name={name}
        />
        <div className={styles.underline} data-focused={focused} />
      </div>
      <Transition unmount in={!!error} timeout={msToNum(tokens.base.durationM)}>
        {({ visible, nodeRef }) => (
          <div
            ref={nodeRef}
            className={styles.error}
            data-visible={visible}
            id={errorId}
            role="alert"
            style={cssProps({
              height: visible ? errorRef.current?.getBoundingClientRect().height : 0,
            }, {})}
          >
            <div className={styles.errorMessage} ref={errorRef}>
              <Icon icon="error" />
              {error}
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};
