import GothamBoldItalic from "~/assets/fonts/gotham-bold-italic.woff2";
import GothamBold from "~/assets/fonts/gotham-bold.woff2";
import GothamBookItalic from "~/assets/fonts/gotham-book-italic.woff2";
import GothamBook from "~/assets/fonts/gotham-book.woff2";
import GothamMediumItalic from "~/assets/fonts/gotham-medium-italic.woff2";
import GothamMedium from "~/assets/fonts/gotham-medium.woff2";
import IPAGothic from "~/assets/fonts/ipa-gothic.woff2";
import React, { createContext, useContext, ReactNode, FC } from "react";
import { classes, media } from "~/utils/style";
import { themes, tokens } from "./theme";

// Define ThemeContext type
interface ThemeContextType {
  theme: string;
  toggleTheme?: () => void;
}

// Define props for ThemeProvider component
interface ThemeProviderProps {
  theme?: string;
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  toggleTheme?: () => void;
  [key: string]: any;
}

// Create ThemeContext with default values
export const ThemeContext = createContext<ThemeContextType>({ theme: "dark" });

// ThemeProvider component for providing theme context
export const ThemeProvider: FC<ThemeProviderProps> = ({
  theme = "dark",
  children,
  className,
  as: Component = "div",
  toggleTheme,
  ...rest
}) => {
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme.theme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: toggleTheme || parentTheme.toggleTheme,
      }}
    >
      {isRootProvider && children}
      {!isRootProvider && (
        <Component className={classes(className)} data-theme={theme} {...rest}>
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};

// useTheme hook for accessing the theme context
export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}

// Removes extra spaces and newlines from style strings
export function squish(styles: string): string {
  return styles.replace(/\s\s+/g, " ");
}

// Converts theme token objects to CSS custom property strings
export function createThemeProperties(
  theme: Record<string, string | number>
): string {
  return squish(
    Object.keys(theme)
      .map((key) => `--${key}: ${theme[key]};`)
      .join("\n\n")
  );
}

// Converts theme tokens into a React CSSProperties object
export function createThemeStyleObject(
  theme: Record<string, string | number>
): React.CSSProperties {
  const style: React.CSSProperties = {} as React.CSSProperties;

  for (const key of Object.keys(theme)) {
    (style as any)[`--${key}`] = theme[key];
  }

  return style;
}

// Generates media queries for tokens based on viewport sizes
export function createMediaTokenProperties(): string {
  return squish(
    (Object.keys(media) as Array<keyof typeof media>)
      .map((key) => {
        return `
        @media (max-width: ${media[key]}px) {
          :root {
            ${createThemeProperties(tokens[key])}
          }
        }
      `;
      })
      .join("\n")
  );
}

// CSS layers definition for organization
const layerStyles = squish(`
  @layer theme, base, components, layout;
`);

// Base token styles and media token properties for root element
const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  [data-theme='dark'] {
    ${createThemeProperties(themes.dark)}
  }

  [data-theme='light'] {
    ${createThemeProperties(themes.light)}
  }
`);

// Font-face definitions for different fonts and weights
const fontStyles = squish(`
  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${GothamBook}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${GothamBookItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${GothamMedium}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${GothamMediumItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${GothamBold}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${GothamBoldItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: IPA Gothic;
    font-weight: 400;
    src: url(${IPAGothic}) format('woff2');
    font-display: swap;
    font-style: normal;
  }
`);

// Consolidates all theme styles into a single exportable string
export const themeStyles = squish(`
  ${layerStyles}

  @layer theme {
    ${tokenStyles}
    ${fontStyles}
  }
`);
