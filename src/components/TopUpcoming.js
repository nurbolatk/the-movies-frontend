/** @jsxImportSource @emotion/react */

import React from 'react'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'

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
        {data?.results?.map((movie) => {
          return (
            <div
              css={{
                flex: '0 0 220px',
                width: '220px',
                height: '330px',
              }}
            >
              <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
