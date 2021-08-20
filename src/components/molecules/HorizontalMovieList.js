/** @jsxImportSource @emotion/react */

import React from 'react'
import { ErrorMessage } from 'components/atoms'
import { MovieList } from 'components/molecules/MovieList'
import { useMoviesByCategory } from 'hooks/movies'

export function HorizontalMovieList({ title, listId }) {
  const { data, isError, error } = useMoviesByCategory(listId)

  return (
    <div>
      <h4>{title}</h4>
      <div
        css={{
          display: 'flex',
          overflowX: 'auto',
          columnGap: '2rem',
        }}
      >
        {isError && <ErrorMessage error={error} />}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  )
}
