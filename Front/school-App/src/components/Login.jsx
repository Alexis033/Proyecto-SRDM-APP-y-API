import { useState } from 'react'
import { login } from '../logic/login'
import { ModalStatic } from './ModalStatic'
import './Login.css'
import { useShowModal } from '../hooks/useShowModal'
import { useLoginState } from '../hooks/useLoginState'
import { useUserContext } from '../hooks/useUserContext'
import { redirect } from 'react-router-dom'

export const Login = () => {
  const [error, setError] = useState('')
  const { show, handleShow, handleClose } = useShowModal()
  const { loginState } = useLoginState()
  const { setUserInfo, setStudentInfo } = useUserContext()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUserInfo({})
    setStudentInfo({})

    const { email, password } = Object.fromEntries(
      new window.FormData(event.target)
    )
    const answer = await login({ event, email, password })
    loginState(answer)
    setError(answer)
    if (answer !== null) handleShow()
    else redirect('/')
  }

  return (
    <>
      <div id='fondo'>
        <main className='container w-75 bg-primary mt-5 rounded shadow'>
          <div className='row align-items-stretch'>
            <div
              id='image-container'
              className='col bg d-none d-md-block col-md-5 col-lg-5 col-xl-6 rounded-start'
            />
            <div className='col bg-white rounded-end'>
              <div className='text-end mt-2'>
                <img
                  src='../img/logo.png'
                  width='100px'
                  alt='Logo de la compañia'
                  className='rounded-pill'
                />
              </div>

              <h2 className='fw-bold text-center py-5'>Bienvenido</h2>

              <form
                id='login'
                className='row flex-column'
                method='post'
                autoComplete='off'
                onSubmit={handleSubmit}
              >
                <div className='col mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Correo electrónico
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='form-control'
                    name='email'
                    required
                    autoComplete='off'
                    pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
                  />
                </div>
                <div className='col mb-5'>
                  <label htmlFor='password' className='form-label'>
                    Contraseña
                  </label>
                  <input
                    type='password'
                    id='password'
                    className='form-control'
                    name='password'
                    required
                    autoComplete='off'
                  />
                </div>

                <div className='col-sm-7 mx-auto mb-5 d-flex justify-content-center '>
                  <button
                    type='submit'
                    id='btn-session'
                    className='btn btn-primary'
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ModalStatic
        title='Error'
        content={error}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
