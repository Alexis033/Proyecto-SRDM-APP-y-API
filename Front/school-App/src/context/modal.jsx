import { createContext, useState } from 'react'
import { useShowModal } from '../hooks/useShowModal'

export const ModalContext = createContext()

export function ModalProvider ({ children }) {
  const { show, handleShow, handleClose } = useShowModal()
  const [message, setMessage] = useState('')

  return (
    <ModalContext.Provider
      value={{ show, handleShow, handleClose, message, setMessage }}
    >
      {children}
    </ModalContext.Provider>
  )
}
