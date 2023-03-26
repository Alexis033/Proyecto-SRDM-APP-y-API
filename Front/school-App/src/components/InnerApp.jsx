import { Menu } from './Menu'
import { FormStudent } from './FormStudent'
// import { ListPendingDocuments } from './ListPendingDocuments'
import { ListStudents } from './ListStudents'
import { UploadDocument } from './UploadDocument'
import { ValidationDocumentsStudent } from './ValidationDocumentsStudent'
import { WelcomePage } from './WelcomePage'
import { useContext } from 'react'
import { ModalContext } from '../context/modal'
import { ModalStatic } from './ModalStatic'
import { createUserAndStudent } from '../logic/createUserAndStudent.js'
import { useStudentInfo } from '../hooks/useStudentInfo.js'
import { updateUserAndStudent } from '../logic/updateUserAndStudent'
import { useUserInfo } from '../hooks/useUserInfo'
import { useUserContext } from '../hooks/useUserContext'
import { Routes, Route } from 'react-router-dom'

export const InnerApp = () => {
  useUserInfo()
  useStudentInfo()

  const { userInfo, studentInfo } = useUserContext()
  const { show, handleClose, message } = useContext(ModalContext)

  // console.log(userInfo)
  // console.log(studentInfo)

  return (
    <>
      <Menu />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route
          path='/listStudents'
          element={
            userInfo.id_rol !== 1
              ? (
                <p
                  style={{
                    marginTop: '100px',
                    marginBottom: '50px',
                    fontSize: '50px'
                  }}
                  className='text-center'
                >
                  🚧 Usuario no autorizado para esta acción 🚧
                </p>
                )
              : (
                <ListStudents />
                )
          }
        />
        **
        <Route
          path='/listStudents/:mail/:name'
          element={<ValidationDocumentsStudent />}
        />
        **
        <Route
          path='/createStudent'
          element={
            userInfo.id_rol !== 1
              ? (
                <p
                  style={{
                    marginTop: '100px',
                    marginBottom: '50px',
                    fontSize: '50px'
                  }}
                  className='text-center'
                >
                  🚧 Usuario no autorizado para esta acción 🚧
                </p>
                )
              : (
                <FormStudent functionFetch={createUserAndStudent}>
                  Crear
                </FormStudent>
                )
          }
        />
        <Route
          path='/personalInfo'
          element={
            <FormStudent
              userData={studentInfo}
              functionFetch={updateUserAndStudent}
            >
              Actualizar
            </FormStudent>
          }
        />
        <Route
          path='/UploadDocuments'
          element={<UploadDocument />}
        />
        <Route
          path='*'
          element={
            <h2
              style={{
                marginTop: '100px',
                marginBottom: '50px',
                fontSize: '50px'
              }}
              className='text-center'
            >
              🚧 404 🚧
            </h2>
          }
        />
      </Routes>

      <ModalStatic
        title='Información'
        content={message}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
