import React from 'react'

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])

  return React.useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch])
}

const defaultInitialState = {
  data: null,
  error: null,
  status: 'idle', // 'pending' | 'resolved' | 'rejected'
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const [{ data, error, status }, unsafeDispatch] = React.useReducer(
    (state, action) => ({ ...state, ...action }),
    initialStateRef.current,
  )

  const dispatch = useSafeDispatch(unsafeDispatch)

  const setData = React.useCallback(
    (data) => {
      dispatch({ status: 'resolved', data })
    },
    [dispatch],
  )

  const setError = React.useCallback(
    (error) => {
      dispatch({ status: 'rejected', error })
    },
    [dispatch],
  )

  const reset = React.useCallback(() => dispatch(initialStateRef.current), [dispatch])

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error('The argument passed to run must be a promise')
      }

      dispatch({ status: 'pending' })
      return promise.then(
        (data) => {
          setData(data)
          return data
        },
        (error) => {
          setError(error)
          return error
        },
      )
    },
    [dispatch, setData, setError],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export { useAsync }
