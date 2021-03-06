/** @jsxImportSource @emotion/react */
import React from 'react'

import { BrowseByGenre } from 'components/organisms/BrowseByGenre'
import { Container } from 'components/atoms'
import { NowPlaying } from 'components/organisms/NowPlaying'
import { Popular } from 'components/organisms/PopularMovies'
import { Upcoming } from 'components/organisms/Upcoming'
import { SearchForm } from 'components/molecules/SearchForm'

export function Home() {
  return (
    <Container
      css={{
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
