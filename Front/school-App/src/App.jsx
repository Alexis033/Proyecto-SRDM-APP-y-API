import { useState } from 'react'
import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { ModalStatic } from './components/ModalStatic'

function App () {
  const [isLogin, setIsLogin] = useState(false)

  const loginState = (answer) => {
    if (answer === null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }
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
