import { createUser } from './createUser'
import { createStudent } from './createStudent'

export async function createUserAndStudent ({ formData }) {
  const newUser = await createUser({ formData })
  const newStudent = await createStudent({ formData })
  return { newUser, newStudent }
}
