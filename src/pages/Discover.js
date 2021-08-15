/** @jsxImportSource @emotion/react */

import React from 'react'

import { Container, Spinner } from 'components/atoms'
import { useParams } from 'react-router-dom'
import { useMovieSearch } from 'hooks/movies'
import { MovieRow } from 'components/molecules/MovieRow'
import { useTheme } from '@emotion/react'
import { SearchForm } from 'components/molecules/SearchForm'

export function Discover() {
  const { query } = useParams()
  const theme = useTheme()
  const { movies, error, isLoading, isError, isSuccess } = useMovieSearch(query ?? '')

  return (
    <Container
      css={{
        background: theme.colors.bgLight,
        marginTop: '3rem',
        marginBottom: '3rem',
        padding: '1rem',
      }}
    >
      <SearchForm />
      {isLoading && <Spinner />}
      {movies?.results?.length && (
        <div
          css={{
            marginTop: '2rem',
          }}
        >
          {movies.results.map((movie) => (
            <MovieRow key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </Container>
  )
}
