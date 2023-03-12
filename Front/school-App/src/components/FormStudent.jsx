import { createUser } from '../logic/createUser'
export const FormStudent = ({ userData }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, surname, age, id, grade, email, password } =
      Object.fromEntries(new window.FormData(event.target))

    createUser({ email, password })
  }
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
            value={userData && userData.firstName}
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
            value={userData && userData.lastName}
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
            value={userData && userData.age}
            min='1'
            max='19'
            required
          />
        </div>
        <div className='col-11 col-md-8'>
          <label htmlFor='id' className='form-label fw-bold'>
            Documento de identidad
          </label>
          <input
            type='number'
            className='form-control'
            name='id'
            id='id'
            value={userData && userData.birthDate}
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
            defaultValue='0'
          >
            <option disabled value='0'>
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
            type='email'
            className='form-control'
            name='email'
            id='email'
            value={userData && userData.mail}
            pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'
            required
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
            value={userData && userData.password}
          />
        </div>
        <div className='d-grid col-12 mt-4 mb-4'>
          <button type='submit' className='btn btn-primary mx-auto'>
            Subir Información
          </button>
        </div>
      </form>
    </main>
  )
}
