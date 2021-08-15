/** @jsxImportSource @emotion/react */
import React from 'react'

import { useAuth } from 'context/AuthProvider'
import { Button, ButtonText, ErrorMessage, FormGroup, Input, Spinner } from 'components/atoms'
import { Modal, ModalContents, ModalOpenButton } from 'components/organisms/Modal'
import { useAsync } from 'hooks/useAsync'

export function AuthModal() {
  const { user, login, register, logout } = useAuth()
  const { run, isLoading, isError, error } = useAsync()

  function handleLogout() {
    logout()
  }

  const [authState, setAuthState] = React.useState('login')
  const isLogin = authState === 'login'
  const isRegister = authState === 'register'

  function setRegister() {
    setAuthState('register')
  }

  function setLogin() {
    setAuthState('login')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isLogin) {
      const {
        identifier: { value: identifier },
        password: { value: password },
      } = e.target.elements
      run(login({ identifier, password }))
    } else {
      const {
        username: { value: username },
        email: { value: email },
        password: { value: password },
      } = e.target.elements
      run(register({ username, email, password }))
    }
  }
  return !user ? (
    <Modal>
      <ModalOpenButton>
        <Button onClick={setLogin}>Login</Button>
      </ModalOpenButton>
      <ModalOpenButton>
        <ButtonText onClick={setRegister}>Register</ButtonText>
      </ModalOpenButton>
      <ModalContents title={authState} aria-label={`${authState} form`}>
        <form onSubmit={handleSubmit}>
          {isError && <ErrorMessage error={error} />}
          {isLogin && (
            <>
              <LoginForm />
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button type="submit">Login {isLoading && <Spinner />}</Button>
                <ButtonText type="button" onClick={setRegister}>
                  New here?
                </ButtonText>
              </div>
            </>
          )}
          {isRegister && (
            <>
              <RegisterForm />
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button type="submit">Register {isLoading && <Spinner />}</Button>
                <ButtonText type="button" onClick={setLogin}>
                  Already a member?
                </ButtonText>
              </div>
            </>
          )}
        </form>
      </ModalContents>
    </Modal>
  ) : (
    <>
      <p>Hi, {user.username}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}

function LoginForm() {
  return (
    <>
      <FormGroup>
        <label htmlFor="identifier">Email or Username</label>
        <Input id="identifier" type="text" placeholder="example@email.com" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
    </>
  )
}
function RegisterForm() {
  return (
    <>
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" placeholder="example@email.com" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
    </>
  )
}
