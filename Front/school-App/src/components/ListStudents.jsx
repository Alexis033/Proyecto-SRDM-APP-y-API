export const ListStudents = ({ listStudents }) => {
  return (
    <div class='container' style={{ marginTop: '100px' }}>
      <div class='row'>
        <div class='col col-md-9 mx-auto'>
          <table class='table table-hover border border-5 align-middle'>
            <thead class='table-primary'>
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
                  <a class='text-decoration-none text-dark' href=''>
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
                  <a class='text-decoration-none text-dark' href=''>
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
                  <a class='text-decoration-none text-dark' href=''>
                    Estudiante 3
                  </a>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class='d-grid m-3'>
        <button type='button' class='btn btn-primary mx-auto'>
          Matricular
        </button>
      </div>
    </div>
  )
}
