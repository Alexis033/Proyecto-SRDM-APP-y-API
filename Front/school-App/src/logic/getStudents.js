import { URL_STUDENT } from '../assets/endpoints/api'

export async function getStudents () {
  const token = window.localStorage.getItem('token')
  const headerList = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await fetch(URL_STUDENT, {
      method: 'GET',
      headers: headerList
    })

    const listStudents = await response.json()

    if (!response.ok) {
      return listStudents
    }
    return listStudents
  } catch (err) {
    console.log(err)
  }
}
