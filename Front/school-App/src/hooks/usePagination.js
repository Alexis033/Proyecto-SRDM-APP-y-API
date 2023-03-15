import { useState } from 'react'

export function usePagination ({ elementsInPage, totalElements }) {
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = elementsInPage

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }
  const elementsToRender = totalElements.slice(
    currentPage * elementsPerPage,
    (currentPage + 1) * elementsPerPage
  )

  return { handlePageChange, elementsToRender, currentPage }
}
