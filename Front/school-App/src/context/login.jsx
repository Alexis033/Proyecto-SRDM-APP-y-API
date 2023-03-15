import { createContext } from 'react'
import { useLoginState } from '../hooks/useLoginState'
export const LoginContext = createContext()

export function LoginProvider ({ children }) {
  const { isLogin, loginState, setIsLogin } = useLoginState(false)

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        loginState,
        setIsLogin
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
