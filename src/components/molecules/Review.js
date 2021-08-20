/** @jsxImportSource @emotion/react */
import React from 'react'
import debounceFn from 'debounce-fn'
import { ErrorMessage, Spinner, TextArea } from 'components/atoms'

import { useListItem, useUpdateListItem } from 'hooks/lists'

export function Review({ movieId }) {
  const { listItem } = useListItem(movieId)
  const { mutateAsync, isLoading, isError, error } = useUpdateListItem()
  const debouncedMutate = React.useMemo(() => debounceFn(mutateAsync, { wait: 300 }), [mutateAsync])

  function handleChange(e) {
    debouncedMutate({ id: listItem.id, review: e.target.value })
  }

  return listItem && listItem.watched ? (
    <div
      css={{
        marginTop: '3rem',
      }}
    >
      <>
        <h5
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          Your review {isLoading && <Spinner />}
        </h5>
        {isError && <ErrorMessage error={error} />}

        <TextArea
          rows="5"
          defaultValue={listItem.review ?? ''}
          placeholder="Write your review"
          onChange={handleChange}
        />
      </>
    </div>
  ) : null
}
