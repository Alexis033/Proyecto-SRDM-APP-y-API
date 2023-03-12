import { useEffect, useState } from 'react'
import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { useLogin } from './hooks/useLogin'

function App () {
  const { isLogin, loginState } = useLogin()
  return (
    <>
      {isLogin
        ? (
          <InnerApp loginState={loginState} />
          )
        : (
          <Login loginState={loginState} />
          )}
    </>
  )
}

export default App
