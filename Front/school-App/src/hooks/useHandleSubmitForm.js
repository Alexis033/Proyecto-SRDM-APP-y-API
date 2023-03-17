import { useContext } from 'react'
import { ModalContext } from '../context/modal'
import { useUserContext } from './useUserContext'

export function useHandleSubmitForm ({ functionFetch }) {
  const { setModificationInfo } = useUserContext()
  const { handleShow, setMessage } = useContext(ModalContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new window.FormData(event.target))
    // console.log(formData)
    const { newStudent } = await functionFetch({ formData })
    if (newStudent.detail) {
      setMessage(newStudent.detail)
      handleShow()
    } else if (newStudent.stack) {
      setMessage('Error con el servidor')
      handleShow()
    } else {
      setMessage(
        `Proceso exitoso para estudiante: ${newStudent.nombres} ${newStudent.apellidos}`
      )
      handleShow()
      const inputElements = event.target.elements
      for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].value = ''
      }

      setTimeout(() => {
        setModificationInfo(true)
      }, 4 * 1000)
    }
  }
  return { handleSubmit }
}
