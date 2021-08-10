/** @jsxImportSource @emotion/react */

import React from 'react'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'
import { Spinner } from './lib'
import { MovieList } from './MovieList'

export function Popular() {
  const { data, isLoading, isError, error, run } = useAsync()
  React.useEffect(() => {
    run(
      api(
        'movie/popular',
        {
          queryParams: {
            page: 1,
          },
        },
        true,
      ),
    )
  }, [run])

  return (
    <div>
      <h4>Popular</h4>
      <div
        css={{
          display: 'flex',
          overflowX: 'auto',
          columnGap: '2rem',
        }}
      >
        {isLoading && <Spinner />}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  )
}
