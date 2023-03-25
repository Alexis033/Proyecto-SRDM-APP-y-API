import { URL_STUDENT } from '../assets/endpoints/api'

export async function getStudent (mail) {
  const token = window.localStorage.getItem('token')
  try {
    const headersList = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const response = await fetch(`${URL_STUDENT}${mail}`, {
      method: 'GET',
      headers: headersList
    })
    const student = await response.json()

    if (!response.ok) return student

    return student
  } catch (err) {
    console.log(err)
  }
}
