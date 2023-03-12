import { useState, useEffect } from 'react'
import { URL_GET_USER_INFO } from '../assets/endpoints/appi'

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({})
  const [error, setError] = useState('')

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
  }, [])

  return { userInfo, error }
}

export default useUserInfo
