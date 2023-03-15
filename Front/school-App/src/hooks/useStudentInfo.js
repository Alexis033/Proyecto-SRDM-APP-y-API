import { useState, useEffect, useContext } from 'react'
import { URL_STUDENT } from '../assets/endpoints/api'
import { UserContext } from '../context/userInfo'
import { LoginContext } from '../context/login'

export function useStudentInfo () {
  const [studentInfo, setStudentInfo] = useState({})
  const [error, setError] = useState('')
  const { isLogin, setIsLogin } = useContext(LoginContext)

  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    if (isLogin === true) {
      async function getStudentInfo () {
        const token = window.localStorage.getItem('token')
        try {
          const headersList = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }

          const response = await fetch(`${URL_STUDENT}${userInfo.usuario}`, {
            method: 'GET',
            headers: headersList
          })
          const data = await response.json()

          if (!response.ok) setError(data.detail)

          setStudentInfo(data)
        } catch (err) {
          setError(err)
        }
      }
      getStudentInfo()
    }
  }, [isLogin, userInfo])

  if (studentInfo.detail) {
    setIsLogin(false)
  }
  return { studentInfo, error, setStudentInfo }
}
