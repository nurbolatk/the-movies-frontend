import React from 'react'
import { Button, FormGroup, Input } from './lib'
import { Modal, ModalContents, ModalOpenButton } from './Modal'

export function Navbar() {
  const [authState, setAuthState] = React.useState('login')
  const isLogin = authState === 'login'
  const isRegister = authState === 'register'

  function setRegister() {
    setAuthState('register')
  }

  function setLogin() {
    setAuthState('login')
  }

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
          <form>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input id="email" type="text" placeholder="example@email.com" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" />
            </FormGroup>
            {isLogin && (
              <div>
                <Button>Login</Button>
                <Button onClick={setRegister}>New here?</Button>
              </div>
            )}
            {isRegister && (
              <>
                <FormGroup>
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <Input id="confirm-password" type="password" />
                </FormGroup>
                <div>
                  <Button>Register</Button>
                  <Button onClick={setLogin}>Already a member?</Button>
                </div>
              </>
            )}
          </form>
        </ModalContents>
      </Modal>
    </div>
  )
}
