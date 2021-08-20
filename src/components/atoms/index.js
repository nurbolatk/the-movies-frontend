/** @jsxImportSource @emotion/react */

import { css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { mq } from 'context/styles'
import { GiSpinningBlades } from 'react-icons/gi'
import { RiLoaderFill } from 'react-icons/ri'

const primaryColor = (props) => css`
  background-color: ${props.theme.colors.primary};
`
const primaryDarkColor = (props) =>
  css`
    background-color: ${props.theme.colors.primaryDark};
  `

const Button = styled.button`
  border: none;
  ${primaryColor};
  border-radius: 0.25rem;
  padding: 0.7rem 1.4rem;
  cursor: pointer;
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    ${primaryDarkColor};
  }
`

const ButtonText = styled.button`
  background: none;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  label {
    margin-bottom: 0.5rem;
  }
`

const inputStyles = ({ theme }) => css`
  display: block;
  width: 100%;
  border: 1px solid ${theme.colors.border};
  background-color: white;
  color: ${theme.colors.secondary};
  line-height: 1.5;
  border-radius: 0.25rem;
  padding: 0.8rem 1.2rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border: 1px solid ${theme.colors.primary};
  }
`

const Input = styled.input`
  ${inputStyles}
`

const TextArea = styled.textarea`
  ${inputStyles}
`

const Card = styled.div`
  background-color: white;
  border-radius: 6;
  padding: 3rem;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.1);
`

const spin = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`
const Spinner = styled(RiLoaderFill)`
  animation: ${spin} 1s linear infinite;
`

function FullPageLoading() {
  const theme = useTheme()
  return (
    <div
      css={css`
        position: fixed;
        width: 100%;
        min-height: 100vh;
        z-index: 100;
        background-color: ${theme.colors.purple};
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <GiSpinningBlades
        css={css`
          font-size: 16rem;
          color: white;
        `}
      />
    </div>
  )
}

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
`

const ButtonIcon = styled.button`
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2rem;
    height: 2rem;

    ${mq.extraSmall} {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`

function Poster({ movie }) {
  // console.log({ movie })
  const imgUrl = movie.poster_path?.startsWith('/static/')
    ? movie.poster_path
    : `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
  return <img src={imgUrl} alt={movie.title} />
}

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

function ErrorMessage({ error, variant = 'stacked', ...props }) {
  const theme = useTheme()
  let message = ''

  if (Array.isArray(error.message)) {
    message = error.message.reduce((acc, message) => {
      if (message.messages) {
        const reduced = message.messages.reduce((acc, anotherMessage) => {
          acc = `${acc.length ? ', ' : ''}${anotherMessage.message}`
          return acc
        }, '')
        acc = `${acc.length ? ', ' : ''}${reduced}`
      } else if (typeof message === 'string') {
        acc = `${acc.length ? ', ' : ''}${message}`
      }
      return acc
    }, '')
  } else {
    message = error.message ?? error.status_message ?? ''
  }

  return (
    <div role="alert" css={[{ color: theme.colors.red }, errorMessageVariants[variant]]} {...props}>
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {message}
      </pre>
    </div>
  )
}

export {
  Button,
  ButtonText,
  ButtonIcon,
  FormGroup,
  Input,
  TextArea,
  Card,
  Spinner,
  Container,
  FullPageLoading,
  Poster,
  ErrorMessage,
}
