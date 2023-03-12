import { URL_USER } from '../assets/endpoints/appi'

export async function createUser ({ email, password }) {
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
      console.log(user)
      return user
    }

    return user
  } catch (err) {
    console.log(err)
  }
}
