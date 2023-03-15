import { createContext, useState } from 'react'
import useUserInfo from '../hooks/useUserInfo'

export const UserContext = createContext()

export function UserProvider ({ children }) {
  const { userInfo, setUserInfo, modificationInfo, setModificationInfo } =
    useUserInfo()
  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, modificationInfo, setModificationInfo }}
    >
      {children}
    </UserContext.Provider>
  )
}
