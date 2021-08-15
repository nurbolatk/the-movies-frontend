/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { Container } from 'components/atoms'

export function Footer() {
  const theme = useTheme()
  return (
    <footer
      css={{
        backgroundColor: theme.colors.grayDarkest,
        color: theme.colors.white,
      }}
    >
      <Container
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '2rem',
          justifyContent: 'space-between',
          gap: '0.4rem',
          fontSize: '1.4rem',
        }}
      >
        <p>the movies. {new Date().getFullYear()}</p>
        <p>Nurbolat Kenzhekulov</p>
        <p>Made with TMDB API</p>
      </Container>
    </footer>
  )
}
