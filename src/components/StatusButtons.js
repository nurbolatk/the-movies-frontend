/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Tooltip from '@reach/tooltip'
import { BsBookmarkCheck, BsBookmarkFill, BsBookmarkPlus, BsEye, BsEyeFill } from 'react-icons/bs'
import { useMutation, useQuery, queryCache, useQueryClient } from 'react-query'
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
  const queryClient = useQueryClient()

  const { data: toWatchList } = useQuery({
    queryKey: 'to-watch',
    queryFn: () => api('to-watch', { token: user?.token }),
  })
  const toWatchItem = toWatchList?.find((item) => item.movieId === movie.id)

  const { data: watchedList } = useQuery({
    queryKey: 'watched',
    queryFn: () => api('watched', { token: user?.token }),
  })
  const watchedItem = watchedList?.find((item) => item.movieId === movie.id)

  const { mutateAsync: addToToWatch } = useMutation(
    () =>
      api('to-watch', {
        data: {
          movieId: movie.id,
        },
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('to-watch'),
    },
  )

  const { mutateAsync: removeFromToWatch } = useMutation(
    () =>
      api(`to-watch/${toWatchItem.id}`, {
        method: 'DELETE',
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('to-watch'),
    },
  )

  const { mutateAsync: addToWatched } = useMutation(
    () =>
      api('watched', {
        data: {
          movieId: movie.id,
        },
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('watched'),
    },
  )

  const { mutateAsync: removeFromWatched } = useMutation(
    () => api(`watched/${watchedItem.id}`, { method: 'DELETE', token: user?.token }),
    { onSettled: () => queryClient.invalidateQueries('watched') },
  )

  return (
    <>
      {toWatchItem ? (
        <TooltipButton
          icon={<BsBookmarkFill />}
          onClick={removeFromToWatch}
          highlight={theme.colors.red}
          label="Remove from watch later"
        />
      ) : (
        <TooltipButton
          icon={<BsBookmarkPlus />}
          onClick={addToToWatch}
          highlight={theme.colors.blue}
          label="Watch later"
        />
      )}
      {watchedItem ? (
        <TooltipButton
          icon={<BsEyeFill />}
          onClick={removeFromWatched}
          highlight={theme.colors.purple}
          label="Remove from watched"
        />
      ) : (
        <TooltipButton
          icon={<BsEye />}
          onClick={addToWatched}
          highlight={theme.colors.purple}
          label="Add to watched"
        />
      )}
    </>
  )
}

export { StatusButtons, TooltipButton }
