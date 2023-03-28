import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { ModalProvider } from './context/modal'
import { UserProvider } from './context/userInfo'
import { useLoginContext } from './hooks/useLoginContext'
import { BrowserRouter } from 'react-router-dom'

function App () {
  const { isLogin } = useLoginContext()
  return (
    <BrowserRouter>
      <UserProvider>
        <ModalProvider>{isLogin ? <InnerApp /> : <Login />}</ModalProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
