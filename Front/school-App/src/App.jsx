import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { useContext } from 'react'
import { LoginContext } from './context/login'
import { ModalProvider } from './context/modal'

function App () {
  const { isLogin } = useContext(LoginContext)
  return <ModalProvider>{isLogin ? <InnerApp /> : <Login />}</ModalProvider>
}

export default App
