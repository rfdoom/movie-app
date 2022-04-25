import axios from "axios";
import { useState } from 'react'

function Search(props) {

  const [searchResults, setSearchResults] = useState('')
/* TODO catch 500 error, get results to display correctly */
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/result/', new FormData(e.target))
    .then((response) => {
      console.log(response)
      setSearchResults(response.data)
    })
  }

  return (
    <form action="/" method="get" onSubmit={handleSubmit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search Movies</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search movies..."
        name="search"
      />
      <button type="submit" >Search</button>
    </form>
  )
}

export default Search;