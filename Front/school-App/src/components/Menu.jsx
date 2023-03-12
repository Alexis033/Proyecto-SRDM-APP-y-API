export const Menu = ({ logOut, rol, handleClick }) => {
  return (
    <div className='container-fluid p-0'>
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark border-3 border-bottom border-primary fixed-top'>
        <div className='container-fluid'>
          <a
            href='#'
            className='navbar-brand'
            onClick={() => handleClick('Home')}
          >
            SRDM
          </a>
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
              {rol === 2 && (
                <>
                  <li className='nav-item'>
                    <a className='nav-link' aria-current='page' href='#'>
                      Información personal
                    </a>
                  </li>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      href='#'
                      role='button'
                      data-bs-toggle='dropdown'
                    >
                      Subir Documentos
                    </a>
                    <ul className='dropdown-menu'>
                      <li>
                        <a className='dropdown-item' href='#'>
                          Cargar Documentos
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='#'>
                          Ver Documentos Pendientes
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {rol === 1 && (
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                  >
                    Herramientas de verificación y matricula
                  </a>
                  <ul className='dropdown-menu'>
                    <li>
                      <a
                        className='dropdown-item'
                        href='#'
                        onClick={() => handleClick('pepe')}
                      >
                        Crear Nuevo estudiante
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Lista de alumnos
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            <ul className='navbar-nav ms-3'>
              <li className='nav-item position-absolute top-0 end-0'>
                <a
                  className='nav-link text-nowrap'
                  href='#'
                  onClick={() => {
                    logOut('cerrar')
                  }}
                >
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
