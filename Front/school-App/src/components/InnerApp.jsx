import useUserInfo from '../hooks/useUserInfo'
import { Menu } from './Menu'
import { FormStudent } from './FormStudent'
// import { ListPendingDocuments } from './ListPendingDocuments'
// import { ListStudents } from './ListStudents'
// import { UploadDocument } from './UploadDocument'
// import { ValidationDocumentsStudent } from './ValidationDocumentsStudent'
import { WelcomePage } from './WelcomePage'
import { useContext, useState } from 'react'
import { ModalContext } from '../context/modal'
import { ModalStatic } from './ModalStatic'

export const InnerApp = () => {
  const { userInfo } = useUserInfo({})
  const [position, setPosition] = useState('Home')
  const { show, handleClose, message } = useContext(ModalContext)

  return (
    <>
      <Menu rol={userInfo.id_rol} handleClick={setPosition} />
      {position === 'Home' && <WelcomePage />}
      {position === 'pepe' && <FormStudent>Crear</FormStudent>}
      <ModalStatic
        title='Información'
        content={message}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
