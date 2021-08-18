// import { useParams } from 'react-router-dom'
import { Container } from 'components/atoms'
import { AsyncMovieRow } from 'components/molecules/AsyncMovieRow'
import { useList } from 'hooks/lists'

export function List() {
  // const { listName } = useParams()
  const listItems = useList()
  console.log({ listItems })

  return (
    <Container>
      {listItems.map((item) => (
        <AsyncMovieRow key={item.movieId} movieId={item.movieId} />
      ))}
    </Container>
  )
}
