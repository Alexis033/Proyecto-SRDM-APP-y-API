export function Pagination ({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && 'active'}`}
          >
            <button
              className='page-link'
              onClick={() => onPageChange(page - 1)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
