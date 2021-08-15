/** @jsxImportSource @emotion/react */

import React from 'react'
import { api } from 'utils/api'
import { HorizontalMovieList } from 'components/molecules/HorizontalMovieList'

export function NowPlaying() {
  const fetchNowPlayingMovies = React.useCallback(
    () =>
      api(
        'movie/now_playing',
        {
          queryParams: {
            page: 1,
          },
        },
        true,
      ),
    [],
  )
  return <HorizontalMovieList title="Now Playing" fetchFunction={fetchNowPlayingMovies} />
}
