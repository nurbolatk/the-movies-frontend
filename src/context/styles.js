import { css, Global, useTheme } from '@emotion/react'
import '@reach/dialog/styles.css'

export const colors = {
  blue: '#2c8ef8',
  indigo: '#727cf5',
  indigoDark: '#606bdf',
  purple: '#6b5eae',
  pink: '#ff679b',
  red: '#fa5c7c',
  orange: '#fd7e14',
  yellow: '#ffbc00',
  green: '#0acf97',
  teal: '#02a8b5',
  cyan: '#39afd1',
  white: '#ffffff',
  grayLight: '#dee2e6',
  gray: '#98a6ad',
  grayDarker: '#6c757d',
  grayDarkest: '#343a40',
}

export const theme = {
  light: {
    colors: {
      ...colors,
      primary: colors.indigo,
      primaryDark: colors.indigoDark,
      border: colors.grayLight,
      secondary: colors.grayDarkest,
    },
  },
}

export function AppGlobalStyles({ children }) {
  const theme = useTheme()

  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap');

          :root {
            font-size: 62.5%;
            box-sizing: border-box;
          }

          *,
          *::after,
          *::before {
            margin: 0;
            padding: 0;
            box-sizing: inherit;
          }

          body {
            font-size: 1.6rem;
            font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
              Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: ${theme.colors.secondary};
          }

          button,
          input {
            outline: none;
            font: inherit;
            color: inherit;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 1rem 0;
            font-weight: 700;
            line-height: 1.1;
          }

          h1 {
            font-size: calc(3.5rem + 1.2vw);
          }

          h2 {
            font-size: calc(2.5rem + 1vw);
          }

          h3 {
            font-size: calc(2rem + 0.5vw);
          }

          h4 {
            font-size: calc(1.9rem);
          }

          h5 {
            font-size: calc(1.6rem);
          }

          h6 {
            font-size: calc(1.2rem);
          }
        `}
      />

      {children}
    </>
  )
}
