/** @jsxImportSource @emotion/react */
import { Footer } from 'components/molecules/Footer'
import { Header } from 'components/organisms/Header'
import { AppRoutes } from 'context/AppRoutes'

function App() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '3rem',
      }}
    >
      <Header />
      <div
        css={{
          flex: '1',
        }}
      >
        <AppRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App
