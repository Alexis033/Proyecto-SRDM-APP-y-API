import { useHandleSubmitForm } from '../hooks/useHandleSubmitForm.js'

export const FormStudent = ({ userData, functionFetch, children }) => {
  const { handleSubmit } = useHandleSubmitForm({
    functionFetch
  })
  return (
    <main
      className='container w-75 rounded shadow'
      style={{ marginTop: '100px', marginBottom: '50px' }}
    >
      <form
        className='row g-3 justify-content-center'
        id='formulario-información-estudiante'
        onSubmit={handleSubmit}
      >
        <div className='border-top border-bottom border-primary border-3 mt-0 bg-'>
          <h3 className='fw-bold text-center'>Información Estudiante</h3>
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='name' className='form-label fw-bold'>
            Nombre
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            id='name'
            defaultValue={userData && userData.nombres}
            required
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='surname' className='form-label fw-bold'>
            Apellidos
          </label>
          <input
            type='text'
            className='form-control'
            name='surname'
            id='surname'
            defaultValue={userData && userData.apellidos}
            required
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='age' className='form-label fw-bold'>
            Edad
          </label>
          <input
            type='number'
            className='form-control'
            name='age'
            id='age'
            defaultValue={userData && userData.edad}
            min='1'
            max='19'
            required
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='document-id' className='form-label fw-bold'>
            Documento de identidad
          </label>
          <input
            type='number'
            className='form-control'
            name='documentId'
            id='documentId'
            defaultValue={userData && userData.documento_identidad}
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='grade' className='form-label fw-bold'>
            Grado
          </label>
          <select
            className='form-select'
            name='grade'
            id='grade'
            aria-label='Default select example'
            defaultValue={userData ? userData.id_curso : ''}
            required
          >
            <option disabled value=''>
              Selecciona el grado
            </option>
            <option value='1'>Primero</option>
            <option value='2'>Segundo</option>
            <option value='3'>Tercero</option>
            <option value='4'>Cuarto</option>
            <option value='5'>Quinto</option>
          </select>
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='email' className='form-label fw-bold'>
            Correo electrónico
          </label>
          <input
            type='text'
            className='form-control'
            name='email'
            id='email'
            defaultValue={userData && userData.correo}
            pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'
            required
            autoComplete='off'
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='telNumber' className='form-label fw-bold'>
            Número celular
          </label>
          <input
            type='tel'
            className='form-control'
            name='telNumber'
            id='telNumber'
            defaultValue={userData && userData.telefono}
            pattern='^[0-9]{10}$'
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='password' className='form-label fw-bold'>
            Contraseña
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            id='password'
            autoComplete='off'
            placeholder='Llenar si deseas cambiarla'
          />
        </div>
        <div className='d-grid col-12 mt-4 mb-4'>
          <button type='submit' className='btn btn-primary mx-auto'>
            {children}
          </button>
        </div>
      </form>
    </main>
  )
}
