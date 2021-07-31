import React from 'react'
import { useAsync } from '../hooks/useAsync'
import { api } from '../utils/api'
import { Button, FormGroup, Input, Spinner } from './lib'
import { Modal, ModalContents, ModalOpenButton } from './Modal'

export function Navbar() {
  const [authState, setAuthState] = React.useState('login')
  const isLogin = authState === 'login'
  const isRegister = authState === 'register'

  const { data, isLoading, error, run } = useAsync()

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
      run(api('auth/local', { data: { identifier, password } }))
    }
  }

  console.log(data, isLoading, error)

  return (
    <div>
      <Modal>
        <ModalOpenButton>
          <Button onClick={setLogin}>Login</Button>
        </ModalOpenButton>
        <ModalOpenButton>
          <Button onClick={setRegister}>Register</Button>
        </ModalOpenButton>
        <ModalContents title={authState} aria-label={`${authState} form`}>
          <form onSubmit={handleSubmit}>
            {isLogin && (
              <>
                <LoginForm />
                <Button type="submit">Login {isLoading && <Spinner />}</Button>
                <Button type="button" onClick={setRegister}>
                  New here? <Spinner />
                </Button>
              </>
            )}
            {isRegister && (
              <>
                <RegisterForm />
                <Button type="submit">Register</Button>
                <Button type="button" onClick={setLogin}>
                  Already a member?
                </Button>
              </>
            )}
          </form>
        </ModalContents>
      </Modal>
    </div>
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
