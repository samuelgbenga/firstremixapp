import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme';
import { Transition } from '~/components/transition';
import { useRef, useState, useEffect } from 'react';
import styles from './code.module.css';

interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  className?: string;
}

export const Code: React.FC<CodeProps> = (props) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const elementRef = useRef<HTMLPreElement>(null);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);
  const lang = props.className?.split('-')[1];

  const handleCopy = () => {
    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
    }
    if (elementRef.current) {
      navigator.clipboard.writeText(elementRef.current.textContent || '');
      setCopied(true);

      copyTimeout.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);

  return (
    <div className={styles.code} data-theme={theme}>
      {!!lang && (
        <Text secondary size="s" className={styles.lang}>
          {lang}
        </Text>
      )}
      <pre ref={elementRef} {...props} />
      <div className={styles.actions}>
        <Button iconOnly onClick={handleCopy} aria-label="Copy">
          <span className={styles.copyIcon}>
            <Transition in={!copied}>
              {({ visible }) => (
                <Icon  icon="copy" data-visible={visible} />
              )}
            </Transition>
            <Transition in={copied}>
              {({ visible }) => (
                <Icon icon="check" data-visible={visible} />
              )}
            </Transition>
          </span>
        </Button>
      </div>
    </div>
  );
};
