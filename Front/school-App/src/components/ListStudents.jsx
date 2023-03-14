import { useEffect, useState } from 'react'
import { getStudents } from '../logic/getStudents'
import { Pagination } from './Pagination'

export const ListStudents = () => {
  const [listStudents, setListStudents] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const studentsPerPage = 20

  useEffect(() => {
    async function fetchData () {
      const listStudents = await getStudents()
      if (!listStudents.detail) setListStudents(listStudents)
    }
    fetchData()
  }, [])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const studentsToRender = listStudents.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  )

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col col-md-9 mx-auto'>
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
              {studentsToRender?.map((student) => {
                return (
                  <tr key={student.id}>
                    <td>
                      <input id={student.id} type='checkbox' />
                    </td>
                    <td>{student.id}</td>
                    <td>{student.id_curso}</td>
                    <td>
                      <a className='text-decoration-none text-dark' href='#'>
                        {student.apellidos} {student.nombres}
                      </a>
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
