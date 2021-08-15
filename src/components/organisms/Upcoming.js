/** @jsxImportSource @emotion/react */

import React from 'react'
import { api } from 'utils/api'
import { HorizontalMovieList } from 'components/molecules/HorizontalMovieList'

export function Upcoming() {
  const fetchUpcomingMovies = React.useCallback(
    () =>
      api(
        'movie/upcoming',
        {
          queryParams: {
            page: 1,
          },
        },
        true,
      ),
    [],
  )

  return <HorizontalMovieList title="Upcoming" fetchFunction={fetchUpcomingMovies} />
}
