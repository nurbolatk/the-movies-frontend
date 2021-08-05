import { ThemeProvider } from '@emotion/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import './styles'
import { AppGlobalStyles, theme } from './styles'

export function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme.light}>
      <Router>
        <AppGlobalStyles>
          <AuthProvider>{children}</AuthProvider>
        </AppGlobalStyles>
      </Router>
    </ThemeProvider>
  )
}
