import { useEffect, useContext } from 'react'
import { LoginContext } from '../context/login.jsx'

export function useLoginState () {
  const { isLogin, setIsLogin } = useContext(LoginContext)

  useEffect(() => {
    if (isLogin === true) {
      const timeoutLogin = setTimeout(() => {
        setIsLogin(false)
        window.localStorage.removeItem('token')
      }, 30 * 60 * 1000)
      return () => clearTimeout(timeoutLogin)
    }
  }, [isLogin])

  const loginState = (answer) => {
    if (answer === null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
      window.localStorage.removeItem('token')
    }
  }
  return { loginState }
}
