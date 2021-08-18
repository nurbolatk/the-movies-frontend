/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Tooltip from '@reach/tooltip'
import { BsBookmarkFill, BsBookmarkPlus, BsEye, BsEyeFill } from 'react-icons/bs'
import { BiErrorAlt } from 'react-icons/bi'
import { useCreateListItem, useListItem, useRemoveListItem, useUpdateListItem } from 'hooks/lists'
import { useAsync } from 'hooks/useAsync'
import { ButtonIcon, Spinner } from 'components/atoms'

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

  const { listItem } = useListItem(movie.id)
  const { mutateAsync: addListItem } = useCreateListItem()
  const { mutateAsync: removeListItem } = useRemoveListItem()
  const { mutateAsync: updateListItem } = useUpdateListItem()

  return (
    <>
      {listItem ? (
        listItem.watched ? (
          <TooltipButton
            icon={<BsEyeFill />}
            onClick={() => removeListItem(listItem)}
            highlight={theme.colors.purple}
            label="Remove from watched"
          />
        ) : (
          <>
            <TooltipButton
              icon={<BsBookmarkFill />}
              onClick={() => removeListItem(listItem)}
              highlight={theme.colors.red}
              label="Remove from watch later"
            />
            <TooltipButton
              icon={<BsEye />}
              onClick={() => updateListItem({ id: listItem.id, watched: true })}
              highlight={theme.colors.purple}
              label="Add to watched"
            />
          </>
        )
      ) : (
        <>
          <TooltipButton
            icon={<BsBookmarkPlus />}
            onClick={() =>
              addListItem({
                movieId: movie.id,
              })
            }
            highlight={theme.colors.blue}
            label="Watch later"
          />
          <TooltipButton
            icon={<BsEye />}
            onClick={() =>
              addListItem({
                movieId: movie.id,
                watched: true,
              })
            }
            highlight={theme.colors.purple}
            label="Add to watched"
          />
        </>
      )}
    </>
  )
}

export { StatusButtons, TooltipButton }
