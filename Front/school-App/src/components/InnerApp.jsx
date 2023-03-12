import useUserInfo from '../hooks/useUserInfo'
import { Menu } from './Menu'
import { FormStudent } from './FormStudent'
// import { ListPendingDocuments } from './ListPendingDocuments'
// import { ListStudents } from './ListStudents'
// import { UploadDocument } from './UploadDocument'
// import { ValidationDocumentsStudent } from './ValidationDocumentsStudent'
import { WelcomePage } from './WelcomePage'
import { useState } from 'react'

export const InnerApp = ({ loginState }) => {
  const { userInfo } = useUserInfo({})
  const [position, setPosition] = useState('Home')

  return (
    <>
      <Menu
        logOut={loginState}
        rol={userInfo.id_rol}
        handleClick={setPosition}
      />
      {position === 'Home' && <WelcomePage />}
      {position === 'pepe' && <FormStudent />}
    </>
  )
}
