import { useParams } from 'react-router-dom'
import { Container } from 'components/atoms'
import { AsyncMovieRow } from 'components/molecules/AsyncMovieRow'
import { useList } from 'hooks/lists'

export function List() {
  const { listName } = useParams()
  const { list } = useList()

  const filteredList = list.filter((item) =>
    listName === 'watched' ? item.watched : !item.watched,
  )

  return (
    <Container>
      {filteredList.map((item) => (
        <AsyncMovieRow key={item.movieId} movieId={item.movieId} />
      ))}
    </Container>
  )
}
