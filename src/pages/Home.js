/** @jsxImportSource @emotion/react */
import React from 'react'

import { BrowseByGenre } from 'components/organisms/BrowseByGenre'
import { Container } from 'components/atoms'
import { NowPlaying } from 'components/organisms/NowPlaying'
import { Popular } from 'components/organisms/PopularMovies'
import { Upcoming } from 'components/organisms/Upcoming'
import { SearchForm } from 'components/molecules/SearchForm'
import { useHistory } from 'react-router-dom'

export function Home() {
  const history = useHistory()

  function handleQueryChange(query) {
    history.push(`discover/${query}`)
  }

  function handleGenreChange(genreId) {}

  return (
    <Container
      css={{
        margin: '3rem auto',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '3rem',
      }}
    >
      <SearchForm onSubmit={handleQueryChange} />
      <BrowseByGenre setGenre={handleGenreChange} />

      <NowPlaying />
      <Popular />
      <Upcoming />
    </Container>
  )
}
