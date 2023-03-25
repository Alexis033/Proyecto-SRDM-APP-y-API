import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export const ValidationDocumentsStudent = () => {
  const { mail, name } = useParams()
  const navigate = useNavigate()
  console.log(mail, name)

  useEffect(() => {
    async function fetch (mail) {}
    fetch(mail)
  }, [])

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col'>
          <h2 className='text-center'>{name}</h2>
          <table className='table table-hover border border-5 text-center caption-top'>
            <thead className='table-primary'>
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
                  <button type='submit' className='btn btn-primary mx-auto'>
                    Validar
                  </button>
                </td>
                <td>
                  <button type='submit' className='btn btn-primary mx-auto'>
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
                  <button type='submit' className='btn btn-primary mx-auto'>
                    Validar
                  </button>
                </td>
                <td>
                  <button type='submit' className='btn btn-primary mx-auto'>
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
                  <button type='submit' className='btn btn-primary mx-auto'>
                    Validar
                  </button>
                </td>
                <td>
                  <button type='submit' className='btn btn-primary mx-auto'>
                    Solicitar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-grid m-4'>
        <button
          type='button'
          className='btn btn-primary mx-auto'
          onClick={() => {
            navigate(-1)
          }}
        >
          Regresar a lista de estudiantes
        </button>
      </div>
    </div>
  )
}
