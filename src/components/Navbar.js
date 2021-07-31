import React from 'react'
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
          <button onClick={setLogin}>Login</button>
        </ModalOpenButton>
        <ModalOpenButton>
          <button onClick={setRegister}>Register</button>
        </ModalOpenButton>
        <ModalContents>
          {isLogin && (
            <div>
              <button>Login</button>
              <button onClick={setRegister}>New here?</button>
            </div>
          )}
          {isRegister && (
            <div>
              <button>Register</button>
              <button onClick={setLogin}>Already a member?</button>
            </div>
          )}
        </ModalContents>
      </Modal>
    </div>
  )
}
