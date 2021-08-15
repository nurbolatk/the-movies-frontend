/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Tooltip from '@reach/tooltip'
import { BsBookmarkPlus, BsEye } from 'react-icons/bs'
import { useAuth } from '../context/AuthProvider'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'
import { ButtonIcon, Spinner } from './lib'

function TooltipButton({ label, icon, highlight, onClick, ...rest }) {
  const { error, isLoading, isError, reset, run } = useAsync()
  const theme = useTheme()

  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
  }

  return (
    <Tooltip label={label}>
      <ButtonIcon
        css={{
          ':hover, :focus': {
            color: isLoading ? theme.colors.teal : isError ? theme.colors.red : highlight,
          },
        }}
        onClick={handleClick}
        {...rest}
      >
        {isLoading ? <Spinner /> : icon}
      </ButtonIcon>
    </Tooltip>
  )
}

function StatusButtons({ movie }) {
  const theme = useTheme()
  const { user } = useAuth()

  return (
    <>
      <TooltipButton
        icon={<BsBookmarkPlus />}
        onClick={() =>
          api('to-watch', {
            data: {
              movieId: movie.id,
            },
            token: user?.token,
          })
        }
        highlight={theme.colors.blue}
        label="Watch later"
      />
      <TooltipButton
        icon={<BsEye />}
        onClick={() =>
          api('watched', {
            data: {
              movieId: movie.id,
            },
          })
        }
        highlight={theme.colors.purple}
        label="Add to watched"
      />
    </>
  )
}

export { StatusButtons, TooltipButton }
