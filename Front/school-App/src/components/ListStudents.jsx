import { Link } from 'react-router-dom'
import { useGetStudents } from '../hooks/useGetStudents'
import { usePagination } from '../hooks/usePagination'
import { useSearchStudent } from '../hooks/useSearchStudent'
import { Pagination } from './Pagination'
import { SearchBar } from './SearchBar'

export const ListStudents = () => {
  const studentsPerPage = 30

  const { listStudents } = useGetStudents()
  const { handlePageChange, elementsToRender, currentPage } = usePagination({
    elementsInPage: studentsPerPage,
    totalElements: listStudents
  })
  const { studentSearch, handleSearch } = useSearchStudent({ listStudents })

  const listStudentsToRender = studentSearch.length
    ? studentSearch
    : elementsToRender

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col col-md-9 mx-auto'>
          <h1 className='text-center mx-auto'>Lista de estudiantes</h1>
          <SearchBar handleSearch={handleSearch} />
          <table className='table table-hover border border-5 align-middle text-center'>
            <thead className='table-primary'>
              <tr>
                <th />
                <th>Id</th>
                <th>Curso</th>
                <th>Estudiante</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {listStudentsToRender?.map((student) => {
                return (
                  <tr key={student.id}>
                    <td>
                      <input id={student.id} type='checkbox' />
                    </td>
                    <td>{student.id}</td>
                    <td>{student.id_curso}</td>
                    <td className='text-start'>
                      <Link
                        className='text-decoration-none text-dark'
                        to={`${student.correo}/${student.nombres.concat(
                          ' ',
                          student.apellidos
                        )}`}
                      >
                        {student.apellidos} {student.nombres}
                      </Link>
                    </td>
                    <td> {student.estado}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {listStudents.length > studentsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(listStudents.length / studentsPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <div className='d-flex m-3 mb-4 justify-content-center gap-3'>
        <button type='button' className='btn btn-primary mb-4'>
          Matricular
        </button>

        <button type='button' className='btn btn-danger  mb-4'>
          Eliminar
        </button>
      </div>
    </div>
  )
}
