import { useContext } from 'react'
import { UserContext } from '../context/userInfo'

export function useUserContext () {
  const userInfo = useContext(UserContext)

  if (userInfo === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return userInfo
}
