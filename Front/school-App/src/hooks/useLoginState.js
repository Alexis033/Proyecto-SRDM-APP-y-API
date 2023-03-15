import { useState, useEffect } from 'react'

export function useLoginState () {
  const [isLogin, setIsLogin] = useState(false)

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
  return { isLogin, loginState, setIsLogin }
}
