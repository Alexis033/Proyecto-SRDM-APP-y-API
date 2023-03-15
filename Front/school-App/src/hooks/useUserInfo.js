import { useState, useEffect, useContext } from 'react'
import { URL_GET_USER_INFO } from '../assets/endpoints/api'
import { LoginContext } from '../context/login'

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({})
  const [error, setError] = useState('')
  const { isLogin } = useContext(LoginContext)

  useEffect(() => {
    async function getUserInfo () {
      const token = window.localStorage.getItem('token')
      try {
        const headersList = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        const response = await fetch(URL_GET_USER_INFO, {
          method: 'GET',
          headers: headersList
        })
        const data = await response.json()

        if (!response.ok) setError(data.detail)

        setUserInfo(data)
      } catch (err) {
        setError(err)
      }
    }

    getUserInfo()
  }, [isLogin])

  return { userInfo, error, setUserInfo }
}

export default useUserInfo
