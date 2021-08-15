import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from 'context/AuthProvider'
import 'context/styles'
import { AppGlobalStyles, theme } from 'context/styles'

const queryClient = new QueryClient()

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>
        <Router>
          <AppGlobalStyles>
            <AuthProvider>{children}</AuthProvider>
          </AppGlobalStyles>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
