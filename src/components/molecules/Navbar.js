/** @jsxImportSource @emotion/react */

import React from 'react'

import { ButtonIcon } from 'components/atoms'
import { mq } from 'context/styles'
import { BiMenu } from 'react-icons/bi'
import { callAll } from 'utils/callAll'
import { useTheme } from '@emotion/react'

export function Navbar({ children }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const theme = useTheme()

  function toggleMenu(e) {
    setMenuOpen(!menuOpen)
  }

  function closeMenu(e) {
    setMenuOpen(false)
  }
  return (
    <>
      <ButtonIcon
        css={{
          display: 'none',
          [mq.extraSmall]: {
            display: 'flex',
          },
        }}
        onClick={toggleMenu}
      >
        <BiMenu />
      </ButtonIcon>

      <nav
        onClick={closeMenu}
        css={{
          display: 'flex',
          columnGap: '2rem',
          rowGap: '2rem',
          right: 0,
          top: 0,

          [mq.extraSmall]: {
            flexDirection: 'column',
            backgroundColor: menuOpen ? 'rgba(0,0,0,0.3)' : 'transparent',
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: 100,
            transition: '0.3s',
            pointerEvents: menuOpen ? 'all' : 'none',
          },
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '2rem',

            [mq.extraSmall]: {
              alignSelf: 'flex-end',
              width: '80%',
              flex: 1,
              backgroundColor: theme.colors.bgLight,
              transition: '0.3s',
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              flexDirection: 'column',
              rowGap: '2rem',
              padding: '4rem',
              paddingTop: '14rem',
            },
          }}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { onClick: callAll(child.props.onClick, closeMenu) })
          })}
        </div>
      </nav>
    </>
  )
}
