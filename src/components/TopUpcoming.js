/** @jsxImportSource @emotion/react */

import React from 'react'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'
import { Spinner } from './lib'
import { MovieList } from './MovieList'

export default function TopUpcoming() {
  const { data, isLoading, isError, error, run } = useAsync()
  console.log(data)
  React.useEffect(() => {
    run(api('movie/upcoming', {}, true))
  }, [run])

  return (
    <div>
      <h4>
        Top Upcoming ({data?.dates?.minimum} - {data?.dates?.maximum})
      </h4>
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
