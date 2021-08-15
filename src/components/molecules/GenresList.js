import { Button } from 'components/atoms'
import { useHistory } from 'react-router-dom'

export function GenresList({ genres }) {
  const history = useHistory()

  function navigateToSearch(genreId) {
    history.push(`/genres/${genreId}`)
  }
  return (
    genres?.map((genre) => (
      <Button onClick={() => navigateToSearch(genre.id)} key={genre.id}>
        {genre.name}
      </Button>
    )) ?? null
  )
}
