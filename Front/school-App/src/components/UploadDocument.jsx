import Button from 'react-bootstrap/Button'

export const UploadDocument = ({ documentList }) => {
  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col'>
          <form action='' id='formulario-cargar-archivos'>
            <table className='table table-hover border border-5 text-center'>
              <thead className='table-primary'>
                <tr>
                  <th>Documento</th>
                  <th>Archivo</th>
                </tr>
              </thead>
              <tbody>
                {/* {documentList.map((document) => {
                  return (
                    <tr key={document.id}>
                      <td>{document.nombre_documento}</td>
                      <td>
                        <input type='file' />
                      </td>
                    </tr>
                  )
                })} */}
                <tr>
                  <td>Documento 1</td>
                  <td>
                    <input type='file' />
                  </td>
                </tr>
                <tr>
                  <td>Documento 2</td>
                  <td>
                    <input type='file' />
                  </td>
                </tr>
                <tr>
                  <td>Documento 3</td>
                  <td>
                    <input type='file' />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div className='mb-4 form-check m-3' action='#'>
        <input
          type='checkbox'
          name='connected'
          className='form-check-input'
          id='connected'
          required
        />
        <label htmlFor='connected' className='form-check-label col-12'>
          Consentimiento de manejo de información
        </label>
      </div>

      <div className='d-flex justify-content-center mt-3'>
        <Button variant='primary' onClick=''>
          Subir documentos
        </Button>
      </div>
    </div>
  )
}
