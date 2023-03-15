import useUserInfo from '../hooks/useUserInfo'
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

export const InnerApp = () => {
  const { userInfo } = useUserInfo({})
  const [position, setPosition] = useState('Home')
  const { show, handleClose, message } = useContext(ModalContext)

  return (
    <>
      <Menu rol={userInfo.id_rol} handleClick={setPosition} />
      {position === 'Home' && <WelcomePage />}
      {position === 'createStudent' && (
        <FormStudent functionFetch={createUserAndStudent}>Crear</FormStudent>
      )}
      {position === 'listStudents' && <ListStudents />}
      {position === 'personalInfo' && <FormStudent>Actualizar</FormStudent>}
      <ModalStatic
        title='Información'
        content={message}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
