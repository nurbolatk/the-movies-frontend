import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Button, FormGroup, Input, Spinner } from './lib'
import { Modal, ModalContents, ModalOpenButton } from './Modal'

export function Navbar() {
  const { user, login, isLoading, logout } = useAuth()

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
      login({ identifier, password })
    } else {
    }
  }

  function handleLogout() {
    logout()
  }

  return (
    <div>
      {!user ? (
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
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
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
