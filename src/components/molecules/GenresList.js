import { Button } from 'components/atoms'

export function GenresList({ genres }) {
  return genres?.map((genre) => <Button key={genre.id}>{genre.name}</Button>) ?? null
}
