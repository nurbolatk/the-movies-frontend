/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Tooltip from '@reach/tooltip'
import { BsBookmarkFill, BsBookmarkPlus, BsEye, BsEyeFill } from 'react-icons/bs'
import { BiErrorAlt } from 'react-icons/bi'
import { useCreateListItem, useListItem, useRemoveListItem } from '../hooks/lists'
import { useAsync } from '../hooks/useAsync'
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
    <Tooltip label={isError ? error.message : label}>
      <ButtonIcon
        css={{
          ':hover, :focus': {
            color: isLoading ? theme.colors.teal : isError ? theme.colors.red : highlight,
          },
        }}
        onClick={handleClick}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <BiErrorAlt /> : icon}
      </ButtonIcon>
    </Tooltip>
  )
}

function StatusButtons({ movie }) {
  const theme = useTheme()

  const toWatchItem = useListItem('to-watch', movie.id)
  const watchedItem = useListItem('watched', movie.id)
  const { mutateAsync: removeFromToWatch } = useRemoveListItem('to-watch')
  const { mutateAsync: addToToWatch } = useCreateListItem('to-watch')
  const { mutateAsync: removeFromWatched } = useRemoveListItem('watched')
  const { mutateAsync: addToWatched } = useCreateListItem('watched')

  return (
    <>
      {toWatchItem ? (
        <TooltipButton
          icon={<BsBookmarkFill />}
          onClick={() => removeFromToWatch(toWatchItem)}
          highlight={theme.colors.red}
          label="Remove from watch later"
        />
      ) : (
        <TooltipButton
          icon={<BsBookmarkPlus />}
          onClick={() => addToToWatch(movie)}
          highlight={theme.colors.blue}
          label="Watch later"
        />
      )}
      {watchedItem ? (
        <TooltipButton
          icon={<BsEyeFill />}
          onClick={() => removeFromWatched(watchedItem)}
          highlight={theme.colors.purple}
          label="Remove from watched"
        />
      ) : (
        <TooltipButton
          icon={<BsEye />}
          onClick={() => addToWatched(movie)}
          highlight={theme.colors.purple}
          label="Add to watched"
        />
      )}
    </>
  )
}

export { StatusButtons, TooltipButton }
