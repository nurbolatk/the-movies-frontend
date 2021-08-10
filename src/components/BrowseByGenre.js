import React from 'react'
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
      <div>
        {data?.genres?.map((genre) => (
          <div>{genre.name}</div>
        ))}
      </div>
      <div>movies</div>
    </div>
  )
}
