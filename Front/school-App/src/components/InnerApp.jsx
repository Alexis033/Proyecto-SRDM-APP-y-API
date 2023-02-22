import useUserInfo from '../hooks/useUserInfo'
import { Menu } from './Menu'
import { UploadDocument } from './UploadDocument'

export const InnerApp = ({ loginState }) => {
  const { userInfo } = useUserInfo({})

  return (
    <>
      <Menu logOut={loginState} rol={1 /* userInfo.id_rol */} />
      <UploadDocument />
    </>
  )
}
