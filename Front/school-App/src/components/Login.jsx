import { useContext, useState } from 'react'
import { login } from '../logic/login'
import { ModalStatic } from './ModalStatic'
import './Login.css'
import { useShowModal } from '../hooks/useShowModal'
import { LoginContext } from '../context/login'

export const Login = () => {
  const [error, setError] = useState('')
  const { show, handleShow, handleClose } = useShowModal()

  const { loginState } = useContext(LoginContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = Object.fromEntries(
      new window.FormData(event.target)
    )
    const answer = await login({ event, email, password })
    loginState(answer)
    setError(answer)
    if (answer !== null) handleShow()
  }

  return (
    <>
      <div id='fondo'>
        <main className='container w-75 bg-primary mt-5 rounded shadow'>
          <div className='row align-items-stretch'>
            <div
              id='image-container'
              className='col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start'
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
                method='post'
                autoComplete='off'
                onSubmit={handleSubmit}
              >
                <div className='mb-4'>
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
                <div className='mb-4'>
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
                <div className='mb-1 form-check' />

                <div className='d-grid mb-4'>
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
