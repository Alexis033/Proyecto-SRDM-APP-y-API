import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { ModalProvider } from './context/modal'
import { UserProvider } from './context/userInfo'
import { useLoginContext } from './hooks/useLoginContext'

function App () {
  const { isLogin } = useLoginContext()
  return (
    <UserProvider>
      <ModalProvider>{isLogin ? <InnerApp /> : <Login />}</ModalProvider>
    </UserProvider>
  )
}

export default App
