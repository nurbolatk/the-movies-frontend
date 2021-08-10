/** @jsxImportSource @emotion/react */

import { BrowseByGenre } from '../components/BrowseByGenre'
import { Container } from '../components/lib'
import { NowPlaying } from '../components/NowPlaying'
import { Popular } from '../components/PopularMovies'
import {TopUpcoming} from '../components/TopUpcoming'

export function Home() {
  return (
    <Container
      css={{
        margin: '3rem auto',
      }}
    >
      <NowPlaying />
      <Popular />
      <TopUpcoming />
      <BrowseByGenre />
    </Container>
  )
}
