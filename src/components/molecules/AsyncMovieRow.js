import { ErrorMessage, Spinner } from 'components/atoms'
import { useMovie } from 'hooks/movies'
import { MovieRow } from './MovieRow'

export function AsyncMovieRow({ movieId }) {
  const { movie, isLoading, error, isError, isSuccess } = useMovie(movieId)
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorMessage error={error} />
  ) : isSuccess ? (
    <MovieRow movie={movie} />
  ) : null
}
