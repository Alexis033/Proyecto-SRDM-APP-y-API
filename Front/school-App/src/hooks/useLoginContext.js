import { useContext } from 'react'
import { LoginContext } from '../context/login'

export function useLoginContext () {
  const context = useContext(LoginContext)

  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider')
  }
  return context
}
