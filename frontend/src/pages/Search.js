import axios from "axios";
import { useState, useEffect } from 'react'

function Search(props) {

  const [searchResults, setSearchResults] = useState('')
  const [dataIsLoaded, setdataIsLoaded] = useState(false)
/* TODO catch 500 error, get results to display correctly */
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios.post('http://localhost:8000/api/result/', new FormData(e.target))
      .then((response) => {
      console.log(response)
      setSearchResults(response.data[0])
      })
    }
    catch (e) {
      console.error(e);
    }
  }


  return (
    <div>
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
        <button type="submit">Search</button>
      </form>
      <br />
      <br />
      <h3>{searchResults['title']}</h3>
      <h3>{searchResults['overview']}</h3>
      <h3>{searchResults['release_date']}</h3>
      <h3>{searchResults['services']}</h3>
    </div>
  )
}

export default Search;