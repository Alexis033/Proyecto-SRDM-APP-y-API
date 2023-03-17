import { Menu } from './Menu'
import { FormStudent } from './FormStudent'
// import { ListPendingDocuments } from './ListPendingDocuments'
import { ListStudents } from './ListStudents'
// import { UploadDocument } from './UploadDocument'
// import { ValidationDocumentsStudent } from './ValidationDocumentsStudent'
import { WelcomePage } from './WelcomePage'
import { useContext, useState } from 'react'
import { ModalContext } from '../context/modal'
import { ModalStatic } from './ModalStatic'
import { createUserAndStudent } from '../logic/createUserAndStudent.js'
import { useStudentInfo } from '../hooks/useStudentInfo.js'
import { updateUserAndStudent } from '../logic/updateUserAndStudent'
import { useUserInfo } from '../hooks/useUserInfo'
import { useUserContext } from '../hooks/useUserContext'

export const InnerApp = () => {
  useUserInfo()
  useStudentInfo()

  const { userInfo, studentInfo } = useUserContext()
  const [position, setPosition] = useState('Home')
  const { show, handleClose, message } = useContext(ModalContext)

  console.log(userInfo)
  console.log(studentInfo)

  return (
    <>
      <Menu handleClick={setPosition} />
      {position === 'Home' && <WelcomePage />}
      {position === 'createStudent' && (
        <FormStudent functionFetch={createUserAndStudent}>Crear</FormStudent>
      )}
      {position === 'listStudents' && <ListStudents />}
      {position === 'personalInfo' && (
        <FormStudent
          userData={studentInfo}
          functionFetch={updateUserAndStudent}
        >
          Actualizar
        </FormStudent>
      )}
      <ModalStatic
        title='Información'
        content={message}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
