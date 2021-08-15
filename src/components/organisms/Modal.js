/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import Dialog from '@reach/dialog'
import { callAll } from 'utils/callAll'
import { ButtonIcon } from 'components/atoms'
import { BsX } from 'react-icons/bs'

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
      <h3
        css={css`
          text-transform: capitalize;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        {title}
        <ButtonIcon onClick={closeModal}>
          <BsX />
        </ButtonIcon>
      </h3>
      {children}
    </Dialog>
  )
}

export { Modal, ModalOpenButton, ModalContents }
