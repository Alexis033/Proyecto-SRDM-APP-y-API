import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { useContext } from 'react'
import { LoginContext } from './context/login'

function App () {
  // const { isLogin, loginState } = useLogin()

  const { isLogin, loginState } = useContext(LoginContext)
  return <>{isLogin ? <InnerApp /> : <Login />}</>
}

export default App
