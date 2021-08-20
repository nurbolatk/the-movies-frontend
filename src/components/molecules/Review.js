/** @jsxImportSource @emotion/react */
import { ErrorMessage, Spinner, TextArea } from 'components/atoms'
import React from 'react'

import { useListItem } from 'hooks/lists'

export function Review({ movieId }) {
  const { listItem, isLoading, isError, error } = useListItem(movieId)
  const [review, setReview] = React.useState(listItem?.review ?? '')

  function handleChange(e) {
    setReview(e.target.value)
  }

  return listItem?.watched ? (
    <div
      css={{
        marginTop: '3rem',
      }}
    >
      <>
        <h5>Write your review {isLoading && <Spinner />}</h5>
        {isError && <ErrorMessage error={error} />}
        <TextArea rows="5" value={review} onChange={handleChange} />
      </>
    </div>
  ) : null
}
