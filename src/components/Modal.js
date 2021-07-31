import Dialog from '@reach/dialog'
import React from 'react'
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

function ModalContents({ children }) {
  const { isOpen, setIsOpen } = useModal()

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Dialog isOpen={isOpen} onDismiss={closeModal}>
      <button onClick={closeModal}>close</button>
      <h2>This is modal</h2>
      {children}
    </Dialog>
  )
}

export { Modal, ModalOpenButton, ModalContents }
