/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Poster } from 'components/atoms'
import { mq } from 'context/styles'

export function MovieRow({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      css={{
        display: 'flex',
        columnGap: '2rem',
        ':not(:last-of-type)': {
          marginBottom: '2rem',
        },
      }}
    >
      <div
        css={{
          flexShrink: 0,
          width: 140,
          overflow: 'hidden',
          borderRadius: '0.25rem',
          [mq.small]: {
            width: 100,
          },
        }}
      >
        <Poster movie={movie} />
      </div>
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
            justifyContent: 'space-between',
          }}
        >
          <h3
            css={{
              margin: 0,
            }}
          >
            {movie.title}
          </h3>
        </div>
        <p>{movie.release_date}</p>
      </div>
    </Link>
  )
}
