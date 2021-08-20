import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from 'context/AuthProvider'
import { ErrorBoundary } from 'react-error-boundary'
import 'context/styles'
import { AppGlobalStyles, theme } from 'context/styles'
import { FullPageErrorFallback } from 'components/molecules/FullPageErrorFallback'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
  },
})

export function AppProviders({ children }) {
  return (
    <Router>
      <ThemeProvider theme={theme.light}>
        <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <AppGlobalStyles>
              <AuthProvider>{children}</AuthProvider>
            </AppGlobalStyles>
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  )
}
