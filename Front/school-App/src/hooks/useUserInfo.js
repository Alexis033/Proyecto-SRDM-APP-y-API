import { useState, useEffect } from 'react'

const URL_GET_USER_INFO = 'http://127.0.0.1:8000/login/me'

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
