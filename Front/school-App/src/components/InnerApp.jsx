import useUserInfo from '../hooks/useUserInfo'
import { FormStudent } from './FormStudent'
import { Menu } from './Menu'

export const InnerApp = ({ loginState }) => {
  const { userInfo } = useUserInfo({})

  return (
    <>
      <Menu logOut={loginState} rol={1 /* userInfo.id_rol */} />
      <FormStudent />
    </>
  )
}
