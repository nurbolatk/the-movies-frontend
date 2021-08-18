import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from 'context/AuthProvider'
import { api } from 'utils/api'

function useList() {
  const { user } = useAuth()
  const { data: list } = useQuery({
    queryKey: 'list-items',
    queryFn: () => api('list-items', { token: user?.token }),
  })

  return list ?? []
}

function useListItem(movieId) {
  return useList().find((item) => item.movieId === movieId)
}

function useCreateListItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation(
    (data) =>
      api('list-items', {
        data,
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('list-items'),
    },
  )
}

function useRemoveListItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation(
    (listItem) =>
      api(`list-items/${listItem.id}`, {
        method: 'DELETE',
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('list-items'),
    },
  )
}

function useUpdateListItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation(
    (updates) =>
      api(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user?.token,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('list-items'),
    },
  )
}

export { useList, useListItem, useCreateListItem, useRemoveListItem, useUpdateListItem }
