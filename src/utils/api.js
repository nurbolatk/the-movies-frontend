import { queryClient } from 'context/AppProviders'
import { logout } from './auth-manager'

const backendUrl = process.env.REACT_APP_BACKEND_URL
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY

const tmdbUrl = (endpoint, params) =>
  `https://api.themoviedb.org/3/${endpoint}?api_key=${tmdbApiKey}&language=en-US&${params}`

async function api(
  endpoint,
  { data, token, headers: customHeaders, queryParams, ...customConfig } = {},
  useTmdb = false,
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  let params = ''
  if (queryParams) {
    params = new URLSearchParams(queryParams).toString()
  }

  const url = useTmdb ? tmdbUrl(endpoint, params) : `${backendUrl}/${endpoint}?${params}`

  const response = await window.fetch(url, config)

  if (response.status === 401) {
    queryClient.clear()
    logout()
    window.location.assign(window.location.toString())
    return Promise.reject({ message: 'Please re-authenticate.' })
  }

  const result = await response.json()

  if (response.ok) {
    return result
  } else {
    return Promise.reject(result)
  }
}

export { api }
