/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import Dialog from '@reach/dialog'
import { callAll } from '../utils/callAll'

const ModalContext = React.createContext()

function ModalProvider(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />
}

function useModal() {
  const value = React.useContext(ModalContext)
  return value
}

function Modal({ children }) {
  return <ModalProvider>{children}</ModalProvider>
}

function ModalOpenButton({ children: child }) {
  const { setIsOpen } = useModal()

  function openModal() {
    setIsOpen(true)
  }

  return React.cloneElement(child, { onClick: callAll(child.props.onClick, openModal) })
}

function ModalContents({ title, children, ...props }) {
  const { isOpen, setIsOpen } = useModal()

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Dialog isOpen={isOpen} onDismiss={closeModal} {...props}>
      <button onClick={closeModal}>close</button>
      <h3
        css={css`
          text-transform: capitalize;
        `}
      >
        {title}
      </h3>
      {children}
    </Dialog>
  )
}

export { Modal, ModalOpenButton, ModalContents }
