import { useState, useContext } from 'react'
import { ModalContext } from '../context/modal'

export function useSearchStudent ({ listStudents }) {
  const [studentSearch, setStudentSearch] = useState([])
  const { handleShow, setMessage } = useContext(ModalContext)

  const handleSearch = (mail) => {
    const student = listStudents.find((student) => {
      return student.correo === mail
    })
    if (student !== undefined) {
      setStudentSearch([student])
    } else {
      setStudentSearch([])
      setMessage('Estudiante no encontrado')
      handleShow()
    }
  }
  return { studentSearch, handleSearch }
}
