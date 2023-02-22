export const ValidationDocumentsStudent = () => {
  return (
    <div class='container' style={{ marginTop: '100px' }}>
      <div class='row'>
        <div class='col'>
          <h2 class='text-center'>Nombre del estudiante</h2>
          <table class='table table-hover border border-5 text-center caption-top'>
            <thead class='table-primary'>
              <tr>
                <th>Documento</th>
                <th>Archivo</th>
                <th>Validar</th>
                <th>Solicitar cambio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Documento 1</td>
                <td>
                  <a href='#'>Archivo</a>
                </td>
                <td>
                  <button type='submit' class='btn btn-primary mx-auto'>
                    Validar
                  </button>
                </td>
                <td>
                  <button type='submit' class='btn btn-primary mx-auto'>
                    Solicitar
                  </button>
                </td>
              </tr>
              <tr>
                <td>Documento 2</td>
                <td>
                  <a href='#'>Archivo</a>
                </td>
                <td>
                  <button type='submit' class='btn btn-primary mx-auto'>
                    Validar
                  </button>
                </td>
                <td>
                  <button type='submit' class='btn btn-primary mx-auto'>
                    Solicitar
                  </button>
                </td>
              </tr>
              <tr>
                <td>Documento 3</td>
                <td>
                  <a href='#'>Archivo</a>
                </td>
                <td>
                  <button type='submit' class='btn btn-primary mx-auto'>
                    Validar
                  </button>
                </td>
                <td>
                  <button type='submit' class='btn btn-primary mx-auto'>
                    Solicitar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class='d-grid m-4'>
        <button type='button' class='btn btn-primary mx-auto'>
          Regresar a lista de estudiantes
        </button>
      </div>
    </div>
  )
}
