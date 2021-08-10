/** @jsxImportSource @emotion/react */

import { BrowseByGenre } from '../components/BrowseByGenre'
import { Container } from '../components/lib'
import { NowPlaying } from '../components/NowPlaying'
import { Popular } from '../components/PopularMovies'
import { SearchForm } from '../components/SearchForm'
import { Upcoming } from '../components/Upcoming'

export function Home() {
  return (
    <Container
      css={{
        margin: '3rem auto',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '3rem',
      }}
    >
      <SearchForm />
      <BrowseByGenre />
      <NowPlaying />
      <Popular />
      <Upcoming />
    </Container>
  )
}
