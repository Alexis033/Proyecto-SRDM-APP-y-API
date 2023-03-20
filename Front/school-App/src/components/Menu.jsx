import { useLoginState } from '../hooks/useLoginState'
import { useUserContext } from '../hooks/useUserContext'
import { Link } from 'react-router-dom'

export const Menu = () => {
  const { loginState } = useLoginState()
  const { userInfo } = useUserContext()

  return (
    <div className='container-fluid p-0'>
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark border-3 border-bottom border-primary fixed-top'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            SRDM
          </Link>
          <button
            type='button'
            className='navbar-toggler'
            data-bs-toggle='collapse'
            data-bs-target='#MenuNavegacion'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div
            id='MenuNavegacion'
            className='collapse navbar-collapse position-relative'
          >
            <ul className='navbar-nav ms-3'>
              {userInfo.id_rol === 2 && (
                <>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/personalInfo'
                    >
                      Información personal
                    </Link>
                  </li>
                  <li className='nav-item dropdown'>
                    <Link
                      className='nav-link dropdown-toggle'
                      role='button'
                      data-bs-toggle='dropdown'
                    >
                      Subir Documentos
                    </Link>
                    <ul className='dropdown-menu'>
                      <li>
                        <Link className='dropdown-item' to='/uploadDocuments'>
                          Cargar Documentos
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item' to='/pendingDocuments'>
                          Ver Documentos Pendientes
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {userInfo.id_rol === 1 && (
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    to='#'
                    role='button'
                    data-bs-toggle='dropdown'
                  >
                    Verificación y matricula
                  </Link>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link className='dropdown-item' to='/createStudent'>
                        Crear Nuevo estudiante
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/listStudents'>
                        Lista de alumnos
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            <ul className='navbar-nav ms-3'>
              <li className='nav-item position-absolute top-0 end-0'>
                <Link
                  className='nav-link text-nowrap'
                  to=''
                  onClick={() => {
                    loginState('cerrar')
                  }}
                >
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
