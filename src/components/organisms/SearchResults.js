import React from 'react'

import { Container } from 'components/atoms'
import { useAsync } from 'hooks/useAsync'
import { useQueryParams } from 'hooks/useQueryParams'
import { api } from 'utils/api'
import { MovieList } from 'components/molecules/MovieList'

export function SearchResults() {
  const queryParamsHandler = useQueryParams()
  const queryParams = React.useRef(queryParamsHandler.entries().next().value)
  const { data, run, isLoading, isError, error } = useAsync()

  React.useEffect(() => {
    const endpoint =
      queryParams.current[0] === 'query'
        ? 'search/movie'
        : queryParams.current[0] === 'with_genres'
        ? 'discover/movie'
        : queryParams.current[0]
    run(
      api(
        endpoint,
        {
          queryParams: {
            [queryParams.current[0]]: queryParams.current[1],
            page: 1,
          },
        },
        true,
      ),
    )
  }, [run])

  console.log({ data })

  return (
    <Container>
      <MovieList movies={data ?? []} />
    </Container>
  )
}
