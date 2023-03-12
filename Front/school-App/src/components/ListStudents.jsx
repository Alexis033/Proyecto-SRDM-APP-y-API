export const ListStudents = ({ listStudents }) => {
  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col col-md-9 mx-auto'>
          <table className='table table-hover border border-5 align-middle'>
            <thead className='table-primary'>
              <tr>
                <th />
                <th>Id</th>
                <th>Estudiante</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input id='1' type='checkbox' />
                </td>
                <td>1</td>
                <td>
                  <a className='text-decoration-none text-dark' href=''>
                    Estudiante 1
                  </a>
                </td>
                <td />
              </tr>

              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>2</td>
                <td>
                  <a className='text-decoration-none text-dark' href=''>
                    Estudiante 2
                  </a>
                </td>
                <td />
              </tr>

              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>3</td>
                <td>
                  <a className='text-decoration-none text-dark' href=''>
                    Estudiante 3
                  </a>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-grid m-3'>
        <button type='button' className='btn btn-primary mx-auto mb-4'>
          Matricular
        </button>

        <button type='button' className='btn btn-primary mx-auto'>
          Eliminar
        </button>
      </div>
    </div>
  )
}
