import { URL_UPDATE_USER_PASSWORD } from '../assets/endpoints/api'

export async function updateUserPassword ({ formData }) {
  const { password } = formData
  const token = window.localStorage.getItem('token')

  if (password !== '') {
    try {
      const headerList = {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      const body = {
        password: `${password}`
      }

      const response = await fetch(URL_UPDATE_USER_PASSWORD, {
        method: 'PUT',
        headers: headerList,
        body: JSON.stringify(body)
      })
      const user = await response.json()

      if (!response.ok) {
        return user
      }

      return user
    } catch (err) {
      console.log(err)
      return err
    }
  }
}
