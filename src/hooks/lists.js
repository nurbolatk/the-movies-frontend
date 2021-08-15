import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from 'context/AuthProvider'
import { api } from 'utils/api'

function useList(endpoint) {
  const { user } = useAuth()
  const { data: list } = useQuery({
    queryKey: endpoint,
    queryFn: () => api(endpoint, { token: user?.token }),
  })

  return list ?? []
}

function useListItem(endpoint, movieId) {
  return useList(endpoint).find((item) => item.movieId === movieId)
}

function useCreateListItem(endpoint) {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation(
    (movie) =>
      api(endpoint, {
        data: {
          movieId: movie.id,
        },
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(endpoint),
    },
  )
}

function useRemoveListItem(endpoint) {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation(
    (listItem) =>
      api(`${endpoint}/${listItem.id}`, {
        method: 'DELETE',
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(endpoint),
    },
  )
}

export { useList, useListItem, useCreateListItem, useRemoveListItem }
