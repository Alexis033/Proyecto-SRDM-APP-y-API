import { useRef } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

export function SearchBar ({ handleSearch }) {
  const searchTextRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const searchText = searchTextRef.current.value
    handleSearch(searchText)
    searchTextRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          ref={searchTextRef}
          type='text'
          placeholder='Ingresa un correo'
        />
        <Button variant='outline-secondary' type='submit'>
          Search
        </Button>
      </InputGroup>
    </form>
  )
}
