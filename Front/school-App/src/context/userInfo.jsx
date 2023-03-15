import { createContext } from 'react'
import useUserInfo from '../hooks/useUserInfo'

export const UserContext = createContext()

export function UserProvider ({ children }) {
  const { userInfo, setUserInfo } = useUserInfo({})

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}
