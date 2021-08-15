/** @jsxImportSource @emotion/react */

import { GoSearch } from 'react-icons/go'
import { Input } from 'components/atoms'
import { useHistory } from 'react-router-dom'

export function SearchForm() {
  const history = useHistory()

  function handleSearch(e) {
    e.preventDefault()
    const searchQuery = e.target.searchQuery.value
    history.push(`/discover/${searchQuery}`)
  }

  return (
    <div>
      <form onSubmit={handleSearch} autocomplete="off">
        <div
          css={{
            position: 'relative',
          }}
        >
          <Input
            name="searchQuery"
            placeholder="Search movie"
            css={{
              paddingRight: 'calc(32px + 1rem)',
            }}
          />
          <button
            type="submit"
            css={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
            }}
          >
            <GoSearch width={32} height={32} />
          </button>
        </div>
      </form>
    </div>
  )
}
