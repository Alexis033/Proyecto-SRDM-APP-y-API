import { useEffect } from 'react'
import { Menu } from './Menu'
export const InnerApp = ({ loginState }) => {
  useEffect(() => {
    async function getUserInfo () {
      try {
        const user = await fetch()
      } catch {}
    }
    return rol
  }, [])
  return (
    <main>
      <Menu logOut={loginState} rol={rol} />
    </main>
  )
}
