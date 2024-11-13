import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  ReactNode,
  KeyboardEvent,
  RefObject,
} from "react";
import { VisuallyHidden } from "~/components/visually-hidden";
import { cssProps } from "~/utils/style";
import styles from "./segmented-control.module.css";

// Custom interface for the SegmentedControl component props
interface SegmentedControlProps {
  children: ReactNode;
  currentIndex: number;
  onChange: (index: number) => void;
  label: string;
  [key: string]: any;
}

interface IndicatorProps {
  width: number;
  left: number;
}

const SegmentedControlContext = createContext<{
  optionRefs: RefObject<HTMLButtonElement>[];
  currentIndex: number;
  onChange: (index: number) => void;
  registerOption: (optionRef: RefObject<HTMLButtonElement>) => void;
  unRegisterOption: (optionRef: RefObject<HTMLButtonElement>) => void;
} | null>(null);

export const SegmentedControl = ({
  children,
  currentIndex,
  onChange,
  label,
  ...props
}: SegmentedControlProps) => {
  const id = useId();
  const labelId = `${id}-segmented-control-label`;
  const optionRefs = useRef<RefObject<HTMLButtonElement>[]>([]);
  const [indicator, setIndicator] = useState<IndicatorProps | undefined>();

  const handleKeyDown = (event: KeyboardEvent) => {
    const { length } = optionRefs.current;
    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;

    if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      onChange(prevIndex);
      optionRefs.current[prevIndex]?.current?.focus();
    } else if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      onChange(nextIndex);
      optionRefs.current[nextIndex]?.current?.focus();
    }
  };

  const registerOption = useCallback(
    (optionRef: RefObject<HTMLButtonElement>) => {
      optionRefs.current = [...optionRefs.current, optionRef];
    },
    []
  );

  const unRegisterOption = useCallback(
    (optionRef: RefObject<HTMLButtonElement>) => {
      optionRefs.current = optionRefs.current.filter(
        (ref) => ref !== optionRef
      );
    },
    []
  );

  useEffect(() => {
    const currentOption = optionRefs.current[currentIndex]?.current;

    if (!currentOption) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = currentOption.getBoundingClientRect();
      const left = currentOption.offsetLeft;
      setIndicator({ width: rect.width, left });
    });

    resizeObserver.observe(currentOption);

    return () => {
      resizeObserver.disconnect();
    };
  }, [currentIndex]);

  return (
    <SegmentedControlContext.Provider
      value={{
        optionRefs: optionRefs.current,
        currentIndex,
        onChange,
        registerOption,
        unRegisterOption,
      }}
    >
      <div
        className={styles.container}
        role="radiogroup"
        tabIndex={0}
        aria-labelledby={labelId}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <VisuallyHidden as="label" id={labelId}>
          {label}
        </VisuallyHidden>
        <div className={styles.options}>
          {!!indicator && (
            <div
              className={styles.indicator}
              data-last={currentIndex === optionRefs.current.length - 1}
              style={cssProps({}, indicator)}
            />
          )}
          {children}
        </div>
      </div>
    </SegmentedControlContext.Provider>
  );
};

interface SegmentedControlOptionProps {
  children: ReactNode;
  [key: string]: any;
}

export const SegmentedControlOption = ({
  children,
  ...props
}: SegmentedControlOptionProps) => {
  const context = useContext(SegmentedControlContext);

  if (!context) {
    throw new Error(
      "SegmentedControlOption must be used within a SegmentedControl"
    );
  }

  const {
    optionRefs,
    currentIndex,
    onChange,
    registerOption,
    unRegisterOption,
  } = context;
  const optionRef = useRef<HTMLButtonElement>(null);
  const index = optionRefs.indexOf(optionRef);
  const isSelected = currentIndex === index;

  useEffect(() => {
    registerOption(optionRef);

    return () => {
      unRegisterOption(optionRef);
    };
  }, [registerOption, unRegisterOption]);

  return (
    <button
      className={styles.button}
      tabIndex={isSelected ? 0 : -1}
      role="radio"
      aria-checked={isSelected}
      onClick={() => onChange(index)}
      ref={optionRef}
      {...props}
    >
      {children}
    </button>
  );
};
