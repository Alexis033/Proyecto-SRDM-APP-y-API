import { createUser } from './createUser'
import { createStudent } from './createStudent'

export function createUserAndStudent ({ formData }) {
  const newUser = createUser({ formData })
  const newStudent = createStudent({ formData })
  return { newUser, newStudent }
}
