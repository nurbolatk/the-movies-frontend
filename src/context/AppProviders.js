import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from 'context/AuthProvider'
import { ErrorBoundary } from 'react-error-boundary'
import 'context/styles'
import { AppGlobalStyles, theme } from 'context/styles'
import { FullPageErrorFallback } from 'components/molecules/FullPageErrorFallback'

const queryClient = new QueryClient()

export function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme.light}>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AppGlobalStyles>
              <AuthProvider>{children}</AuthProvider>
            </AppGlobalStyles>
          </Router>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
