const backendUrl = 'http://localhost:1337'
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY
const tmdbUrl = (endpoint) =>
  `https://api.themoviedb.org/3/${endpoint}?api_key=${tmdbApiKey}&language=en-US&page=1`

async function api(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {},
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

  const url = useTmdb ? tmdbUrl(endpoint) : `${backendUrl}/${endpoint}`

  const response = await window.fetch(url, config)

  if (response.status === 401) {
    // window.location.assign(window.location)
    return Promise.reject({ message: 'Please re-authenticate.' })
  }

  const result = await response.json()

  console.log({ api: result, response })

  if (response.ok) {
    return result
  } else {
    return Promise.reject(result)
  }
}

export { api }
