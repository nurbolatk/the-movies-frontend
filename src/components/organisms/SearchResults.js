import React from 'react'

import { Card, Container } from 'components/atoms'
import { useAsync } from 'hooks/useAsync'
import { useQueryParams } from 'hooks/useQueryParams'
import { api } from 'utils/api'
import { MovieList } from 'components/molecules/MovieList'
import { SearchForm } from 'components/molecules/SearchForm'

export function SearchResults() {
  const queryParamsHandler = useQueryParams()
  const [queryParams, setQueryParams] = React.useState(queryParamsHandler.entries().next().value)
  const { data, run, isLoading, isError, error } = useAsync()

  const isSearch = queryParams[0] === 'query'
  const isFilterByGenre = queryParams[0] === 'with_genres'

  React.useEffect(() => {
    const endpoint = isSearch ? 'search/movie' : isFilterByGenre ? 'discover/movie' : queryParams[0]
    run(
      api(
        endpoint,
        {
          queryParams: {
            [queryParams[0]]: queryParams[1],
            page: 1,
          },
        },
        true,
      ),
    )
  }, [isFilterByGenre, isSearch, run])

  console.log({ data })

  return (
    <Container>
      <Card>
        {isSearch && <SearchForm />}
        <MovieList movies={data ?? []} />
      </Card>
    </Container>
  )
}
