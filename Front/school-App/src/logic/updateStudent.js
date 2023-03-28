import { URL_UPDATE_STUDENT } from '../assets/endpoints/api'

export async function updateStudent ({ formData }) {
  const { name, surname, age, documentId, grade, email, telNumber } = formData
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
    const response = await fetch(`${URL_UPDATE_STUDENT}${email}`, {
      method: 'PUT',
      headers: headerList,
      body: JSON.stringify(body)
    })

    const student = await response.json()

    if (!response.ok) {
      return student
    }
    return student
  } catch (err) {
    console.log(err)
    return err
  }
}
