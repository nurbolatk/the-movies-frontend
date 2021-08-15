/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'context/AuthProvider'
import { Button, ButtonText, Container, FormGroup, Input, Spinner } from 'components/atoms'
import { Modal, ModalContents, ModalOpenButton } from 'components/organisms/Modal'

export function Navbar() {
  const theme = useTheme()
  const { user, login, register, isLoading, logout } = useAuth()

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
      const {
        username: { value: username },
        email: { value: email },
        password: { value: password },
      } = e.target.elements
      register({ username, email, password })
    }
  }

  function handleLogout() {
    logout()
  }

  return (
    <div
      css={{
        minHeight: '7rem',
        backgroundColor: 'white',
        boxShadow: '0 45px 35px 0 rgb(154 161 171 / 15%)',
      }}
    >
      <Container
        css={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          columnGap: '2rem',
        }}
      >
        <Link
          to="/"
          css={{
            fontFamily: theme.font.title,
            fontSize: '3rem',
            marginRight: 'auto',
          }}
        >
          the movies
        </Link>
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
      </Container>
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
