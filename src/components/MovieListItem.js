/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom'

const MoviePoster = styled.div``
const border = (props) => css`
  border: 1px solid ${props.theme.colors.gray};
`
const MovieContent = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  ${border}
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
`

const MovieStyles = styled.div`
  flex: 0 0 180px;
  width: 180px;
  height: 270px;
  position: relative;
  &:hover ${MovieContent} {
    opacity: 1;
    pointer-events: all;
    box-shadow: inset -5px -5px 35px 0 rgba(154, 161, 171, 0.15);
  }
  border-radius: 0.25rem;
  overflow: hidden;
`

export function MovieListItem({ movie }) {
  return (
    <MovieStyles>
      <MoviePoster>
        <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      </MoviePoster>
      <MovieContent>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        <p>{movie.release_date}</p>
        <p>{movie.vote_average}/10</p>
      </MovieContent>
    </MovieStyles>
  )
}
