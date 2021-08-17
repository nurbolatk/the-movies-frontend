import { css, Global, useTheme } from '@emotion/react'
import '@reach/dialog/styles.css'
import '@reach/tooltip/styles.css'

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

export const mq = {
  large: '@media (min-width: 1200px)',
  medium: '@media (min-width: 992px) and (max-width: 1199px)',
  small: '@media (min-width: 696px) and (max-width: 991px)',
  extraSmall: '@media (max-width: 695px)',
}

export const theme = {
  light: {
    colors: {
      ...colors,
      primary: colors.indigo,
      primaryDark: colors.indigoDark,
      border: colors.grayLight,
      secondary: colors.grayDarkest,
      bgLight: colors.white,
    },
    font: {
      title: '"Squada One", cursive',
      body: `'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
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
          @import url('https://fonts.googleapis.com/css2?family=Squada+One&display=swap');

          :root {
            font-size: 62.5%;
            box-sizing: border-box;
            height: 100%;
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
            font-family: ${theme.font.body};
            line-height: 1.6;
            color: ${theme.colors.secondary};
            height: 100%;
          }

          #root {
            height: 100vh;
          }

          button {
            background: none;
            &:hover {
              cursor: pointer;
            }
            transition: all 0.2s;
          }

          button,
          input {
            border: none;
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
            font-weight: 400;
          }

          h5 {
            font-size: calc(1.6rem);
            /* font-weight: 400; */
          }

          h6 {
            font-size: calc(1.2rem);
            /* font-weight: 400; */
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          img {
            display: block;
            width: 100%;
          }
        `}
      />

      {children}
    </>
  )
}
