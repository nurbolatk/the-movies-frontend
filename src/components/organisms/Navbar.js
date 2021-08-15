/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { Container } from 'components/atoms'
import { AuthModal } from './AuthModal'

export function Navbar() {
  const theme = useTheme()

  return (
    <div
      css={{
        minHeight: '7rem',
        backgroundColor: 'white',
        boxShadow: '0 45px 35px 0 rgb(154 161 171 / 15%)',
      }}
    >
      <Container
        css={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          columnGap: '2rem',
        }}
      >
        <Link
          to="/"
          css={{
            fontFamily: theme.font.title,
            fontSize: '3rem',
            marginRight: 'auto',
          }}
        >
          the movies
        </Link>
        <AuthModal />
      </Container>
    </div>
  )
}
