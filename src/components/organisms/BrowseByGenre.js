/** @jsxImportSource @emotion/react */

import React from 'react'
import { Spinner } from 'components/atoms'
import { GenresList } from 'components/molecules/GenresList'
import { useGenres } from 'hooks/movies'

export function BrowseByGenre() {
  const { data, isLoading } = useGenres()

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
        <GenresList genres={data?.genres} />
      </div>
    </div>
  )
}
