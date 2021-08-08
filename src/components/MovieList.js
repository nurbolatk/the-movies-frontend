/** @jsxImportSource @emotion/react */

import { MovieListItem } from './MovieListItem'

export function MovieList({ movies }) {
  return movies.results?.map((movie) => <MovieListItem key={movie.id} movie={movie} />)
}
