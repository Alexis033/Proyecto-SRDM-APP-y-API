import { URL_USER } from '../assets/endpoints/api'

export async function createUser ({ formData }) {
  const { email, password } = formData
  const token = window.localStorage.getItem('token')

  try {
    const headerList = {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const body = {
      usuario: email,
      password: `${password}`
    }

    const response = await fetch(URL_USER, {
      method: 'POST',
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
