/** @jsxImportSource @emotion/react */

import React from 'react'
import { Spinner } from 'components/atoms'
import { useAsync } from 'hooks/useAsync'
import { api } from 'utils/api'
import { GenresList } from 'components/molecules/GenresList'

export function BrowseByGenre({ setGenre }) {
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
        <GenresList handleGenreChange={setGenre} genres={data?.genres} />
      </div>
    </div>
  )
}
