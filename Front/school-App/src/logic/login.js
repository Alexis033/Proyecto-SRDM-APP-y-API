const urlLogin = 'http://127.0.0.1:8000/login/'

export async function login ({ event, email, password }) {
  event.preventDefault()
  if (!email || !password) {
    return 'Por favor, ingrese un correo y contraseña validos'
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!emailRegex.test(email)) {
    return 'Por favor, ingrese un correo electrónico válido'
  }

  const bodyContent = `username=${email}&password=${password}`
  try {
    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyContent
    })
    const data = await response.json()
    if (!data.access_token) {
      return 'Usuario o contraseña incorrectos'
    } else {
      const token = data.access_token
      window.localStorage.setItem('token', token)
      return null
    }
  } catch (error) {
    console.log(error)
    return 'Ha ocurrido un error, por favor intente nuevamente'
  }
  // return null
}
