/** @jsxImportSource @emotion/react */

import { Container } from '../components/lib'
import TopUpcoming from '../components/TopUpcoming'

export function Home() {
  return (
    <Container
      css={{
        margin: '3rem auto',
      }}
    >
      <h4>Top movies</h4>

      <TopUpcoming />
      <h6>Browse by genre</h6>
    </Container>
  )
}
