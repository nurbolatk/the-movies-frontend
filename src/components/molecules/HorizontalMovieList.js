/** @jsxImportSource @emotion/react */

import React from 'react'
import { useAsync } from 'hooks/useAsync'
import { ErrorMessage, Spinner } from 'components/atoms'
import { MovieList } from 'components/molecules/MovieList'

export function HorizontalMovieList({ title, fetchFunction }) {
  const { data, isLoading, isError, error, run } = useAsync()

  React.useEffect(() => {
    run(fetchFunction())
  }, [run, fetchFunction])

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
        {isLoading && <Spinner />}
        {isError && <ErrorMessage error={error} />}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  )
}
