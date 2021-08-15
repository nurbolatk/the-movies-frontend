/** @jsxImportSource @emotion/react */
import React from 'react'

import { useParams } from 'react-router-dom'
import { Container, ErrorMessage, Poster, Spinner } from 'components/atoms'
import { useAsync } from 'hooks/useAsync'
import { api } from 'utils/api'
import { StatusButtons } from 'components/molecules/StatusButtons'
import { useAuth } from 'context/AuthProvider'
import { GenresList } from 'components/molecules/GenresList'

export function MovieDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const { data, isLoading, run, error, isError } = useAsync()
  const { data: listItems, run: runListItems } = useAsync()

  React.useEffect(() => {
    run(api(`movie/${id}`, {}, true))
  }, [run, id])

  React.useEffect(() => {
    runListItems(api(`list-items`, { token: user?.token }))
  }, [runListItems, user])

  console.log({ listItems })

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
                    {data.title}
                  </h2>
                  {user && <StatusButtons movie={data} />}
                </div>
                <p>{data.release_date}</p>
                <p>{data.overview}</p>
                <div
                  css={{
                    display: 'flex',
                    columnGap: '1rem',
                  }}
                >
                  <GenresList genres={data.genres} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
