export const ListPendingDocuments = ({ documentList }) => {
  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col'>
          <table className='table table-hover border border-5 text-center caption-top'>
            <thead className='table-primary'>
              <tr>
                <th>Documento</th>
                <th>Archivo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* {documentList.map((document) => {
                  return (
                    <tr key={document.id}>
                      <td>{document.nombre_documento}</td>
                      <td>
                        <a href='#'>Archivo</a>
                      </td>
                      <td>estado</td>
                    </tr>
                  )
                })} */}

              <tr>
                <td>Documento 1</td>
                <td>
                  <a href='#'>Archivo</a>
                </td>
                <td />
              </tr>
              <tr>
                <td>Documento 2</td>
                <td>
                  <a href='#'>Archivo</a>
                </td>
                <td />
              </tr>
              <tr>
                <td>Documento 3</td>
                <td>
                  <a href='#'>Archivo</a>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-grid m-3'>
        <button type='button' className='btn btn-primary mx-auto'>
          Regresar a cargar documentos
        </button>
      </div>
    </div>
  )
}
