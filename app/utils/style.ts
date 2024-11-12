/**
 * Concatenate classNames together
 */
export function classes(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
/**
 * Convert a number to an ms string
 */
export const numToMs = (num: number): string => `${num}ms`;


/**
 * Convert a number to a px string
 */
export const numToPx = (num: number) :string  => `${num}px`;


type CSSValue = string | number | undefined;

interface CSSProps {
  [key: string]: CSSValue;
}

export function cssProps(props: CSSProps , style: React.CSSProperties | undefined ): CSSProps {
  let result: CSSProps = {};

  const keys = Object.keys(props);

  for (const key of keys) {
    let value = props[key];

    if (typeof value === 'number' && key === 'delay') {
      value = numToMs(value); // Assuming numToMs converts number to a string with 'ms' suffix
    }

    if (typeof value === 'number' && key !== 'opacity') {
      value = numToPx(value); // Assuming numToPx converts number to a string with 'px' suffix
    }

    if (typeof value === 'number' && key === 'opacity') {
      value = `${value * 100}%`; // Convert opacity to percentage string
    }

    result[`--${key}`] = value;
  }

  return { ...result, ...style };
}


/**
 * Convert pixel values to rem for a11y
 */
export const pxToRem = (px: number) :string  => `${px / 16}rem`;


/**
 * Media query breakpoints
 */
export const media = {
    desktop: 2080,
    laptop: 1680,
    tablet: 1040,
    mobile: 696,
    mobileS: 400,
  };


  /**
 * Convert ms token values to a raw numbers for ReactTransitionGroup
 * Transition delay props
 */
export const msToNum = (msString: string) : number => Number(msString.replace('ms', ''));
