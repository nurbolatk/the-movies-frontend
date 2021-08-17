/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Poster } from 'components/atoms'
import { mq } from 'context/styles'
import { useAuth } from 'context/AuthProvider'
import { StatusButtons } from './StatusButtons'

export function MovieRow({ movie }) {
  const { user } = useAuth()
  return (
    <div
      css={{
        display: 'flex',
        columnGap: '2rem',
        ':not(:last-of-type)': {
          marginBottom: '2rem',
        },
      }}
    >
      <Link
        to={`/movie/${movie.id}`}
        css={{
          flexShrink: 0,
          width: 140,
          overflow: 'hidden',
          borderRadius: '0.25rem',
          [mq.extraSmall]: {
            width: 100,
          },
        }}
      >
        <Poster movie={movie} />
      </Link>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '0.5rem',
          flex: 1,
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h3
            css={{
              margin: '0 auto 0 0',
            }}
          >
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </h3>
          {user && <StatusButtons movie={movie} />}
        </div>
        <p>{movie.release_date}</p>
      </div>
    </div>
  )
}
