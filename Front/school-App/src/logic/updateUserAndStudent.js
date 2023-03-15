import { updateUserPassword } from './updateUserPassword'
import { updateStudent } from './updateStudent'

export async function updateUserAndStudent ({ formData }) {
  const newUser = await updateUserPassword({ formData })
  const newStudent = await updateStudent({ formData })
  return { newUser, newStudent }
}
