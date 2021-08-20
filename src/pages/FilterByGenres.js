/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { Container } from 'components/atoms'
import { MovieRow } from 'components/molecules/MovieRow'
import { BrowseByGenre } from 'components/organisms/BrowseByGenre'
import { useGenre } from 'hooks/movies'
import { useParams } from 'react-router-dom'

export function FilterByGenres() {
  const { genreId } = useParams()
  const theme = useTheme()
  const { movies } = useGenre(genreId)

  return (
    <Container
      css={{
        background: theme.colors.bgLight,
        marginBottom: '3rem',
        padding: '1rem',
      }}
    >
      <BrowseByGenre />
      {movies?.results?.length && (
        <div
          css={{
            marginTop: '2rem',
          }}
        >
          {movies.results.map((movie) => (
            <MovieRow key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </Container>
  )
}
