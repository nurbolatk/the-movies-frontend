/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { ButtonIcon, Container } from 'components/atoms'
import { AuthModal } from './AuthModal'
import { BsX } from 'react-icons/bs'
import { Navbar } from 'components/molecules/Navbar'
import { mq } from 'context/styles'

export function Header() {
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
          position: 'relative',
        }}
      >
        <Link
          to="/"
          css={{
            fontFamily: theme.font.title,
            fontSize: '3rem',
            marginRight: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          the movies
        </Link>
        <Navbar>
          <ButtonIcon
            css={{
              position: 'absolute',
              top: '2%',
              transform: '0.3s',
              right: '5%',
              display: 'none',
              [mq.extraSmall]: {
                display: 'block',
              },
            }}
          >
            <BsX />
          </ButtonIcon>
          <AuthModal />
        </Navbar>
      </Container>
    </div>
  )
}
