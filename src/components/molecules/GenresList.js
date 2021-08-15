import { Button } from 'components/atoms'

export function GenresList({ genres, handleGenreChange }) {
  function navigateToSearch(genreId) {
    handleGenreChange(genreId)
  }
  return (
    genres?.map((genre) => (
      <Button onClick={() => navigateToSearch(genre.id)} key={genre.id}>
        {genre.name}
      </Button>
    )) ?? null
  )
}
