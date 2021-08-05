/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Button, ButtonText, FormGroup, Input, Spinner } from './lib'
import { Modal, ModalContents, ModalOpenButton } from './Modal'

export function Navbar() {
  const theme = useTheme()
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
    <div
      css={{
        display: 'flex',
        minHeight: '7rem',
        padding: '1rem 2rem',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 45px 35px 0 rgb(154 161 171 / 15%)',
        columnGap: '2rem',
      }}
    >
      <p
        css={{
          fontFamily: theme.font.title,
          fontSize: '3rem',
          marginRight: 'auto',
        }}
      >
        the movies
      </p>
      {!user ? (
        <Modal>
          <ModalOpenButton>
            <Button onClick={setLogin}>Login</Button>
          </ModalOpenButton>
          <ModalOpenButton>
            <ButtonText onClick={setRegister}>Register</ButtonText>
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
        <>
          <p>Hi, {user.username}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </>
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
