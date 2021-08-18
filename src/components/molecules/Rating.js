/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import { useListItem, useUpdateListItem } from 'hooks/lists'
import React from 'react'
import { BsFillStarFill, BsStar, BsStarFill } from 'react-icons/bs'

const visuallyHiddenCSS = {
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
}

export function Rating({ movieId }) {
  const { listItem } = useListItem(movieId)
  const { mutateAsync } = useUpdateListItem()
  const { colors } = useTheme()
  console.log(listItem)
  const rootClassName = `list-item-${listItem?.id}`
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const ratingId = `rating-${listItem?.id}-${index}`
    const ratingValue = index + 1
    return (
      <React.Fragment key={index}>
        <input
          type="radio"
          name={rootClassName}
          id={ratingId}
          value={ratingValue}
          checked={ratingValue === listItem?.rating}
          onChange={() => mutateAsync({ id: listItem?.id, rating: ratingValue })}
          css={[
            visuallyHiddenCSS,
            {
              [`.${rootClassName} &:checked ~ label`]: { color: colors.gray },
              [`.${rootClassName} &:checked + label`]: { color: colors.orange },
              [`.${rootClassName} &:hover ~ label`]: {
                color: `${colors.gray} !important`,
              },
              [`.${rootClassName} &:hover + label`]: {
                color: `${colors.orange} !important`,
              },
            },
          ]}
        />
        <label
          htmlFor={ratingId}
          css={{
            cursor: 'pointer',
            color: listItem?.rating < 0 ? colors.gray : colors.orange,
          }}
        >
          <span css={visuallyHiddenCSS}>
            {ratingValue} {ratingValue === 1 ? 'star' : 'stars'}
          </span>
          <BsStarFill css={{ width: 16, margin: '0 2px' }} />
        </label>
      </React.Fragment>
    )
  })

  return listItem?.watched ? (
    <div
      onClick={(e) => e.stopPropagation()}
      className={rootClassName}
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: 0,
        alignSelf: 'flex-start',
        [`&.${rootClassName}:hover input + label`]: {
          color: colors.orange,
        },
      }}
    >
      <span css={{ display: 'flex' }}>{stars}</span>
    </div>
  ) : null
}
