/** @jsxImportSource @emotion/react */
import React from 'react'

import { useParams } from 'react-router-dom'
import { Container, ErrorMessage, Poster } from 'components/atoms'
import { StatusButtons } from 'components/molecules/StatusButtons'
import { useAuth } from 'context/AuthProvider'
import { GenresList } from 'components/molecules/GenresList'
import { useMovie } from 'hooks/movies'
import { mq } from 'context/styles'
import { Rating } from 'components/molecules/Rating'
import { Review } from 'components/molecules/Review'

export function MovieDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const { movie, isError, error } = useMovie(id)

  return (
    <Container>
      <div
        css={{
          backgroundColor: 'white',
          borderRadius: '0.25rem',
          padding: '2rem',
        }}
      >
        {isError && <ErrorMessage error={error} />}
        {movie && (
          <>
            <div
              css={{
                display: 'flex',
                columnGap: '2rem',
                [mq.extraSmall]: {
                  flexDirection: 'column',
                },
              }}
            >
              <div
                css={{
                  flexShrink: 0,
                  width: '300px',
                  overflow: 'hidden',
                  borderRadius: '0.25rem',
                  [mq.extraSmall]: {
                    width: '100%',
                  },
                }}
              >
                <Poster movie={movie} />
              </div>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '1rem',
                }}
              >
                <div
                  css={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <h2
                    css={{
                      marginTop: 0,
                      marginRight: 'auto',
                    }}
                  >
                    {movie.title}
                  </h2>
                  {user && <StatusButtons movie={movie} />}
                </div>
                <p>{movie.release_date}</p>
                {user && <Rating movieId={movie.id} />}
                <p>{movie.overview}</p>
                <div
                  css={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <GenresList genres={movie.genres} />
                </div>
              </div>
            </div>
            {user && <Review movieId={movie.id} />}
          </>
        )}
      </div>
    </Container>
  )
}
