import { useQuery, useQueryClient } from 'react-query'
import { api } from 'utils/api'

const queryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

export function useMovieSearch(query) {
  const queryClient = useQueryClient()

  const result = useQuery(
    ['movieSearch', { query }],
    () => api('search/movie', { queryParams: { query } }, true),
    {
      onSuccess: (data) => {
        for (const movie of data.results) {
          console.log(queryClient.getQueryData())
          queryClient.setQueryData(['movie', { movieId: movie.id }], movie, {
            queryConfig,
          })
        }
      },
    },
  )
  return { ...result, movies: result.data }
}

export function useMovie(movieId) {
  const result = useQuery(
    ['movie', { movieId }],
    () => api(`movie/${movieId}`, {}, true),
    queryConfig,
  )
  return { ...result, movie: result.data }
}

export function useGenre(genreId) {
  const result = useQuery(['genreMovies', { genreId }], () =>
    api('discover/movie', { queryParams: { with_genre: genreId, page: 1 } }, true),
  )
  return { ...result, movies: result.data }
}

export function useGenres() {
  return useQuery('genres', () => api('genre/movie/list', {}, true))
}
