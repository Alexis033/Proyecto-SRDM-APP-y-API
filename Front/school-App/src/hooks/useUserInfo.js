import { useState, useEffect } from 'react'
import { URL_GET_USER_INFO } from '../assets/endpoints/login'

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({})

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
        setUserInfo(data)
      } catch (err) {
        console.log(err)
      }
    }

    getUserInfo()
  }, [])

  return { userInfo }
}

export default useUserInfo
