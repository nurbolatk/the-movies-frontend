/** @jsxImportSource @emotion/react */

import React from 'react'
import { Button, Spinner } from '../components/lib'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'

export function BrowseByGenre() {
  const { data, run, isLoading } = useAsync()

  React.useEffect(() => {
    run(api('genre/movie/list', {}, true))
  }, [run])

  return (
    <div>
      <h4>Browse by genre</h4>
      <div
        css={{
          display: 'flex',
          columnGap: '1rem',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        {isLoading && <Spinner />}
        {data?.genres?.map((genre) => (
          <Button>{genre.name}</Button>
        ))}
      </div>
    </div>
  )
}
