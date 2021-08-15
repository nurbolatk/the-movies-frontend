import React from 'react'
import { useAsync } from 'hooks/useAsync'
import * as auth from 'utils/auth-manager'
import { api } from 'utils/api'
import { FullPageLoading } from 'components/atoms'

const AuthContext = React.createContext()

function useAuth() {
  const value = React.useContext(AuthContext)
  if (value === undefined) {
    throw new Error('useAuth must be called inside AuthProvider')
  }

  return value
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    user = await api('auth/getUserInfo', { token })
    return {
      ...user,
      token,
    }
  }

  return user
}

function AuthProvider(props) {
  const { data: user, setData, isIdle, isError, isSuccess, isLoading, run, error } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = (credentials) =>
    auth.login(credentials).then((user) => {
      setData(user)
    })
  const register = (credentials) =>
    auth.register(credentials).then((user) => {
      setData(user)
    })
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageLoading />
  }

  if (isError) {
    return <p>Failed to fetch user, {error.message}</p>
  }

  if (isSuccess) {
    const value = { user, login, register, logout }
    return <AuthContext.Provider value={value} {...props} />
  }
}

export { AuthProvider, useAuth }
