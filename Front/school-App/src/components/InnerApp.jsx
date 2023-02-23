import useUserInfo from '../hooks/useUserInfo'
import { FormStudent } from './FormStudent'
import { ListPendingDocuments } from './ListPendingDocuments'
import { ListStudents } from './ListStudents'
import { Menu } from './Menu'
import { UploadDocument } from './UploadDocument'
import { ValidationDocumentsStudent } from './ValidationDocumentsStudent'

export const InnerApp = ({ loginState }) => {
  const { userInfo } = useUserInfo({})

  return (
    <>
      <Menu logOut={loginState} rol={userInfo.id_rol} />
      <FormStudent />
      <UploadDocument />
      <ListPendingDocuments />
      <ListStudents />
      <ValidationDocumentsStudent />
    </>
  )
}
