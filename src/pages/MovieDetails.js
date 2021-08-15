/** @jsxImportSource @emotion/react */
import React from 'react'

import { useParams } from 'react-router-dom'
import { Container, ErrorMessage, Poster, Spinner } from 'components/atoms'
import { StatusButtons } from 'components/molecules/StatusButtons'
import { useAuth } from 'context/AuthProvider'
import { GenresList } from 'components/molecules/GenresList'
import { useMovie } from 'hooks/movies'

export function MovieDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const { movie, isLoading, isError, error } = useMovie(id)

  return (
    <Container
      css={{
        marginTop: '3rem',
      }}
    >
      <div
        css={{
          backgroundColor: 'white',
          borderRadius: '0.25rem',
          padding: '2rem',
        }}
      >
        {isLoading && <Spinner size={56} />}
        {isError && <ErrorMessage error={error} />}
        {movie && (
          <>
            <div
              css={{
                display: 'flex',
                columnGap: '2rem',
              }}
            >
              <div
                css={{
                  flex: '0 0 300px',
                  width: '300px',
                  overflow: 'hidden',
                  borderRadius: '0.25rem',
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
                    alignItems: 'center',
                  }}
                >
                  <h2
                    css={{
                      marginRight: 'auto',
                    }}
                  >
                    {movie.title}
                  </h2>
                  {user && <StatusButtons movie={movie} />}
                </div>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
                <div
                  css={{
                    display: 'flex',
                    columnGap: '1rem',
                  }}
                >
                  <GenresList genres={movie.genres} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
