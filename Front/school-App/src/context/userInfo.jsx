import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({})
  const [modificationInfo, setModificationInfo] = useState(false)
  const [studentInfo, setStudentInfo] = useState({})

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        modificationInfo,
        setModificationInfo,
        studentInfo,
        setStudentInfo
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
