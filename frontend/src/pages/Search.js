import axios from "axios";
import { useState } from 'react'


function Search(props) {

  const [searchResults, setSearchResults] = useState('')
  const [values, setValues] = useState({movie_id: searchResults['id'], author: '', stars: '', comment: ''})
 
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

  const handleReview = (e) => {
    try {
      e.preventDefault()
      setValues({...values, [e.target.name]: e.target.value})
      console.log(values)
      axios.post('http://localhost:8000/api/review/', values )
      .then(response => {
        console.log(response)
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <form action="/" method="get" onSubmit={handleSubmit}>
        <label htmlFor="header-search">
          <span className="movie-search">Search Movies</span>
        </label>
        <br /><br />
        <input
          type="text"
          id="header-search"
          placeholder="Search movies..."
          name="search"
          className="movie-search-bar"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <br />
      <div>
        <p className="note">NOTE: When you search, you add that movie to the database.</p>
      </div>
      <br />
      <h2 className="movie-title">{searchResults['title']}</h2>
      <h3 className="movie-release">{searchResults['release_date']}</h3>
      <h3 className="movie-overview">{searchResults['overview']}</h3>
      <div>
        {searchResults ? (
          <form action="/search" method="get" onSubmit={handleReview}>
            <label className="review-label">Author: </label>
            <input type="text" placeholder="Enter Your Name..." name="author"/>
            <br /><br />
            <label className="review-label">Rating: </label>
            <select name="stars">
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <br /><br />
            <label className="review-label">Review: </label>
            <textarea type="text" placeholder="Enter Your Review..." name="comment"/>
            <br /><br />
            <button type="submit" className="submit-button" onClick={handleReview}>Submit Review</button>
            <br /> <br />
          </form>
        ):(
          <h2>Use the above to search for a movie.</h2>
        )}
      </div>
    </div>
  )
}

export default Search;