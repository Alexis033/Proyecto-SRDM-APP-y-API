import { useState, useEffect } from 'react'
import { login } from '../logic/login'
import { Modal } from './Modal'
import './Login.css'

export const Login = ({ loginState }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (error) {
      const modal = new bootstrap.Modal(document.getElementById('modalLogin'), {
        keyboard: false
      })
      modal.show()
    }
  }, [error])

  return (
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
              onSubmit={async (event) => {
                const answer = await login({ event, email, password })
                setError(answer)
                loginState(answer)
              }}
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
        {error && <Modal id='modalLogin' title='Error' content={error} />}
      </main>
    </div>
  )
}
