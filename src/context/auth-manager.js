const LOCAL_STORAGE_AUTH_KEY = 'the-movies-app-'

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
}

function handleAuthResponse(data) {
  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data.jwt)
  return data
}

function login(credentials) {
  return client('auth/local', credentials).then(handleAuthResponse)
}

function register(credentials) {
  return client('auth/local/register', credentials).then(handleAuthResponse)
}

function logout() {
  return window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
}

const authURL = 'http://localhost:1337'

function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { login, getToken, register, logout }
