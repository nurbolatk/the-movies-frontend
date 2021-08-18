/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'

export function FullPageErrorFallback({ error }) {
  const theme = useTheme()

  return (
    <div
      role="alert"
      css={{
        color: theme.colors.textColorDark,
        height: '100vh',
        fontFamily: theme.font.body,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>
        Uh oh... There's a problem. Try refreshing the app or navigating to <Link to="/">Home</Link>{' '}
        and refreshing the app
      </p>
      <pre
        css={{
          color: theme.colors.red,
        }}
      >
        {error.message}
      </pre>
    </div>
  )
}
