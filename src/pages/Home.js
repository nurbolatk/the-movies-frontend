/** @jsxImportSource @emotion/react */

import { BrowseByGenre } from '../components/BrowseByGenre'
import { Container } from '../components/lib'
import { NowPlaying } from '../components/NowPlaying'
import { Popular } from '../components/PopularMovies'
import { Upcoming } from '../components/Upcoming'

export function Home() {
  return (
    <Container
      css={{
        margin: '3rem auto',
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '3rem',
        }}
      >
        <BrowseByGenre />
        <NowPlaying />
        <Popular />
        <Upcoming />
      </div>
    </Container>
  )
}
