import { useQuery, useQueryClient } from 'react-query'
import { api } from 'utils/api'
import moviewPlaceholder from 'assets/movie-placeholder.svg'

const loadingMovie = {
  id: 'id',
  title: 'Loading...',
  poster_path: moviewPlaceholder,
  release_date: 'Loading...',
  overview: 'Loading...',
  genres: Array.from({ length: 4 }, (_, i) => ({ id: i, name: 'loading' })),
}

const loadingMovies = Array.from({ length: 10 }, (_, i) => ({
  ...loadingMovie,
  id: `loading-movie-${i}`,
}))

const loadingSearchMovies = { results: loadingMovies }

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
          queryClient.setQueryData(['movie', { movieId: movie.id }], movie, {
            queryConfig,
          })
        }
      },
    },
  )
  return { ...result, movies: result.data ?? loadingSearchMovies }
}

export function useMovie(movieId) {
  const result = useQuery(
    ['movie', { movieId }],
    () => api(`movie/${movieId}`, {}, true),
    queryConfig,
  )
  return { ...result, movie: result.data ?? loadingMovie }
}

export function useMoviesByCategory(category) {
  const result = useQuery({
    queryKey: category,
    queryFn: () =>
      api(
        `movie/${category}`,
        {
          queryParams: {
            page: 1,
          },
        },
        true,
      ),
  })

  return { ...result, data: result.data ?? loadingMovie }
}

export function useGenre(genreId) {
  const result = useQuery(['genreMovies', { genreId }], () =>
    api('discover/movie', { queryParams: { with_genres: genreId, page: 1 } }, true),
  )
  return { ...result, movies: result.data }
}

export function useGenres() {
  return useQuery('genres', () => api('genre/movie/list', {}, true))
}
