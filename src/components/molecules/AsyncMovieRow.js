import { ErrorMessage } from 'components/atoms'
import { useMovie } from 'hooks/movies'
import { MovieRow } from './MovieRow'

export function AsyncMovieRow({ movieId }) {
  const { movie, error, isError, isSuccess } = useMovie(movieId)
  return isError ? <ErrorMessage error={error} /> : isSuccess ? <MovieRow movie={movie} /> : null
}
