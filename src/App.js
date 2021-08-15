/** @jsxImportSource @emotion/react */
import { Footer } from 'components/molecules/Footer'
import { Navbar } from 'components/organisms/Navbar'
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
      <Navbar />
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
