import { useTheme } from '@emotion/react'

export function FullPageErrorFallback({ error }) {
  const theme = useTheme()

  return (
    <div
      role="alert"
      css={{
        color: theme.colors.red,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}
