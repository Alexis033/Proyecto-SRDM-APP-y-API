import { URL_STUDENT } from '../assets/endpoints/appi'

export async function createStudent ({
  name,
  surname,
  age,
  documentId,
  grade,
  email,
  telNumber
}) {
  const token = window.localStorage.getItem('token')
  const headerList = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const body = {
    id_curso: parseInt(grade),
    correo: email,
    nombres: name,
    apellidos: surname,
    documento_identidad: parseInt(documentId),
    edad: parseInt(age),
    telefono: parseInt(telNumber)
  }
  try {
    const response = await fetch(URL_STUDENT, {
      method: 'POST',
      headers: headerList,
      body: JSON.stringify(body)
    })

    const student = await response.json()

    if (!response.ok) {
      console.log(student)
      return student
    }
    return student
  } catch (err) {
    console.log(err)
  }
}
