import { useEffect, useState } from 'react'
import { getStudents } from '../logic/getStudents'

export function useGetStudents () {
  const [listStudents, setListStudents] = useState([])

  useEffect(() => {
    async function fetchData () {
      const listStudents = await getStudents()
      if (!listStudents.detail) setListStudents(listStudents)
    }
    fetchData()
  }, [])

  return { listStudents }
}
