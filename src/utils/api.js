const apiUrl = 'http://localhost:1337'

async function api(endpoint, { data, token, headers: customHeaders, ...customConfig } = {}) {
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

  const response = await window.fetch(`${apiUrl}/${endpoint}`, config)

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
