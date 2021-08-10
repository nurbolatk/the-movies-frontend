/** @jsxImportSource @emotion/react */
import React from 'react'

import { useParams } from 'react-router-dom'
import { Button, Container, Poster, Spinner } from '../components/lib'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'

export function MovieDetails() {
  const { id } = useParams()

  const { data, isLoading, run, error, isError } = useAsync()

  React.useEffect(() => {
    run(api(`movie/${id}`, {}, true))
  }, [run, id])

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
        {data && (
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
                <Poster movie={data} />
              </div>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '1rem',
                }}
              >
                <h2>{data.title}</h2>
                <p>{data.release_date}</p>
                <p>{data.overview}</p>
                <div
                  css={{
                    display: 'flex',
                    columnGap: '1rem',
                  }}
                >
                  {data.genres.map((genre) => (
                    <Button>{genre.name}</Button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
