import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { useContext } from 'react'
import { LoginContext } from './context/login'
import { ModalProvider } from './context/modal'
import { UserProvider } from './context/userInfo'

function App () {
  const { isLogin } = useContext(LoginContext)
  return (
    <UserProvider>
      <ModalProvider>{isLogin ? <InnerApp /> : <Login />}</ModalProvider>
    </UserProvider>
  )
}

export default App
