/** @jsxImportSource @emotion/react */

import React from 'react'
import { api } from 'utils/api'
import { HorizontalMovieList } from 'components/molecules/HorizontalMovieList'

export function Popular() {
  const fetchPopularMovies = React.useCallback(
    () =>
      api(
        'movie/popular',
        {
          queryParams: {
            page: 1,
          },
        },
        true,
      ),
    [],
  )
  return <HorizontalMovieList title="Popular" fetchFunction={fetchPopularMovies} />
}
