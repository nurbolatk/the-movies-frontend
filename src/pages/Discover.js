/** @jsxImportSource @emotion/react */

import React from 'react'

import { Container, ErrorMessage } from 'components/atoms'
import { useParams } from 'react-router-dom'
import { useMovieSearch } from 'hooks/movies'
import { MovieRow } from 'components/molecules/MovieRow'
import { useTheme } from '@emotion/react'
import { SearchForm } from 'components/molecules/SearchForm'

export function Discover() {
  const { query } = useParams()
  const theme = useTheme()
  const { movies, error, isError, isSuccess } = useMovieSearch(query ?? '')

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
      {isError && <ErrorMessage error={error} />}
      {isSuccess && movies?.results.length === 0 && <p>No movies found with query "{query}"</p>}
      {movies?.results?.length ? (
        <div
          css={{
            marginTop: '2rem',
          }}
        >
          {movies.results.map((movie) => (
            <MovieRow key={movie.id} movie={movie} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}
